import express from "express";

const router = express.Router();
import cartController from "../controllers/cart.controller.js";

router.get('/AllCarts', cartController.getCarts);
router.post("/add", cartController.addToCart);
router.get("/:user_id", cartController.getUserCart);

export default router;