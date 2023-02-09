import Partner from "../model/Partners.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import ModelActions from "./ModelActions.js";

class PartnerRepo {
  createPartner = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError("Please provide partners logo");
    }
    const data = await ModelActions.creator(Partner, req.body);
    data && res.status(StatusCodes.CREATED).json(data);
  });

  deletePartner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(About, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No partner with id : ${id}`);
    }
    const deleted = await ModelActions.deletor(Partner, id);
    deleted && res.status(StatusCodes.OK).json(deleted);
  });

  allPartner = asyncHandler(async (req, res) => {
    const data = await ModelActions.findAll(Partner);
    data && res.status(StatusCodes.OK).json(data);
  });
}

export default new PartnerRepo();
