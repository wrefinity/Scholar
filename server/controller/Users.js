import jwt from "jsonwebtoken";
import JWTAuthentication from "../middleware/authentication.js";
import bcrypt from "bcrypt";
import crypto from "crypto"
import Token from "../model/Token.js";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import asyncHandler from "express-async-handler";
import User from "../model/Users.js";
import ModelActions from "./ModelActions.js";
import { sendMessage } from "../Utils/messenger.js"
const maxAge = 3 * 60 * 60 * 24;

class UserRepo {
  salt = 5
  #tokenGenerator = (id, role) => {
    return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
  };

  // delete a user
  deleteUsers = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(res, id);
    const user = await ModelActions.findOne(User, { _id: id });
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No user with id ${id}` });
    await user.remove();
    res.status(StatusCodes.OK).json({ message: "user deleted" });
  });

  // update a user
  updateUser = asyncHandler(async (req, res) => {
    if (!req.body) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please provide the necessary values",
      });
    }
    const { id: userId } = req.params;
    checkId(res, userId);
    const updatedUser = await ModelActions.updator(User, id, req.body);
    res.status(StatusCodes.OK).json(updatedUser);
  });

  //getUsers
  getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({
      role: { $not: /^admin.*/ },
    }).select("-password");
    res.status(StatusCodes.OK).json(users);
  });

  //get singleUser
  getUser = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    checkId(res, userId);
    const user = await User.findById(userId).select("-password");
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No user with id ${id}` });
    res.status(StatusCodes.OK).json(user);
  });

  //users statistics
  userStats = asyncHandler(async (req, res) => {
    const users = await User.find({ isAdmin: false }).select("-password");
    if (users) {
      const date = new Date();
      const lastYr = new Date(date.setFullYear(date.getFullYear - 1));
      const stats = User.aggregate([
        { $match: { createdAt: { $gte: lastYr } } },
        { $project: { $month: "$createdAt" } },
        { $group: { _id: "$month", total: { $sum: 1 } } },
      ]);
      return res.status(Status.OK).json(stats);
    }
  });

  //login section
  login_post = async (req, res) => {

    try {

      if (!req.body.email || !req.body.password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Please provide email and password" });
      }
      
      const user = await User.findOne({ email:req.body.email });
      if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: "User not found!" });

      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();


          const url = `${process.env.BASE_URL}users_verification/${user._id}/${token.token}`;
          const ret = await sendMessage([user.email,], `Activate Your Account \n ${url}`, 'SAM_AFRIKA - ACTIVATION LINK')
          if (!ret)
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Something Went wrong please try again" })
        }

        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "A confirmation email was sent to your account please verify" });

      }

      const confirmed = bcrypt.compareSync(req.body.password, user.password);
      if (!confirmed)
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Wrong password" });
      const token = JWTAuthentication.generateToken({
        id: user._id,
        role: user.role,
      });

      res.cookie("authentication", token, {
        httpOnly: true,
        maxAge: 1000 * maxAge,
        secure: process.env.NODE_ENV === "production",
        signed: true,
      });
      const {password, ...userx } = user._doc;
      return res.status(StatusCodes.OK).json({ ...userx, token });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({message:error.message})
    }
  };

  logout = asyncHandler((req, res) => {
    res.cookie("authentication", "", { httpOnly: true, maxAge: 1 });
    return res.status(StatusCodes.OK).json({ message: "user logged out!" });
  });



  regPost = asyncHandler(async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, this.salt);
      const newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
      const user = await newUser.save();
      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
          token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();


          const url = `${process.env.BASE_URL}users_verification/${user._id}/${token.token}`;
          const ret = await sendMessage([user.email,], `Activate Your Account \n  follow the link below to complete your account registration \n ${url}`, 'SAM-AFRIKA - ACTIVATION LINK')
          if (!ret)
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Something went wrong on sending message" })
        }
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Kindly check your email for accout confirmation" })
      }
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Kindly check your email for accout confirmation" });
    } catch (error) {

      if (error.name === 'MongoServerError' && error.code === 11000) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: `${req.body.email} already registered` })
      } else {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "ensure all fields are provided with exception to image" });
      }

    }
  });


  confirmRegistration = asyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).json({ message: "user does not exits" });

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token.toString(),
      });
      if (!token) return res.status(400).json({ message: "Reset link have expired" });

      await User.updateOne({ _id: user._id }, { verified: true });
      // # delete the token 
      await Token.deleteOne({ _id: token._id });
      res.status(StatusCodes.OK).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "token not found" });
    }
  });


  // reset link sender
  reset_link = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email field must be supplied" });

    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: "email not registered" })

      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }

      const link = `${process.env.EMAIL_FRONTEND_RESET_LINK}${user._id}/${token.token}`;
      const message = "\n kindly reset your password via the link \n "
      // send message
      const ret = sendMessage([user.email,], `Dear ${user?.fullname}, ${message} ${link}`, "SAM-AFRIKA - RESET PASSWORD LINK");
      if (!ret)
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Something Went wrong please try again" })
      return res.status(StatusCodes.OK).json({ message: `reset link sent to ${user.email}. NOTE: password expires in 10 minute` })

    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }
  })
  // changeNow
  changePassword = asyncHandler(async (req, res) => {
    const oldUser = await User.findById(req.params.id);
    if (!oldUser) return res.status(StatusCodes.BAD_REQUEST).json({ message: "User does not exist" });

    try {
      const token_model = await Token.findOne({
        userId: oldUser._id,
        token: req.params.token,
      });
      if (!token_model) return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid link or token have expired" });

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      oldUser.password = hashedPassword;
      await oldUser.save();
      await Token.deleteOne({ _id: token_model._id });
      return res.status(StatusCodes.OK).json({ message: "password reset successful" })
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "An error occured" });
    }
  });

  changeImage = asyncHandler(async (req, res) => {
    const { image } = req.body;
    const { id: userId } = req.user;
    checkId(res, userId);
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { image } },
      { new: true }
    );
    res.status(StatusCodes.OK).json(user);
  });
}

export default new UserRepo();