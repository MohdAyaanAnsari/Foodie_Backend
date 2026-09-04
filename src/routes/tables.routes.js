import express from "express";

import tableController from "../controllers/tables.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();


// Get all restaurant tables
router.get(
    "/",
    tableController.getTables
);


// Search available tables
router.post(
    "/available",
    authMiddleware, tableController.searchAvailableTables
);


export default router;