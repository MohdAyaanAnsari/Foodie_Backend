import express from "express";

import catController from "../controllers/cat.controller.js";

const router = express.Router();


router.get('/DishesCategories', catController.getAllDishesCategories)

export default router;