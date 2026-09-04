import express from "express";
import cartController from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/AllCarts",authMiddleware, cartController.getCarts);

router.post("/add",authMiddleware, cartController.addToCart);

router.get("/getCart",authMiddleware, cartController.getUserCart);

router.patch(
    "/item/:cart_item_id",
    authMiddleware, cartController.updateCartItem
);

router.delete(
    "/item/:cart_item_id",
    authMiddleware, cartController.removeCartItem
);

export default router;