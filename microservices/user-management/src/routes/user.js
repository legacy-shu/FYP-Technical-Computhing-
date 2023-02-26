import express from "express";
import * as userController from "../controllers/user.js";
import { validateProfile } from "../middlewares/validator.js";
const router = express.Router();

router.post("/", validateProfile, userController.registerUser);
router.get("/:id", userController.getUser);
router.put("/:id", validateProfile, userController.updateUser);
router.delete("/:id", userController.removeUser);

export default router;
