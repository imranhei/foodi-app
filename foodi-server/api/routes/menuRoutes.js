import express from "express";
const router = express.Router();

import menuController from "../controllers/menuController.js"

// get all menu items from database
router.get("/", menuController.getAllMenuItems);

export default router;
