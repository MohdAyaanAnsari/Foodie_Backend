import express from "express";
import cartController from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/AllCarts", cartController.getCarts);

router.post("/add", cartController.addToCart);

router.get("/:user_id", cartController.getUserCart);

router.patch(
    "/item/:cart_item_id",
    cartController.updateCartItem
);

router.delete(
    "/item/:cart_item_id",
    cartController.removeCartItem
);

export default router;