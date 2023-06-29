import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
    },
    verified:{
      type:Boolean,
      default:false
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
      default: "applicant",
    },
    isDeleted: { type: Boolean, default: false },
    image: { type: String },
    username: { type: String },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);
export default User;