import express from "express";
import * as authController from "../controllers/auth.js";
import { validateCredential } from "../middlewares/validator.js";
const router = express.Router();

router.get("/check", authController.check);
router.post("/login", validateCredential, authController.login);

export default router;
