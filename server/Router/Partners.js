import express from "express";
import PartnerRepo from "../controller/Partners.js";
import { verifyTokenAndAdmin } from "../middleware/authenticate.js";
const router = express.Router();

router
  .route("/")
  .post(verifyTokenAndAdmin, PartnerRepo.createPartner)
  .get(PartnerRepo.allPartner);
router.route("/:id").delete(verifyTokenAndAdmin, PartnerRepo.deletePartner);

export default router;
