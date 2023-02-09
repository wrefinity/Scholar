import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      trim: true,
    },
    facebook: {type: String },
    twitter: {type: String },
    instagram: {type: String },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
    },
    about: {
      type: String,
    },
    image: { type: String },
  },
  { timestamps: true }
);


const Members = mongoose.model("Member", memberSchema);
export default Members;
