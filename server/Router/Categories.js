import express from "express";
import CategoryRepo from "../controller/Category.js";
import {
  verifyTokenAndRoles,
  verifyTokenAndAdmin,
} from "../middleware/authenticate.js";

const router = express.Router();

router
  .route("/")
  .post(verifyTokenAndAdmin, CategoryRepo.createCategory)
  .get(CategoryRepo.allCategory);
router
  .route("/:id")
  .delete(verifyTokenAndRoles, CategoryRepo.deleteCategory)
  .patch(verifyTokenAndRoles, CategoryRepo.updateCategory)
  .get(verifyTokenAndRoles, CategoryRepo.singleCategory);

export default router;
