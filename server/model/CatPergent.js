import Mongoose from "mongoose";

const catPerSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const catPerModel = Mongoose.model("CatPergent", catPerSchema);
export default catPerModel;
