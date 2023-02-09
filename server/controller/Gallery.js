import Gallery from "../model/Gallery.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import ModelActions from "./ModelActions.js";

class GalleryRepo {
  createGallery = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const data = await ModelActions.creator(Gallery, req.body);
    data && res.status(StatusCodes.CREATED).json(data);
  });

  updateGallery = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Gallery, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No Gallery with id : ${id}`);
    }
    const updated = await ModelActions.updator(About, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });

  deleteGallery = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Gallery, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No Gallery with id : ${id}`);
    }
    const deleted = await ModelActions.deletor(About, id);
    deleted && res.status(StatusCodes.OK).json(deleted);
  });

  allGalleries = asyncHandler(async (req, res) => {
    const data = await ModelActions.findAll(Gallery);
    data && res.status(StatusCodes.OK).json(data);
  });

  singleGallery = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const data = await ModelActions.findId(Gallery, id);
    if (!data) {
      throw new CustomError.NotFoundRequestError(`No gallery with id : ${id}`);
    }
    res.status(StatusCodes.OK).json(data);
  });
}
export default new GalleryRepo();
