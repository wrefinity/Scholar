import TypeModel from "../model/Types.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import ModelActions from "./ModelActions.js";

class TyperRepo {
  createType = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    console.log("log", req.body);
    const data = await ModelActions.creator(TypeModel, req.body);
    data && res.status(StatusCodes.CREATED).json(data);
  });
  upateType = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(TypeModel, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(
        `No TypeModel with id : ${id}`
      );
    }
    const updated = await ModelActions.updator(About, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });
  deleteTypeModel = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(TypeModel, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(
        `No TypeModel with id : ${id}`
      );
    }

    const deleted = await ModelActions.deletor(TypeModel, id);
    console.log(deleted);
    deleted && res.status(StatusCodes.OK).json(deleted);
  });
  allTypeModel = asyncHandler(async (_, res) => {
    const data = await ModelActions.findAll(TypeModel);
    data && res.status(StatusCodes.OK).json(data);
  });
}
export default new TyperRepo();
