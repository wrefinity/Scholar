import express from "express";
import UserRepo from "../controller/Users.js";
import {
  verifyTokenAndRoles,
  verifyTokenAndAdmin,
} from "../middleware/authenticate.js";

const router = express.Router();

router
  .route("/")
  .post(UserRepo.regPost)
  .get(verifyTokenAndAdmin, UserRepo.getUsers);

router
  .route("/:id")
  .get(verifyTokenAndRoles, UserRepo.getUser)
  .delete(verifyTokenAndAdmin, UserRepo.deleteUsers)
  .patch(verifyTokenAndRoles, UserRepo.updateUser);

router.route("/login").post(UserRepo.login_post);

router.post("/changePassword", verifyTokenAndRoles, UserRepo.changePassword);
router.post("/changeImage", verifyTokenAndRoles, UserRepo.changeImage);
router.get("/logout", UserRepo.logout);

export default router;