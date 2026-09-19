import { Router } from "express";
import WalletController from "../controllers/walletController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, WalletController.getAllWallets);

router.get("/:id", authMiddleware, WalletController.getWalletById);

router.post("/", authMiddleware, WalletController.createWallet);

router.put("/:id", authMiddleware, WalletController.updateWallet);

router.delete("/:id", authMiddleware, WalletController.deleteWallet);

export default router;