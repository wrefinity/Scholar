import Mongoose from "mongoose";

const catSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true , default:"active"},
  },
  { timestamps: true }
);

const catModel = Mongoose.model("Category", catSchema);
export default catModel;
