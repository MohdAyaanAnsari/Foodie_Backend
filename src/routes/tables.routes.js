import express from "express";
const router = express.Router();

import tableController from "../controllers/tables.controller.js";


router.get("/AllTables", tableController.getTables);

export default router;