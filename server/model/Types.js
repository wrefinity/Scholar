import Mongoose from "mongoose";

const typeSchema = new Mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true }
);

const typeModel = Mongoose.model("Type", typeSchema);
export default typeModel;