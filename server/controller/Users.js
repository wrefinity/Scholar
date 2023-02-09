import jwt from "jsonwebtoken";
import JWTAuthentication from "../middleware/authentication.js";
import bcrypt from "bcrypt";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import asyncHandler from "express-async-handler";
import CustomError from "../error/index.js";
import User from "../model/Users.js";
import ModelActions from "./ModelActions.js";
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
    checkId(id);
    const user = await ModelActions.findOne(User, { _id: id });
    if (!user)
      throw new CustomError.NotFoundRequestError(`No user with id ${id}`);
    await user.remove();
    res.status(StatusCodes.OK).json({ message: "user deleted" });
  });

  // update a user
  updateUser = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id: userId } = req.params;
    checkId(userId);
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
    checkId(userId);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new CustomError.NotFoundRequestError(`No user with id : ${userId}`);
    }
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
      throw new CustomError.BadRequestError(
        "Please provide email and password"
      );
    }

    const user = await User.compareDetails(email, password);
    // const token = this.#tokenGenerator(user._id, user.role);
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
    res.status(StatusCodes.OK).json({ ...user, token });
  });

  logout = asyncHandler((req, res) => {
    res.cookie("authentication", "", { httpOnly: true, maxAge: 1 });
    res.status(StatusCodes.OK).json({ message: "user logged out!" });
  });

  //    registration sections
  regPost = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const existance = await User.findOne({ email });
    if (existance) {
      throw new CustomError.BadRequestError("Email already exists");
    }
    const user = await User.create({ ...req.body });
    user && res.status(StatusCodes.CREATED).json(user);
  });

  // Change password section
  changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, id } = req.body;
    if (!oldPassword || !newPassword) {
      throw new CustomError.BadRequestError("Please provide both values");
    }
    if (oldPassword !== newPassword) {
      throw new CustomError.BadRequestError("Password does not match");
    }

    const user = await User.findById(id);
    if (user) {
      const isPasswordCorrect = await user.comparePassword(oldPassword);
      if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
      }
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();
      res
        .status(StatusCodes.OK)
        .json({ message: "Success! Password Updated." });
    }
  });

  changeImage = asyncHandler(async (req, res) => {
    const { image } = req.body;
    const { id: userId } = req.user;
    checkId(userId);
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { image } },
      { new: true }
    );
    res.status(StatusCodes.OK).json(user);
  });
}

export default new UserRepo();
