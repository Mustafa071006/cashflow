import WalletService from "../services/walletService.js";

class WalletController {
  static async getAllWallets(req, res) {
    try {
      const userId = req.user.id;

      const wallets = await WalletService.findAllWalletsByUser(userId);

      return res.status(200).json({
        success: true,

        data: wallets,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async getWalletById(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      const wallet = await WalletService.findWalletById(id, userId);

      if (!wallet) {
        return res.status(404).json({
          success: false,

          message: "Wallet tidak ditemukan",
        });
      }

      return res.status(200).json({
        success: true,

        data: wallet,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async createWallet(req, res) {
    try {
      const { name, balance } = req.body;

      const userId = req.user.id;

      const existingWallet = await WalletService.findWalletByName(userId, name);

      if (existingWallet) {
        return res.status(400).json({
          success: false,

          message: `Wallet ${name} sudah ada.`,
        });
      }

      const wallet = await WalletService.createWallet({
        name,

        balance,

        userId,
      });

      return res.status(201).json({
        success: true,

        message: "Wallet berhasil dibuat",

        data: wallet,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async updateWallet(req, res) {
    try {
      const { id } = req.params;

      const { name, balance } = req.body;

      const userId = req.user.id;

      const wallet = await WalletService.findWalletById(id, userId);

      if (!wallet) {
        return res.status(404).json({
          success: false,

          message: "Wallet tidak ditemukan",
        });
      }

      if (name && name !== wallet.name) {
        const existingWallet = await WalletService.findWalletByName(
          userId,
          name,
        );

        if (existingWallet) {
          return res.status(400).json({
            success: false,

            message: `Wallet ${name} sudah ada.`,
          });
        }
      }

      await WalletService.updateWallet(id, userId, {
        name,
        balance,
      });

      const updatedWallet = await WalletService.findWalletById(id, userId);

      return res.status(200).json({
        success: true,

        message: "Wallet berhasil diperbarui",

        data: updatedWallet,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async deleteWallet(req, res) {
    try {
      const { id } = req.params;

      const userId = req.user.id;

      const wallet = await WalletService.findWalletById(id, userId);

      if (!wallet) {
        return res.status(404).json({
          success: false,

          message: "Wallet tidak ditemukan",
        });
      }

      await WalletService.deleteWallet(id, userId);

      return res.status(200).json({
        success: true,

        message: "Wallet berhasil dihapus",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }
}

export default WalletController;
