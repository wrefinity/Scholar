import mongoose from "mongoose";
import CustomError from "../error/index.js";

const checkId = (id) => {
  if (!id) throw new CustomError.BadRequestError("id cannot be empty");
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new CustomError.NotFoundRequestError(`No such id : ${id}`);
};

export default checkId;
