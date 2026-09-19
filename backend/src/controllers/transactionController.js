import TransactionService from "../services/transactionService.js";
import WalletService from "../services/walletService.js";

class TransactionController {
  static async getAllTransactions(req, res) {
    try {
      const userId = req.user.id;

      const transactions =
        await TransactionService.findAllTransactionsByUser(userId);

      return res.status(200).json({
        success: true,

        data: transactions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async getTransactionById(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      const transaction = await TransactionService.findTransactionById(
        id,
        userId,
      );

      if (!transaction) {
        return res.status(404).json({
          success: false,

          message: "Transaksi tidak ditemukan",
        });
      }

      return res.status(200).json({
        success: true,

        data: transaction,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async createTransaction(req, res) {
    try {
      const {
        title,
        amount,
        type,
        note,
        transactionDate,
        walletId,
        categoryId,
      } = req.body;

      const userId = req.user.id;

      const wallet = await TransactionService.findWalletById(walletId, userId);

      if (!wallet) {
        return res.status(404).json({
          success: false,

          message: "Wallet tidak ditemukan",
        });
      }

      const category = await TransactionService.findCategoryById(
        categoryId,
        userId,
      );

      if (!category) {
        return res.status(404).json({
          success: false,

          message: "Kategori tidak ditemukan",
        });
      }

      let newBalance = Number(wallet.balance);

      if (type === "INCOME") {
        newBalance += Number(amount);
      } else {
        newBalance -= Number(amount);
      }

      await WalletService.updateBalance(walletId, newBalance);

      const transaction = await TransactionService.createTransaction({
        title,

        amount,

        type,

        note,

        transactionDate: new Date(transactionDate),

        walletId,

        categoryId,
      });

      return res.status(201).json({
        success: true,

        message: "Transaksi berhasil dibuat",

        data: transaction,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async updateTransaction(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      const oldTransaction = await TransactionService.findTransactionById(
        id,
        userId,
      );

      if (!oldTransaction) {
        return res.status(404).json({
          success: false,

          message: "Transaksi tidak ditemukan",
        });
      }

      const {
        title,
        amount,
        type,
        note,
        transactionDate,
        walletId,
        categoryId,
      } = req.body;

      const wallet = await TransactionService.findWalletById(walletId, userId);

      if (!wallet) {
        return res.status(404).json({
          success: false,

          message: "Wallet tidak ditemukan",
        });
      }

      const category = await TransactionService.findCategoryById(
        categoryId,
        userId,
      );

      if (!category) {
        return res.status(404).json({
          success: false,

          message: "Kategori tidak ditemukan",
        });
      }

      let balance = Number(wallet.balance);

      if (oldTransaction.type === "INCOME") {
        balance -= Number(oldTransaction.amount);
      } else {
        balance += Number(oldTransaction.amount);
      }

      if (type === "INCOME") {
        balance += Number(amount);
      } else {
        balance -= Number(amount);
      }

      await WalletService.updateBalance(walletId, balance);

      await TransactionService.updateTransaction(id, userId, {
        title,

        amount,

        type,

        note,

        transactionDate: new Date(transactionDate),

        walletId,

        categoryId,
      });

      const updated = await TransactionService.findTransactionById(id, userId);

      return res.status(200).json({
        success: true,

        message: "Transaksi berhasil diperbarui",

        data: updated,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async deleteTransaction(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      const transaction = await TransactionService.findTransactionById(
        id,
        userId,
      );

      if (!transaction) {
        return res.status(404).json({
          success: false,

          message: "Transaksi tidak ditemukan",
        });
      }

      const wallet = await TransactionService.findWalletById(
        transaction.walletId,
        userId,
      );

      let balance = Number(wallet.balance);

      if (transaction.type === "EXPENSE") {
        balance += Number(transaction.amount);
      } else {
        balance -= Number(transaction.amount);
      }

      await WalletService.updateBalance(transaction.walletId, balance);

      await TransactionService.deleteTransaction(id, userId);

      return res.status(200).json({
        success: true,

        message: "Transaksi berhasil dihapus",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }
}

export default TransactionController;
