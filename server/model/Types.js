import Mongoose from "mongoose";

const typeSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const typeModel = Mongoose.model("Type", typeSchema);
export default typeModel;
