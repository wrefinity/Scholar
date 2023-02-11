import express from "express";
import CategoryRepo from "../controller/Category.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();

router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    CategoryRepo.createCategory
  )
  .get(CategoryRepo.allCategory);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    CategoryRepo.deleteCategory
  )
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    CategoryRepo.updateCategory
  )
  .get(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    CategoryRepo.singleCategory
  );

export default router;
