import { Router } from "express";
import { verifyKey } from "../../middlewares/keyMiddleware.js";
import userController from "../../controllers/userController.js";
import { multerUploadSettings } from "../../utils/multerStorage.js";

const router = Router();
const filetypes = /jpeg|jpg|png|gif/;
const errorMessage = "Solo imagenes en formato jpeg, jpg, png, gif!";
const type = "avatar";
const uploadSettings = multerUploadSettings(filetypes, errorMessage, type);

router
  .get("/", userController.getAllUsers)
  .get("/:uuid", userController.getOneUser)
  .post("/", userController.createUser)
  .patch("/:uuid", userController.updateUser)
  .delete("/:uuid", userController.deleteUser)
  .post("/forgot-password", userController.forgotPassword)
  .post("/set-password", verifyKey, userController.setPassword)
  .post("/verify-account", verifyKey, userController.verifyAccount)
  .post("/set-avatar/:uuid", uploadSettings, userController.setAvatar);

export default router;
