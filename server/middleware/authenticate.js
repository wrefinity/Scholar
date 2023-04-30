import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/Users.js";
import CustomError from "../error/index.js";

export const checkUser = asyncHandler(async (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders && authHeaders.startsWith("Bearer")) {
    try {
      let token = authHeaders.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) throw new CustomError.BadRequestError("Invalid Token");
        req.user = await User.findById(decoded.id).select("-password");
        next();
      });
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  } else {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
});

export const verifyTokenAndRoles = (req, res, next) => {
  checkUser(req, res, () => {
    if (req.user) {
      next();
    } else {
      throw new CustomError.UnauthorizedError(
        "Not authorized to access this route"
      );
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  checkUser(req, res, () => {
    if (req.user?.role === process.env.ADMIN_ROLE) {
      next();
    } else {
      throw new CustomError.UnauthorizedError(
        "Not authorized to access this route"
      );
    }
  });
};
