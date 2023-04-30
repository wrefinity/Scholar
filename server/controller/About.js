import About from "../model/About.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import ModelActions from "./ModelActions.js";

class AboutRepo {
  createAbout = asyncHandler(async (req, res) => {
    if (!req.body)
      return res.status(400).json({ message: "please supply the note field" });
    const data = await ModelActions.creator(About, req.body);
    data && res.status(StatusCodes.CREATED).json(data);
  });

  updateAbout = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(res, id);
    const match = await ModelActions.findOne(About, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No About with id : ${id}`);
    }
    const updated = await ModelActions.updator(About, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });

  deleteAbout = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(res, id);
    const match = await findOne(About, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No About with id : ${id}`);
    }
    const deleted = await ModelActions.deletor(About, id);
    deleted && res.status(StatusCodes.OK).json(deleted);
  });

  allAbout = asyncHandler(async (_, res) => {
    const data = await About.find().sort({ createdAt: -1 }).limit(1);
    // const data = await ModelActions.findAll(About);
    data && res.status(StatusCodes.OK).json(data);
  });

  singleAbout = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(res, id);
    const data = await ModelActions.findId(About, id);
    if (!data) {
      throw new CustomError.NotFoundRequestError(`No About with id : ${id}`);
    }

    res.status(StatusCodes.OK).json(data);
  });
}
export default new AboutRepo();
