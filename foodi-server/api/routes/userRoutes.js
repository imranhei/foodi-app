import express from "express";
const router = express.Router();

import userController from "../controllers/userController.js";

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.get("/admin/email", userController.getAdmin);
router.patch("/admin/:id", userController.makeAdmin);

export default router;