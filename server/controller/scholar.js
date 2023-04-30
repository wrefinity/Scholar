import Scholar from "../model/Scholars.js";
import checkId from "../utils/mongoIdCheck.js";
import StatusCodes from "http-status-codes";

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
      scholar:deleted,
      message: "scholarship deleted successfully",
    });
  };

  deleteScholarPost = async (req, res) => {
    const { userId, postId } = req.params;
    checkId(userId);
    checkId(postId);
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
    checkId(userId);
    const scholarDoc = await Scholar.findOne({
      userId,
    })
      .populate("Post")
      .populate("User");
    res.status(StatusCodes.OK).json({
      success: true,
      scholar: scholarDoc,
    });
  };
  getAllScholar = async (_, res) => {
    const scholarDoc = await Scholar.find().populate("User");
    return res.status(StatusCodes.OK).json({
      scholarships: scholarDoc,
    });
  };
}
export default new ScholarRepo();
