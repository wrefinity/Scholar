import JWTAuthentication from "./authentication.js";
import CustomError from "../error/index.js";
import User from "../model/Users.js";

class AuthRoles {
  currentRole = "";
  Authenticate = async (req, res, next) => {
    console.log(req);
    const authHeaders = req.headers.authorization;
    if (!authHeaders)
      throw new CustomError.UnauthenticatedError(
        "Authorization Token Required"
      );
    try {
      const token = authHeaders.split(" ")[1].toString();
      console.log(token);
      if (!token) {
        throw new CustomError.UnauthenticatedError("Authentication Invalid");
      }
      let decoded = JWTAuthentication.isTokenValid(token);
      const user = await User.findById(decoded.id.toString()).select(
        "-password"
      );
      if (!user) throw new CustomError.BadRequestError("No found found");
      this.currentRole = user.isAdmin;
      req.user = user;
      next();
    } catch (error) {
      if (error.name == "TokenExpiredError") {
        res.status(498).send({
          message: "Your token is expired!",
        });
      } else {
        console.log("printing error");
        console.log(error);
        throw new CustomError.UnauthenticatedError("Not authorized");
      }
    }
  };
  authorizeAdmin = (req, res, next) => {
    console.log(this.currentRole);
    if (!req.user.isAdmin) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
  authorizeStudent = (req, res, next) => {
    if (!req.user.role === process.env.STUDENT_ROLE) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
  authorizeStudentAdmin = (req, res, next) => {
    if (
      !req.user.role === process.env.STUDENT_ROLE ||
      !req.user.role === process.env.ADMIN_ROLE
    ) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
}
export default new AuthRoles();
