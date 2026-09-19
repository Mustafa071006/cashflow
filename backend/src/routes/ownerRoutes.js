import { Router } from "express";

import OwnerController from "../controllers/ownerController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import ownerMiddleware from "../middleware/ownerMiddleware.js";

const router = Router();

// Semua route owner wajib login + role OWNER

router.use(authMiddleware);

router.use(ownerMiddleware);

// =========================
// OWNER DASHBOARD
// =========================

router.get("/dashboard", OwnerController.getDashboardStats);

// =========================
// USER MANAGEMENT
// =========================

router.get("/users", OwnerController.getAllUsers);

router.get("/users/:id", OwnerController.getUserById);

router.put("/users/:id", OwnerController.updateUser);

router.delete("/users/:id", OwnerController.deleteUser);

export default router;
