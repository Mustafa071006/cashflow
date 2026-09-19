import AuthService from "../services/authService.js";

import { hashPassword, comparePassword } from "../utils/bcrypt.js";

import { generateToken } from "../utils/jwt.js";

class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await AuthService.findUserByEmail(email);

      if (existingUser) {
        return res.status(400).json({
          success: false,

          message: "Email sudah digunakan",
        });
      }

      const hashedPassword = await hashPassword(password);

      const user = await AuthService.createUser({
        name,

        email,

        password: hashedPassword,
      });

      return res.status(201).json({
        success: true,

        message: "Register berhasil",

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

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.findUserByEmail(email);

      if (!user) {
        return res.status(404).json({
          success: false,

          message: "Email atau password salah",
        });
      }

      const isMatch = await comparePassword(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,

          message: "Email atau password salah",
        });
      }

      const token = generateToken({
        id: user.id,

        role: user.role,
      });

      return res.status(200).json({
        success: true,

        message: "Login berhasil",

        token,

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

  static async checkEmail(req, res) {
    try {
      const { email } = req.body;

      const user = await AuthService.findUserByEmail(email);

      if (!user) {
        return res.status(404).json({
          success: false,

          code: "EMAIL_NOT_FOUND",

          message: "Email tidak ditemukan",
        });
      }

      return res.status(200).json({
        success: true,

        message: "Email ditemukan",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { email, newPassword } = req.body;

      const user = await AuthService.findUserByEmail(email);

      if (!user) {
        return res.status(404).json({
          success: false,

          code: "EMAIL_NOT_FOUND",

          message: "Email tidak ditemukan",
        });
      }

      const hashedPassword = await hashPassword(newPassword);

      const updatedUser = await AuthService.updatePassword(
        email,
        hashedPassword,
      );

      return res.status(200).json({
        success: true,

        message: "Password berhasil diperbarui",

        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,

        message: error.message,
      });
    }
  }

  static async me(req, res) {
    return res.status(200).json({
      success: true,

      user: req.user,
    });
  }
}

export default AuthController;
