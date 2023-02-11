import express from "express";
import PostRepo from "../controller/Posts.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();

router
  .route("/")
  .post(AuthRoles.Authenticate, AuthRoles.authorizeAdmin, PostRepo.createPost)
  .get(PostRepo.allPosts);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    PostRepo.deletePost
  )
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    PostRepo.updatePost
  )
  .get(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    PostRepo.singlePost
  );

export default router;
