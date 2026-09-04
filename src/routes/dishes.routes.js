import express from "express";
import dishesController from "../controllers/dishes.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();


router.get("/AllDishes", authMiddleware, dishesController.getDishes);
router.get("/IndianDishes", authMiddleware, dishesController.getIndianDishes);
router.get("/ItalianDishes", authMiddleware, dishesController.getItalianDishes);
router.get("/MexicanDishes", authMiddleware, dishesController.getMexicanDishes);
router.get("/ChineseDishes", authMiddleware, dishesController.getChineseDishes);
router.get("/KoreanDishes", authMiddleware, dishesController.getKoreanDishes);
router.get("/JapaneseDishes", authMiddleware, dishesController.getJapaneseDishes);

export default router;
