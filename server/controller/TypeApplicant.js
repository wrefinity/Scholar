import TypeModel from "../model/Types.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import ModelActions from "./ModelActions.js";

class TyperRepo {
  createType = asyncHandler(async (req, res) => {
    try {
      if (!req.body)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "provide necessary information" });
      const data = await ModelActions.creator(TypeModel, req.body);
      data && res.status(StatusCodes.CREATED).json(data);
    } catch (error) {}
  });
  upateType = asyncHandler(async (req, res) => {
    try {
      if (!req.body)
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "provide necessary information" });
      const { id } = req.params;
      checkId(res, id);
      const match = await ModelActions.findOne(TypeModel, { _id: id });

      if (!match) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `No TypeModel with id : ${id}` });
      }
      const updated = await ModelActions.updator(About, id, req.body);
      updated && res.status(StatusCodes.OK).json(updated);
    } catch (error) {}
  });
  deleteTypeModel = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      checkId(res, id);
      const match = await ModelActions.findOne(TypeModel, { _id: id });
      if (!match) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: `No TypeModel with id : ${id}` });
      }

      const deleted = await ModelActions.deletor(TypeModel, id);
      deleted && res.status(StatusCodes.OK).json(deleted);
    } catch (error) {}
  });
  allTypeModel = asyncHandler(async (_, res) => {
    const data = await ModelActions.findAll(TypeModel);
    data && res.status(StatusCodes.OK).json(data);
  });
}
export default new TyperRepo();
