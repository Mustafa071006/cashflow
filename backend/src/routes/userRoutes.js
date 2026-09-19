import { Router } from "express";

import UserController from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import ownerMiddleware from "../middleware/ownerMiddleware.js";

const router = Router();

router.get("/", authMiddleware, ownerMiddleware, UserController.getAllUsers);

router.patch("/profile", authMiddleware, UserController.updateProfile);

router.patch("/change-password", authMiddleware, UserController.changePassword);

router.get("/:id", authMiddleware, ownerMiddleware, UserController.getUserById);

router.post("/", authMiddleware, ownerMiddleware, UserController.createUser);

router.put("/:id", authMiddleware, ownerMiddleware, UserController.updateUser);

router.delete("/:id", authMiddleware, ownerMiddleware, UserController.deleteUser,);

export default router;
