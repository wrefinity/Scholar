import express from "express";
import GalleryRepo from "../controller/Gallery.js";
import AuthRoles from "../middleware/authroles.js";
const router = express.Router();

router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    GalleryRepo.createGallery
  )
  .get(GalleryRepo.allGalleries);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    GalleryRepo.deleteGallery
  )
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    GalleryRepo.updateGallery
  )
  .get(GalleryRepo.singleGallery);

export default router;
