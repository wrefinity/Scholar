import express from "express";
import AboutRepo from "../controller/About.js";
import AuthRoles from "../middleware/authroles.js";
const router = express.Router();

router
  .route("/")
  .post(AuthRoles.Authenticate, AuthRoles.authorizeAdmin, AboutRepo.createAbout)
  .get(AboutRepo.allAbout);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    AboutRepo.deleteAbout
  )
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    AboutRepo.updateAbout
  )
  .get(AboutRepo.singleAbout);

export default router;
