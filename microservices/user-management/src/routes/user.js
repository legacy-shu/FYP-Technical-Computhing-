import express from "express";
import * as userController from "../controllers/user.js";
import {
  validateRegisterProfile,
  validateUpdateProfile,
} from "../middlewares/validator.js";
const router = express.Router();

router.post("/", validateRegisterProfile, userController.registerUser);
router.get("/:id", userController.getUser);
router.put("/:id", validateUpdateProfile, userController.updateUser);
router.delete("/:id", userController.removeUser);

export default router;
