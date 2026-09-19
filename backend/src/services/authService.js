import prisma from "../lib/prisma.js";

class AuthService {
  static async findUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async createUser(data) {
    return await prisma.user.create({
      data,
    });
  }

  static async updatePassword(email, password) {
    return await prisma.user.update({
      where: {
        email,
      },

      data: {
        password,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }
}

export default AuthService;
