import express from "express";
import SubRepo from "../controller/Subcribers.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();

router
  .route("/")
  .post(
    SubRepo.createSub
  )
  .get(SubRepo.allSubscriptions);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    SubRepo.deleteSubscribe
  )
router.route("/notify")
  .post(AuthRoles.Authenticate, SubRepo.sendNewsLetter)

export default router;
