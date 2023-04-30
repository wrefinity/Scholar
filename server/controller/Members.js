import Members from "../model/Members.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import ModelActions from "./ModelActions.js";
class MemberRepo {
  createMember = asyncHandler(async (req, res) => {
    if (!req.body)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "please provide the neccessary information" });

    const data = await ModelActions.creator(Members, req.body);
    data && res.status(StatusCodes.CREATED).json(data);
  });

  updateMember = asyncHandler(async (req, res) => {
    if (!req.body)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "please provide the neccessary information" });

    const { id } = req.params;
    checkId(res, id);
    const match = await ModelActions.findOne(Members, { _id: id });
    if (!match) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No Member with id : ${id}` });
    }
    const updated = await ModelActions.updator(Members, id, req.body);
    updated && res.status(StatusCodes.OK).json(updated);
  });

  deleteMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(res, id);
    const match = await ModelActions.findOne(Members, { _id: id });
    if (!match) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No Member with id : ${id}` });
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
    checkId(res, id);
    const data = await ModelActions.findId(Members, id);
    if (!data) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No Member with id : ${id}` });
    }
    res.status(StatusCodes.OK).json(data);
  });
}

export default new MemberRepo();
