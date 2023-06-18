import jwt from "jsonwebtoken";
import JWTAuthentication from "../middleware/authentication.js";
import bcrypt from "bcrypt";
import Token from "../model/Token.js";
import crypto from "crypto";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import asyncHandler from "express-async-handler";
import User from "../model/Users.js";
import ModelActions from "./ModelActions.js";
import { sendMessage } from "../Utils/messenger.js"
const maxAge = 3 * 60 * 60 * 24;

class UserRepo {
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
  login_post = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.compareDetails(email, password);
    // const token = this.#tokenGenerator(user._id, user.role);


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
        .status(400)
        .send({ message: "A confirmation email was sent to your account please verify" });

    }

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
    return res.status(StatusCodes.OK).json({ ...user, token });
  });

  logout = asyncHandler((req, res) => {
    res.cookie("authentication", "", { httpOnly: true, maxAge: 1 });
    return res.status(StatusCodes.OK).json({ message: "user logged out!" });
  });

  //    registration sections
  regPost = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const existance = await User.findOne({ email });
    if (existance) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already exists" });
    }
    const user = await User.create({ ...req.body });

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/users_verification/${user._id}/${token.token}`;
    const ret = await sendMessage([user.email,], `Activate Your Account \n ${url}`, 'SAM_AFRIKA - ACTIVATION LINK')
    if (!ret)
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Something Went wrong please try again" })
    user && res.status(StatusCodes.CREATED).json({ message: "An Email sent to your account please verify" });
  });
  confirmRegistration = asyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) return res.status(400).send({ message: "Invalid link" });

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send({ message: "Invalid link" });

      // await User.updateOne({ _id: user._id, verified: true });
      await User.updateOne({ _id: user._id }, { verified: true });

      await token.remove();

      res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
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
      const user = await ModelActions.findOne(User, { email })
      if (!user) return res.status(StatusCodes.BAD_REQUEST).json({ message: "email not registered" })
      const secret = process.env.JWT_SECRET + user.password;
      const token = jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "30m",
      });
      const link = `${process.env.EMAIL_FRONTEND_RESET_LINK}/${user._id}/${token}`;
      // send message
      const ret = sendMessage([user.email,], `Reset Password Your \n ${link}`, 'SAM_AFRIKA - RESET PASSWORD LINK');
      if (!ret)
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Something Went wrong please try again" })
      return res.status(StatusCodes.OK).json({ message: `resent link sent to ${user.email}. NOTE: password expires in 10 minute` })

    } catch (error) {
      console.log(error)
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message })
    }


  })
  // changeNow
  changePassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) return res.status(StatusCodes.BAD_REQUEST).json({ status: "User does not exist" });
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
      await jwt.verify(token, secret);
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      await User.updateOne(
        { _id: id },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
      return res.json({ message: "Password Updated" });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "reset password link expired" });
    }
  };

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