import express from "express";
import GalleryRepo from "../controller/Gallery.js";
import { verifyTokenAndAdmin } from "../middleware/authenticate.js";

const router = express.Router();

router
  .route("/")
  .post(verifyTokenAndAdmin, GalleryRepo.createGallery)
  .get(GalleryRepo.allGalleries);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, GalleryRepo.deleteGallery)
  .patch(verifyTokenAndAdmin, GalleryRepo.updateGallery)
  .get(GalleryRepo.singleGallery);

export default router;
