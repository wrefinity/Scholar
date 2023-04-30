import jwt from "jsonwebtoken";
// import CustomError from "../error/index.js";

class JWTAuthentication {
  isTokenValid = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
  };
  generateToken = (payloads) => {
    return jwt.sign(payloads, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
  };
}
export default new JWTAuthentication();
