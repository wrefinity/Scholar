import Mongoose from "mongoose";

const paymentSch = new Mongoose.Schema(
  {
    amount: { type: String, required: true },
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scholarId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },
    address: { type: String, required: true },
    phoneNo: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zip_code: { type: String, required: true },
    fullname: { type: String, required: true },
  },
  { timestamps: true }
);

const payModel = Mongoose.model("Payment", paymentSch);
export default payModel;
