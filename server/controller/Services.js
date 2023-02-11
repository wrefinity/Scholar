import Services from "../model/Services.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import ModelActions from "./ModelActions.js";

class ServiceRepo {
  createService = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const data = await ModelActions.creator(Services, req.body);
    data && res.status(StatusCodes.CREATED).json({ data });
  });

  updateService = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Services, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No service with id : ${id}`);
    }
    const updated = await ModelActions.updator(Services, id, req.body);
    updated && res.status(StatusCodes.OK).json({ updated });
  });

  deleteService = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Services, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No service with id : ${id}`);
    }
    const deleted = await ModelActions.deletor(Services, id);
    deleted && res.status(StatusCodes.OK).json({ message: "service deleted" });
  });

  allServices = asyncHandler(async (req, res) => {
    const data = await ModelActions.findAll(Services);
    data && res.status(StatusCodes.OK).json({ data });
  });

  singleService = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const data = await ModelActions.findId(Services, id);
    if (!data) {
      throw new CustomError.NotFoundRequestError(`No service with id : ${id}`);
    }
    res.status(StatusCodes.OK).json({ data });
  });
}
export default new ServiceRepo();