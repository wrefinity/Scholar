import JWTAuthentication from "./authentication.js";
import User from "../model/Users.js";
import StatusCodes from "http-status-codes";

class AuthRoles {
  currentRole = "";
  Authenticate = async (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Authorization Token Required" });
    try {
      const token = authHeaders.split(" ")[1].toString();
      if (!token) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Invalid Authentication Token" });
      }
      let decoded = JWTAuthentication.isTokenValid(token);
      const user = await User.findById(decoded.id.toString()).select(
        "-password"
      );
      if (!user)
        return res.status(StatusCodes.UNAUTHORIZED)({ message: "No found found" });
      this.currentRole = user.isAdmin;
      req.user = user;
      next();
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        return res.status(498).send({
          message: "Your token is expired!",
        });
      } else {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Not authorized" });
      }
    }
  };
  authorizeAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized to access this route" });
    }
    next();
  };
  authorizeStudent = (req, res, next) => {
    if (!req.user.role === process.env.STUDENT_ROLE) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized to access this route" });
    }
    next();
  };
  authorizeStudentAdmin = (req, res, next) => {
    if (
      !req.user.role === process.env.STUDENT_ROLE ||
      !req.user.role === process.env.ADMIN_ROLE
    ) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized to access this route" });
    }
    next();
  };
} 

export default new AuthRoles();