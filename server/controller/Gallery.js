import Gallery from "../model/Gallery.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import ModelActions from "./ModelActions.js";

class GalleryRepo {
  createGallery = asyncHandler(async (req, res) => {
    try {
      if (!req.body) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Please provide the necessary values" });
      }
      const data = await ModelActions.creator(Gallery, req.body);
      data && res.status(StatusCodes.CREATED).json(data);
    } catch (error) {}
  });

  updateGallery = asyncHandler(async (req, res) => {
    try {
      if (!req.body) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Please provide the necessary values" });
      }
      const { id } = req.params;
      checkId(res, id);
      const match = await ModelActions.findOne(Gallery, { _id: id });
      if (!match) {
        return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No gallery with id : ${id}` });
      }
      const updated = await ModelActions.updator(Gallery, id, req.body);
      updated && res.status(StatusCodes.OK).json(updated);
    } catch (error) {}
  });

  deleteGallery = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(res, id);
    const match = await ModelActions.findOne(Gallery, { _id: id });
    if (!match)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No gallery with id : ${id}` });
    const deleted = await ModelActions.deletor(Gallery, id);
    deleted && res.status(StatusCodes.OK).json(deleted);
  });

  allGalleries = asyncHandler(async (req, res) => {
    const data = await ModelActions.findAll(Gallery);
    data && res.status(StatusCodes.OK).json(data);
  });

  singleGallery = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(res, id);
    const data = await ModelActions.findId(Gallery, id);
    if (!data)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No gallery with id : ${id}` });
    res.status(StatusCodes.OK).json(data);
  });
}
export default new GalleryRepo();
