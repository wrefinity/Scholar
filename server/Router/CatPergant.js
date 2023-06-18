import express from "express";
import CatPergant from "../controller/CatPergent.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();

router
  .route("/")
  .post(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    CatPergant.createCatPat
  )
  .get(CatPergant.allCatPat);
router
  .route("/:id")
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    CatPergant.deleteCatPat
  )
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    CatPergant.updateCatPat
  )
  .get(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    CatPergant.singleCatPat
  );

export default router;
