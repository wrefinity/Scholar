import express from "express";
import PostRepo from "../controller/Posts.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndRoles,
} from "../middleware/authenticate.js";

const router = express.Router();

router
  .route("/")
  .post(verifyTokenAndAdmin, PostRepo.createPost)
  .get(PostRepo.allPosts);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, PostRepo.deletePost)
  .patch(verifyTokenAndAdmin, PostRepo.updatePost)
  .get(verifyTokenAndRoles, PostRepo.singlePost);

export default router;
