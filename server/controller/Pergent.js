import Pergant from "../model/Pergent.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import ModelActions from "./ModelActions.js";

class PergantRepo {
  // creating pergent
  createPergant = asyncHandler(async (req, res) => {
    if (!req.body)
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    const data = await ModelActions.creator(Pergant, req.body);
    data && res.status(StatusCodes.CREATED).json(data);
  });

  // update pergant
  updatePergant = asyncHandler(async (req, res) => {
    if (!req.body)
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Pergant, { _id: id });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No Pergant with id : ${id}`);
    const updated = await ModelActions.updator(Pergant, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });
  incrementPergant = async (req, res) => {
    const { pergantId } = req.params;
    const { name, counter } = req.body;
    checkId(pergantId);
    const pergant = await Pergant.updateOne(
      { _id: pergantId },
      { $inc: { payments: counter }, $push: { voters: name } },
      { new: true }
    ).exec();
    if (!pergant)
      throw new CustomError.NotFoundRequestError(`No Pergant with id : ${id}`);
    res.status(StatusCodes.OK).json(pergant);
  };

  deletePergant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("i was called");
    checkId(id);
    const match = await ModelActions.findOne(Pergant, { _id: id });
    if (!match)
      throw new CustomError.NotFoundRequestError(`No Pergant with id : ${id}`);
    const deleted = await ModelActions.deletor(Pergant, id);
    deleted && res.status(StatusCodes.OK).json(deleted);
  });
  // getting pergant
  allPergant = asyncHandler(async (req, res) => {
    const data = await Pergant.find({ isDeleted: false })
      .populate({ path: "title", select: ["name", "amount"] })
      .exec();
    data && res.status(StatusCodes.OK).json(data);
  });

  getSpecificPergant = asyncHandler(async (req, res) => {
    const title = req.body.title;
    const data = await ModelActions.findAllCredential(Pergant, { title });
    data && res.status(StatusCodes.OK).json(data);
  });

  // get single pergant
  singlePergant = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const data = await ModelActions.findId(Pergant, id);
    if (!data)
      throw new CustomError.NotFoundRequestError(`No Pergant with id : ${id}`);
    res.status(StatusCodes.OK).json(data);
  });
}
export default new PergantRepo();
