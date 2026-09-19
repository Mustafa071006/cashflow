import prisma from "../lib/prisma.js";

class UserService {
  static async findAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,

        name: true,

        email: true,

        role: true,

        createdAt: true,
      },

      orderBy: {
        id: "asc",
      },
    });
  }

  static async findUserById(id) {
    return await prisma.user.findUnique({
      where: {
        id: Number(id),
      },

      select: {
        id: true,

        name: true,

        email: true,

        role: true,

        createdAt: true,
      },
    });
  }

  static async createUser(data) {
    return await prisma.user.create({
      data,
    });
  }

  static async updateUser(id, data) {
    return await prisma.user.update({
      where: {
        id: Number(id),
      },

      data,
    });
  }

  static async updateProfile(id, data) {
    return await prisma.user.update({
      where: {
        id: Number(id),
      },

      data,

      select: {
        id: true,

        name: true,

        email: true,

        role: true,
      },
    });
  }

  static async findUserWithPassword(id) {
    return await prisma.user.findUnique({
      where: {
        id: Number(id),
      },

      select: {
        id: true,

        password: true,
      },
    });
  }

  static async changePassword(id, password) {
    return await prisma.user.update({
      where: {
        id: Number(id),
      },

      data: {
        password,
      },
    });
  }

  static async deleteUser(id) {
    return await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}

export default UserService;
