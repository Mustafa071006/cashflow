import { Router } from "express";

import ReportController from "../controllers/reportController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

// ==========================
// OVERVIEW
// ==========================

router.get(
  "/overview",
  ReportController.getOverview
);

// ==========================
// EXPENSE BY CATEGORY
// ==========================

router.get(
  "/category",
  ReportController.getExpenseByCategory
);

// ==========================
// MONTHLY REPORT
// ==========================

router.get(
  "/monthly",
  ReportController.getMonthlyReport
);

export default router;