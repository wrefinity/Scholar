import Category from "../model/Categories.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import ModelActions from "./ModelActions.js";

class CategoryRepo {
  createCategory = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const data = await ModelActions.creator(Category, req.body);
    data && res.status(StatusCodes.CREATED).json(data);
  });
  updateCategory = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Category, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No Category with id : ${id}`);
    }
    const updated = await ModelActions.updator(About, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });
  deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Category, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No Category with id : ${id}`);
    }
    const deleted = await ModelActions.deletor(About, id);
    deleted && res.status(StatusCodes.OK).json(deleted);
  });
  allCategory = asyncHandler(async (req, res) => {
    const data = await ModelActions.findAll(Category);
    data && res.status(StatusCodes.OK).json(data);
  });
  singleCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const data = await ModelActions.findId(Category, id);
    if (!data) {
      throw new CustomError.NotFoundRequestError(`No Category with id : ${id}`);
    }
    res.status(StatusCodes.OK).json(data);
  });
}
export default new CategoryRepo();
