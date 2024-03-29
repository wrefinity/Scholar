import express from "express";
import UserRepo from "../controller/Users.js";
import AuthRoles from "../middleware/authroles.js";

const router = express.Router();

router.post("/", UserRepo.regPost)
router.get('/', AuthRoles.Authenticate, AuthRoles.authorizeAdmin, UserRepo.getUsers);

router
  .route("/:id")
  .get(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    UserRepo.getUser
  )
  .delete(
    AuthRoles.Authenticate,
    AuthRoles.authorizeAdmin,
    UserRepo.deleteUsers
  )
  .patch(
    AuthRoles.Authenticate,
    AuthRoles.authorizeStudentAdmin,
    UserRepo.updateUser
  );

router.route("/login").post(UserRepo.login_post);

router.route("/reset_link").post(UserRepo.reset_link);
router.post("/reset_password/:id/:token", UserRepo.changePassword);
router.get("/users_verification/:id/:token", UserRepo.confirmRegistration);

router.post(
  "/changePassword",
  AuthRoles.Authenticate,
  AuthRoles.authorizeStudentAdmin,
  UserRepo.changePassword
);
router.post(
  "/changeImage",
  AuthRoles.Authenticate,
  AuthRoles.authorizeStudentAdmin,
  UserRepo.changeImage
);
router.get("/logout", UserRepo.logout);



export default router;
