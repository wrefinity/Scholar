import express from "express";
import ScholarRepo from "../controller/scholar.js";
import AuthRoles from "../middleware/authroles";

const router = express.Router();

router
  .route("/apply")
  .post(AuthRoles.Authenticate, AuthRoles.authorizeStudent, ScholarRepo.addScholar)
  .get(AuthRoles.Authenticate, AuthRoles.authorizeAdmin, ScholarRepo.getAllScholar);
router
  .route("/:scholarId")
  .delete(verifyTokenAndAdmin, ScholarRepo.deleteUserScholar)
router
  .route("/:userId/:postId")  
  .patch(AuthRoles.Authenticate, AuthRoles.authorizeStudentAdmin, ScholarRepo.deleteScholarPost);

export default router;