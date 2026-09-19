import OwnerService from "../services/ownerService.js";

class OwnerController {
  // =========================
  // DASHBOARD
  // =========================

  static async getDashboardStats(req, res) {
    try {
      const userId = req.user.id;

      const stats = await OwnerService.getDashboardStats(userId);

      return res.status(200).json({
        success: true,

        data: stats,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  // =========================
  // USER MANAGEMENT
  // =========================

  static async getAllUsers(req, res) {
    try {
      const users = await OwnerService.getAllUsers();

      return res.status(200).json({
        success: true,

        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await OwnerService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,

          message: "User tidak ditemukan",
        });
      }

      return res.status(200).json({
        success: true,

        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;

      const { name, email, role } = req.body;

      const user = await OwnerService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,

          message: "User tidak ditemukan",
        });
      }

      const updatedUser = await OwnerService.updateUser(id, {
        name,

        email,

        role,
      });

      return res.status(200).json({
        success: true,

        message: "User berhasil diperbarui",

        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await OwnerService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,

          message: "User tidak ditemukan",
        });
      }

      await OwnerService.deleteUser(id);

      return res.status(200).json({
        success: true,

        message: "User berhasil dihapus",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }
}

export default OwnerController;
