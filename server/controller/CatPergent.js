import CatPergant from "../model/CatPergent.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import ModelActions from "./ModelActions.js";

class CategoryPergentRepo {
  createCatPat = asyncHandler(async (req, res) => {
    try {
      if (!req.body)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Please provide all the necessary information` });
      const data = await ModelActions.creator(CatPergant, req.body);
      data && res.status(StatusCodes.CREATED).json(data);
    } catch (error) {}
  });
  updateCatPat = asyncHandler(async (req, res) => {
    try {
      if (!req.body)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `Please provide all the necessary information` });
      const { id } = req.params;
      checkId(res, id);
      const match = await ModelActions.findOne(CatPergant, { _id: id });
      if (!match) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({message:`No Pergant Category with id : ${id}`});
      }
      const updated = await ModelActions.updator(CatPergant, id, req.body);
      updated && res.status(StatusCodes.OK).json(updated);
    } catch (error) {}
  });
  deleteCatPat = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      checkId(res, id);
      const match = await ModelActions.findOne(CatPergant, { _id: id });
      if (!match) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `No Pergant Category with id : ${id}` });
      }
      const deleted = await ModelActions.deletor(CatPergant, id);
      deleted && res.status(StatusCodes.OK).json(deleted);
    } catch (error) {}
  });

  allCatPat = asyncHandler(async (req, res) => {
    const data = await ModelActions.findAll(CatPergant);
    data && res.status(StatusCodes.OK).json(data);
  });

  singleCatPat = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      checkId(res, id);
      const data = await ModelActions.findId(CatPergant, id);
      if (!data)
        return res.json({ message: `No Pergant Category with id : ${id}` });
      res.status(StatusCodes.OK).json(data);
    } catch (error) {}
  });
}
export default new CategoryPergentRepo();
