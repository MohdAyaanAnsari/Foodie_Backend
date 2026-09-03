import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/auth.middleware.js";

import authController from "../controllers/auth.controller.js";

router.post("/Signup", authController.signup);
router.post("/VerifyOtp", authController.verifyOtp);
router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);

router.get("/me", authMiddleware, authController.me);

export default router;