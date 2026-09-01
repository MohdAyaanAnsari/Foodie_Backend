import express from "express";
const router = express.Router();

import authController from "../controllers/auth.controller.js";

router.post("/Signup", authController.signup);
router.post("/VerifyOtp", authController.verifyOtp);

export default router;