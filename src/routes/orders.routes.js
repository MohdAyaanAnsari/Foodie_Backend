import express from "express";
const router = express.Router();

import orderController from "../controllers/orders.controller.js";
import ordersController from "../controllers/orders.controller.js";

router.get("/AllOrders", ordersController.getOrders);

export default router;