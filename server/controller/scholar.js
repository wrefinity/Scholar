import Scholar from "../model/Scholars.js";
import checkId from "../Utils/mongoIdCheck.js";
import StatusCodes from "http-status-codes";
import asyncHandler from "express-async-handler";
import User from "../model/Users.js"

class ScholarRepo {
  addScholar = async (req, res) => {
    const userId = req.user._id;
    const scholar = req.body.scholar;
    const checkerSchole = await Scholar.findOne({ userId });
    let scholarDoc = null;
    if (!checkerSchole) {
      scholarDoc = await Scholar.create({
        userId,
        scholarships: [scholar],
      });
    } else {
      scholarDoc = await Scholar.updateOne(
        { userId },
        { $push: { scholarships: scholar } }
      ).exec();
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: scholarDoc._id
        ? "Scholarship Registered"
        : "Registration failed",
      scholar: scholarDoc,
    });
  };

  deleteUserScholar = async (res, req) => {
    const { scholarId } = req.params;
    const deleted = await Scholar.updateOne({ _id: scholarId, isDeleted: true }).exec();
    res.status(StatusCodes.OK).json({
      success: true,
      scholar: deleted,
      message: "scholarship deleted successfully",
    });
  };

  deleteScholarPost = async (req, res) => {
    const { userId, postId } = req.params;
    checkId(res, userId);
    checkId(res, postId);
    const scholarDoc = await Scholar.updateOne(
      { userId },
      {
        $pull: { scholarships: { postId } },
      }
    ).exec();

    res.status(StatusCodes.OK).json({
      success: true,
      scholar: scholarDoc,
      message: "Scholarship deleted",
    });
  };
  getScholar = async (req, res) => {
    const { userId } = req.params;
    checkId(res, userId);
    const scholarDoc = await Scholar.findOne({
      userId,
    }).populate('userId').exec();
    res.status(StatusCodes.OK).json({
      success: true,
      scholar: scholarDoc,
    });
  };

  getAllScholar = async (_, res) => {
    const scholarDoc = await Scholar.find().populate({ path: 'userId', select:['fullname', 'email', 'phone'], model:User}).exec();
    return res.status(StatusCodes.OK).json(scholarDoc);
  };
  myScholarship = asyncHandler( async (req, res) => {

    try {
      const userId = req.user._id;
      checkId(res, userId);
      const data = []
      const scholarDoc = await Scholar.findOne({
        userId,
      }).populate({ path: 'userId', select: ['fullname', 'email', 'phone'], model: User,}).exec()
      if (scholarDoc) data.push(scholarDoc)
      return res.status(StatusCodes.OK).json(data);
      // data && res.status(200).json(data);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({message:error.message})
    }
  });
}
export default new ScholarRepo();