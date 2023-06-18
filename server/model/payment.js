import Mongoose from "mongoose";

const paymentSch = new Mongoose.Schema(
  {
    amount: { type: String, required: true },
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartegoryId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    scholarId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },
    amount: { type: String, required: true },
    reference: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const payModel = Mongoose.model("Payment", paymentSch);
export default payModel;
