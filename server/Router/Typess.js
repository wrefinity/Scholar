import express from "express";
import TypeRepo from "../controller/TypeApplicant.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();

router
  .route("/")
  .post(AuthRoles.Authenticate, AuthRoles.authorizeAdmin, TypeRepo.createType)
  .get(TypeRepo.allTypeModel);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    TypeRepo.deleteTypeModel
  )
  .patch(AuthRoles.Authenticate, AuthRoles.authorizeAdmin, TypeRepo.upateType);

export default router;
