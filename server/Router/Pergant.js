import express from "express";
import PergantRepo from "../controller/Pergent.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();

router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    PergantRepo.createPergant
  )
  .get(PergantRepo.allPergant);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    PergantRepo.deletePergant
  )
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    PergantRepo.updatePergant
  )
  .get(
    PergantRepo.singlePergant
  );
router
  .route("/increment/:id")
  .patch(
    PergantRepo.incrementPergant
  )
  .get(
    PergantRepo.singlePergant
  );

export default router;
