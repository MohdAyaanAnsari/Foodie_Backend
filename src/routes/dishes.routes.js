import express from "express";
import dishesController from "../controllers/dishes.controller.js";
const router = express.Router();


router.get("/AllDishes", dishesController.getDishes);
router.get("/IndianDishes", dishesController.getIndianDishes);
router.get("/ItalianDishes", dishesController.getItalianDishes);
router.get("/MexicanDishes", dishesController.getMexicanDishes);
router.get("/ChineseDishes", dishesController.getChineseDishes);
router.get("/KoreanDishes", dishesController.getKoreanDishes);
router.get("/JapaneseDishes", dishesController.getJapaneseDishes);

export default router;
