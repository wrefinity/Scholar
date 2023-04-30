import Payment from "../model/payment.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import ModelActions from "./ModelActions.js";

class paymentRepo {
  createPayment = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const data = await ModelActions.creator(Payment, req.body);
    data && res.status(StatusCodes.CREATED).json(data);
  });

  updatePayment = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Payment, { _id: id });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No payment with id : ${id}`);
    const updated = await ModelActions.updator(Payment, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });

  deletePayment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Payment, { _id: id });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No payment with id : ${id}`);
    const deleted = await ModelActions.deletor(Payment, id);
    deleted && res.status(StatusCodes.OK).json({ message: "payment deleted" });
  });

  allPayment = asyncHandler(async (req, res) => {
    const data = await Payment.find({ isDeleted: false })
      .populate("userId")
      .populate("scholarId")
      .populate("cartegoryId");
    data && res.status(StatusCodes.OK).json({ data });
  });
}
export default new paymentRepo();
