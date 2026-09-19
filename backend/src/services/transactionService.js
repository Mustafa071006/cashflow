import prisma from "../lib/prisma.js";

class TransactionService {
  static async findAllTransactionsByUser(userId) {
    return await prisma.transaction.findMany({
      where: {
        wallet: {
          userId,
        },
      },
      include: {
        wallet: true,
        category: true,
      },
      orderBy: {
        transactionDate: "desc",
      },
    });
  }

  static async findTransactionById(id, userId) {
    return await prisma.transaction.findFirst({
      where: {
        id: Number(id),
        wallet: {
          userId,
        },
      },
      include: {
        wallet: true,
        category: true,
      },
    });
  }

  static async createTransaction(data) {
    return await prisma.transaction.create({
      data,
    });
  }

  static async updateTransaction(id, userId, data) {
    return await prisma.transaction.updateMany({
      where: {
        id: Number(id),
        wallet: {
          userId,
        },
      },
      data,
    });
  }

  static async deleteTransaction(id, userId) {
    return await prisma.transaction.deleteMany({
      where: {
        id: Number(id),
        wallet: {
          userId,
        },
      },
    });
  }
  static async findWalletById(walletId, userId) {
  return await prisma.wallet.findFirst({
    where: {
      id: Number(walletId),
      userId,
    },
  });
}

static async findCategoryById(categoryId, userId) {
  return await prisma.category.findFirst({
    where: {
      id: Number(categoryId),
      userId,
    },
  });
}
}

export default TransactionService;