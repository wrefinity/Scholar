import mongoose from "mongoose";
import StatusCodes from "http-status-codes";

const checkId = (res, id) => {
  if (!id)
    res.status(StatusCodes.BAD_REQUEST).json({ message: "id cannot be empty" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(StatusCodes.NOT_FOUND).json({ message: `No such id` });
};

export default checkId;
