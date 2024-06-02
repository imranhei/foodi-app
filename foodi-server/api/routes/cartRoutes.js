import express from "express";
const router = express.Router();

import cartController from "../controllers/cartController.js";

router.get("/", cartController.getCartByEmail);
router.post("/", cartController.addToCart);
router.delete("/:id", cartController.deleteCart);
router.put("/:id", cartController.updateCart);
router.get("/:id", cartController.getSingleCart);

export default router;