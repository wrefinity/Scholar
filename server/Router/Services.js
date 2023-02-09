import express from "express";
import ServiceRepo from "../controller/Services.js";
import { verifyTokenAndAdmin } from "../middleware/authenticate.js";

const router = express.Router();

router
  .route("/")
  .post(verifyTokenAndAdmin, ServiceRepo.createService)
  .get(ServiceRepo.allServices);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, ServiceRepo.deleteService)
  .patch(verifyTokenAndAdmin, ServiceRepo.updateService)
  .get(ServiceRepo.singleService);

export default router;