import express from "express";

import locationController from "../controllers/locations.controller.js";
const router = express.Router();

router.get('/AllLocations', locationController.getLocations);

export default router;