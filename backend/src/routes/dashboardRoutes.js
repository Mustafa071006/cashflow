import express from "express";
import DashboardController from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// Dashboard Summary
// ==========================

router.get(
  "/summary",
  authMiddleware,
  DashboardController.getSummary
);

// ==========================
// Recent Transactions
// ==========================

router.get(
  "/recent-transactions",
  authMiddleware,
  DashboardController.getRecentTransactions
);

// ==========================
// Wallet Summary
// ==========================

router.get(
  "/wallet-summary",
  authMiddleware,
  DashboardController.getWalletSummary
);

// ==========================
// CashFlow Chart
// ==========================

router.get(
  "/chart",
  authMiddleware,
  DashboardController.getCashFlowChart
);

export default router;