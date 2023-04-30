import Partner from "../model/Partners.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import ModelActions from "./ModelActions.js";

class PartnerRepo {
  createPartner = asyncHandler(async (req, res) => {
    if (!req.body)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "please provide the neccessary information" });

    const data = await ModelActions.creator(Partner, req.body);
    data && res.status(StatusCodes.CREATED).json(data);
  });

  deletePartner = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      checkId(res, id);
      const match = await ModelActions.findOne(Partner, { _id: id });
      if (!match) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: `No Partner with id : ${id}` });
      }
      const deleted = await ModelActions.deletor(Partner, id);
      deleted && res.status(StatusCodes.OK).json(deleted);
    } catch (error) {}
  });

  allPartner = asyncHandler(async (req, res) => {
    const data = await ModelActions.findAll(Partner);
    data && res.status(StatusCodes.OK).json(data);
  });
}

export default new PartnerRepo();
