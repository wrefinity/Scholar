import express from "express";
import ServiceRepo from "../controller/Services.js";
import AuthRoles from "../middleware/authroles.js";
const router = express.Router();

router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    ServiceRepo.createService
  )
  .get(ServiceRepo.allServices);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    ServiceRepo.deleteService
  )
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    ServiceRepo.updateService
  )
  .get(ServiceRepo.singleService);

export default router;
