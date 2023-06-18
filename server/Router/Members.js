import express from "express";
import MemberRepo from "../controller/Members.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();

router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    MemberRepo.createMember
  )
  .get(MemberRepo.allMembers);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    MemberRepo.deleteMember
  )
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    MemberRepo.updateMember
  )
  .get(MemberRepo.singleMember);

export default router;
