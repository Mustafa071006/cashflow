import UserService from "../services/userService.js";
import AuthService from "../services/authService.js";

import { hashPassword, comparePassword } from "../utils/bcrypt.js";

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.findAllUsers();

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

  static async createUser(req, res) {
    try {
      const { name, email, password, role } = req.body;

      const existingUser = await AuthService.findUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({
          success: false,

          message: "Email sudah digunakan",
        });
      }

      const hashedPassword = await hashPassword(password);

      const user = await UserService.createUser({
        name,

        email,

        password: hashedPassword,

        role,
      });

      return res.status(201).json({
        success: true,

        message: "User berhasil dibuat",

        data: {
          id: user.id,

          name: user.name,

          email: user.email,

          role: user.role,
        },
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

      const user = await UserService.findUserById(id);

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

      const user = await UserService.findUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,

          message: "User tidak ditemukan",
        });
      }

      const updatedUser = await UserService.updateUser(id, {
        name,
        email,
        role,
      });

      return res.status(200).json({
        success: true,

        message: "User berhasil diupdate",

        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async updateProfile(req, res) {
    try {
      const userId = req.user.id;

      const { name, email } = req.body;

      const updatedUser = await UserService.updateProfile(userId, {
        name,
        email,
      });

      return res.status(200).json({
        success: true,

        message: "Profile berhasil diperbarui",

        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async changePassword(req, res) {
    try {
      const userId = req.user.id;

      const { currentPassword, newPassword } = req.body;

      const user = await UserService.findUserWithPassword(userId);

      if (!user) {
        return res.status(404).json({
          success: false,

          message: "User tidak ditemukan",
        });
      }

      const isMatch = await comparePassword(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,

          message: "Password lama tidak sesuai",
        });
      }

      const hashedPassword = await hashPassword(newPassword);

      await UserService.changePassword(
        userId,

        hashedPassword,
      );

      return res.status(200).json({
        success: true,

        message: "Password berhasil diperbarui",
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

      const user = await UserService.findUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,

          message: "User tidak ditemukan",
        });
      }

      await UserService.deleteUser(id);

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

export default UserController;
