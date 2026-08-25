import express from "express";

import tableController from "../controllers/tables.controller.js";


const router = express.Router();


// Get all restaurant tables
router.get(
    "/",
    tableController.getTables
);


// Search available tables
router.post(
    "/available",
    tableController.searchAvailableTables
);


export default router;