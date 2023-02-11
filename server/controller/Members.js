import Members from "../model/Members.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import ModelActions from "./ModelActions.js";
class MemberRepo {
  createMember = asyncHandler(async (req, res) => {
    console.log("data called");
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const data = await ModelActions.creator(Members, req.body);
    data && res.status(StatusCodes.CREATED).json(data);
  });

  updateMember = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Members, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No member with id : ${id}`);
    }
    const updated = await ModelActions.updator(Members, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });

  deleteMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    checkId(id);
    const match = await ModelActions.findOne(Members, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No member with id : ${id}`);
    }
    const deleted = await ModelActions.deletor(Members, id);
    deleted && res.status(StatusCodes.OK).json(deleted);
  });

  allMembers = asyncHandler(async (req, res) => {
    const data = await ModelActions.findAll(Members);
    data && res.status(StatusCodes.OK).json(data);
  });

  singleMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const data = await ModelActions.findId(Members, id);
    if (!data) {
      throw new CustomError.NotFoundRequestError(`No member with id : ${id}`);
    }
    res.status(StatusCodes.OK).json(data);
  });
}

export default new MemberRepo();
