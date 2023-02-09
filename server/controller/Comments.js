import Comment from "../model/Comment.js";
import mongoose from "mongoose";
import StatusCodes from "http-status-codes";
import asyncHandler from "express-async-handler";
import checkId from "../Utils/mongoIdCheck.js";
import ModelActions from "./ModelActions.js";

class CommentRepo{
  createComment = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary values"
      );
    }
    const userId = req.user.id;
    const comment = await ModelActions.creator(Comment, { ...req.body, userId });
    comment && res.status(200).json(comment);
  });
  
  updateComment = asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new CustomError.BadRequestError(
        "Please provide the necessary updatable information"
      );
    }
    const { id } = req.params;
    checkId(id);
    const userId = req.user.id;
    const match = await ModelActions.findOne(Comment, { userId, _id: id });
    if (!match) {
      throw new CustomError.BadRequestError(`Permission Denied`);
    }
    const updated = await ModelActions.updator(Comment, id, req.body);
    updated && res.status(200).json(updated);
  });
  
  deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id);
    const userId = req.user.id;
    const match = await ModelActions.findOne(Comment, { userId, _id: id });
    if (!match)
      throw new CustomError.BadRequestError(`Permission Denied`);
    const deleted = await ModelActions.deletor(Comment, id, req.body);
    deleted && res.status(StatusCodes.OK).json(deleted)
  });
  
  allComments = asyncHandler(async (req, res) => {
    const comments = await ModelActions.findAll(Comment);
    comments && res.status(StatusCodes.OK).json(comments);
  });
  
  singleComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    checkId(id)
    const comments = await ModelActions.findId(Comment, id);
    comments && res.status(StatusCodes.OK).json(comments);
  });

}

export default new CommentRepo()