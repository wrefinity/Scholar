import express from "express";
import CommentRepo from "../controller/Comments.js";
import { verifyTokenAndRoles } from "../middleware/authenticate.js";

const router = express.Router();

router
  .route("/")
  .post(verifyTokenAndRoles, CommentRepo.createComment)
  .get(CommentRepo.allComments);
router
  .route("/:id")
  .delete(verifyTokenAndRoles, CommentRepo.deleteComment)
  .patch(verifyTokenAndRoles, CommentRepo.updateComment)
  .get(verifyTokenAndRoles, CommentRepo.singleComment);

export default router;