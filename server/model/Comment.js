import Mongoose from "mongoose";
import User from "./Users.js";

const commentSchema = new Mongoose.Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    image: { type: String },
    content: { type: String, required: true },
    replies: { type: Array, default: [] },
    reactions: { type: Object, default: {} },
    title: { type: String },
    date: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const commentModel = Mongoose.model("Comment", commentSchema);
export default commentModel;
