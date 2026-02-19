import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/api/users", userController.getAllUsers);

router.get("/api/users/active", userController.getActiveUsers);

router.post("/api/users", userController.createUserController);

router.patch("/api/users/:id/toggle-active", userController.toggleUserActive);

router.delete("/api/users/:id", userController.deleteUserController);

export default router;
