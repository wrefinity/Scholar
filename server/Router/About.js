import express from "express";
import AboutRepo from "../controller/About.js";
import { verifyTokenAndAdmin } from "../middleware/authenticate.js";

const router = express.Router();

router
  .route("/")
  .post(verifyTokenAndAdmin, AboutRepo.createAbout)
  .get(AboutRepo.allAbout);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, AboutRepo.deleteAbout)
  .patch(verifyTokenAndAdmin, AboutRepo.updateAbout)
  .get(AboutRepo.singleAbout);

export default router;