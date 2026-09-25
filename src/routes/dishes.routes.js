import express from "express";
import dishesController from "../controllers/dishes.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();


router.get("/AllDishes", authMiddleware, dishesController.getDishes);
router.get("/IndianDishes",  dishesController.getIndianDishes);
router.get("/ItalianDishes",  dishesController.getItalianDishes);
router.get("/MexicanDishes",  dishesController.getMexicanDishes);
router.get("/ChineseDishes", dishesController.getChineseDishes);
router.get("/KoreanDishes", dishesController.getKoreanDishes);
router.get("/JapaneseDishes",  dishesController.getJapaneseDishes);

export default router;
