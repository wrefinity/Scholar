import Post from "../model/Posts.js";
import asyncHandler from "express-async-handler";
import StatusCodes from "http-status-codes";
import checkId from "../Utils/mongoIdCheck.js";
import CustomError from "../error/index.js";
import ModelActions from "./ModelActions.js";

class PostRepo {
  createPost = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const {
      benefitPre,
      benefitUnder,
      benefitPost,
      eligibilityPre,
      eligibilityUnder,
      eligibilityPost,
    } = req.body;
    const benefit = { benefitPre, benefitUnder, benefitPost };
    const eligibility = { eligibilityPre, eligibilityUnder, eligibilityPost };
    const data = await ModelActions.creator(Post, {
      ...req.body,
      benefit,
      eligibility,
    });
    data && res.status(StatusCodes.CREATED).json(data);
  });

  updatePost = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Post, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No post with id : ${id}`);
    }
    const {
      benefitPre,
      benefitUnder,
      benefitPost,
      eligibilityPre,
      eligibilityUnder,
      eligibilityPost,
    } = req.body;
    const benefit = { benefitPre, benefitUnder, benefitPost };
    const eligibility = { eligibilityPre, eligibilityUnder, eligibilityPost };
    const updated = await ModelActions.updator(Post, id, {
      ...req.body,
      benefit,
      eligibility,
    });
    updated &&
      res.status(StatusCodes.OK).json({
        data: updated,
        message: "post updated",
      });
  });

  deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const match = await ModelActions.findOne(Post, { _id: id });
    if (!match) {
      throw new CustomError.NotFoundRequestError(`No post with id : ${id}`);
    }
    const deleted = await ModelActions.deletor(Post, id);
    deleted &&
      res
        .status(StatusCodes.OK)
        .json({ data: deleted, message: "post deleted" });
  });

  allPosts = asyncHandler(async (req, res) => {
    const data = await Post.find({})
      .populate({
        path: "categoryId",
        select: ["name", "amount", "status"],
      })
      .exec();
    data && res.status(StatusCodes.OK).json(data);
  });

  singlePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const data = await ModelActions.findId(Post, id);
    if (!data) {
      throw new CustomError.NotFoundRequestError(`No post with id : ${id}`);
    }
    res.status(StatusCodes.OK).json(data);
  });
}
export default new PostRepo();
