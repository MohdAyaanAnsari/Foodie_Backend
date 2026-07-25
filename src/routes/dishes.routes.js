import express from "express";
const router = express.Router();
import dishesController from "../controllers/dishes.controller.js";


router.get("/AllDishes", dishesController.getDishes);

export default router;
