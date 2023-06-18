import Mongoose from "mongoose";

const catSchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const catModel = Mongoose.model("Category", catSchema);
export default catModel;
