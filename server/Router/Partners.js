import express from "express";
import PartnerRepo from "../controller/Partners.js";
import AuthRoles from "../middleware/authroles.js";
const router = express.Router();

router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    PartnerRepo.createPartner
  )
  .get(PartnerRepo.allPartner);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    PartnerRepo.deletePartner
  );

export default router;
