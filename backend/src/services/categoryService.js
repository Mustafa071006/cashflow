import prisma from "../lib/prisma.js";

class CategoryService {
  static async findAllCategoriesByUser(userId) {
    return await prisma.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  static async findCategoryById(id, userId) {
    return await prisma.category.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });
  }

  static async findCategoryByName(userId, name) {
    return await prisma.category.findFirst({
      where: {
        userId,
        name,
      },
    });
  }

  static async createCategory(data) {
    return await prisma.category.create({
      data,
    });
  }

  static async updateCategory(id, userId, data) {
    return await prisma.category.updateMany({
      where: {
        id: Number(id),
        userId,
      },
      data,
    });
  }

  static async deleteCategory(id, userId) {
    return await prisma.category.deleteMany({
      where: {
        id: Number(id),
        userId,
      },
    });
  }
}

export default CategoryService;