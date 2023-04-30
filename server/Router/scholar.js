import express from "express";
import ScholarRepo from "../controller/scholar.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();

router
  .route("/apply")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudent,
    ScholarRepo.addScholar
  )
  .get(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    ScholarRepo.getAllScholar
  );
router
  .route("/:scholarId")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    ScholarRepo.deleteUserScholar
  );
router.route("/:userId").get(AuthRoles.Authenticate, ScholarRepo.getScholar);
router
  .route("/:userId/:postId")
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    ScholarRepo.deleteScholarPost
  );

export default router;
