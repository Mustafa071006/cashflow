import express from "express";
import TransactionController from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", TransactionController.getAllTransactions);
router.get("/:id", TransactionController.getTransactionById);
router.post("/", TransactionController.createTransaction);
router.put("/:id", TransactionController.updateTransaction);
router.delete("/:id", TransactionController.deleteTransaction);

export default router;