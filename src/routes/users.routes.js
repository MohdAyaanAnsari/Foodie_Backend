import express from "express";
const router = express.Router();

import usercontroller from "../controllers/user.controller.js";

router.get("/AllUsers", usercontroller.getUsers);
// router.post("/createUser", usercontroller.createUser);

export default router;