import { Router } from "express";

import AuthController from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import ownerMiddleware from "../middleware/ownerMiddleware.js";

const router = Router();

// REGISTER

router.post("/register", AuthController.register);

// LOGIN

router.post("/login", AuthController.login);

// CHECK EMAIL FORGOT PASSWORD

router.post("/check-email", AuthController.checkEmail);

// RESET PASSWORD

router.patch("/reset-password", AuthController.resetPassword);

// GET CURRENT USER

router.get("/me", authMiddleware, AuthController.me);

// OWNER TEST ROUTE

router.get("/owner", authMiddleware, ownerMiddleware, (req, res) => {
  return res.json({
    success: true,

    message: "Selamat datang Owner",

    user: req.user,
  });
});

export default router;
