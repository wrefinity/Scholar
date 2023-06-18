import express from "express";
import CommentRepo from "../controller/Comments.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();

router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    CommentRepo.createComment
  )
  .get(CommentRepo.allComments);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    CommentRepo.deleteComment
  )
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    CommentRepo.updateComment
  )
  .get(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    CommentRepo.singleComment
  );

export default router;
