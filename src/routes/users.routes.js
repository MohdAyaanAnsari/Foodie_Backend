import express from "express";
const router = express.Router();

import usercontroller from "../controllers/user.controller.js";

router.get("/", usercontroller.getUsers);

export default router;