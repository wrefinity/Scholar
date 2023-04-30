import CatPergant from "../model/CatPergent.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import ModelActions from "./ModelActions.js";

class CategoryPergentRepo {
  createCatPat = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const data = await ModelActions.creator(CatPergant, req.body);
    data && res.status(StatusCodes.CREATED).json(data);
  });
  updateCatPat = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(CatPergant, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(
        `No Pergant Category with id : ${id}`
      );
    }
    const updated = await ModelActions.updator(CatPergant, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });
  deleteCatPat = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(CatPergant, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(
        `No Pergant Category with id : ${id}`
      );
    }
    const deleted = await ModelActions.deletor(CatPergant, id);
    deleted && res.status(StatusCodes.OK).json(deleted);
  });

  allCatPat = asyncHandler(async (req, res) => {
    const data = await ModelActions.findAll(CatPergant);
    data && res.status(StatusCodes.OK).json(data);
  });

  singleCatPat = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const data = await ModelActions.findId(CatPergant, id);
    if (!data)
      throw new CustomError.NotFoundRequestError(
        `No Pergant Category with id : ${id}`
      );
    res.status(StatusCodes.OK).json(data);
  });
}
export default new CategoryPergentRepo();
