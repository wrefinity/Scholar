import mongoose from "mongoose";
import bcrypt from "bcrypt";
import CustomError from "../error/index.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      minlength: 6,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      require: true,
    },
    image: { type: String },
    username: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  if (this.password) this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

userSchema.statics.compareDetails = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (!user)
    throw new CustomError.UnauthenticatedError("Invalid Email Address");

  const checkPass = await bcrypt.compare(password, user.password);
  if (checkPass) {
    const { password, ...userx } = user._doc;
    return userx;
  } else {
    throw new CustomError.UnauthenticatedError("Invalid Password");
  }
};

const User = mongoose.model("User", userSchema);
export default User;


// https://www.geeksforgeeks.org/how-to-build-a-simple-voice-typer-app-in-android-using-java/