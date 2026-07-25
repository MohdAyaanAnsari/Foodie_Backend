import express from "express";
import dishesController from "../controllers/dishes.controller.js";
const router = express.Router();


router.get("/AllDishes", dishesController.getDishes);

export default router;
