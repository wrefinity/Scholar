import Category from "../model/Categories.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import ModelActions from "./ModelActions.js";

class CategoryRepo {
  createCategory = asyncHandler(async (req, res) => {
    try {
      if (!req.body)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Please provide all the necessary information` });
      const data = await ModelActions.creator(Category, req.body);
      data && res.status(StatusCodes.CREATED).json(data);
    } catch (error) {}
  });
  updateCategory = asyncHandler(async (req, res) => {
    try {
      if (!req.body)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Please provide all information` });
      const { id } = req.params;
      checkId(res, id);
      const match = await ModelActions.findOne(Category, { _id: id });
      if (!match)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `No Category with id : ${id}` });
      const updated = await ModelActions.updator(Category, id, req.body);
      updated && res.status(StatusCodes.OK).json(updated);
    } catch (error) {}
  });
  deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(res, id);
    const match = await ModelActions.findOne(Category, { _id: id });
    if (!match) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `No Category with id : ${id}` });
    }
    const deleted = await ModelActions.deletor(Category, id);
    deleted && res.status(StatusCodes.OK).json(deleted);
  });
  allCategory = asyncHandler(async (req, res) => {
    const data = await ModelActions.findAll(Category);
    data && res.status(StatusCodes.OK).json(data);
  });
  singleCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(res, id);
    const data = await ModelActions.findId(Category, id);
    if (!data) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `No Category with id : ${id}` });
    }

    res.status(StatusCodes.OK).json(data);
  });
}
export default new CategoryRepo();
