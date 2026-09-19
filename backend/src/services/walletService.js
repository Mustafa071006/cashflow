import prisma from "../lib/prisma.js";

class WalletService {
  static async findAllWalletsByUser(userId) {
    return await prisma.wallet.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  static async findWalletById(id, userId) {
    return await prisma.wallet.findFirst({
      where: {
        id: Number(id),
        userId,
      },
    });
  }

  static async createWallet(data) {
  return await prisma.wallet.create({
    data,
  });
}

static async findWalletByName(userId, name) {
  return await prisma.wallet.findFirst({
    where: {
      userId,
      name,
    },
  });
}

static async updateWallet(id, userId, data) {
  return await prisma.wallet.updateMany({
    where: {
      id: Number(id),
      userId,
    },
    data,
  });
}

static async deleteWallet(id, userId) {
  return await prisma.wallet.deleteMany({
    where: {
      id: Number(id),
      userId,
    },
  });
}

static async updateBalance(walletId, amount) {
  return await prisma.wallet.update({
    where: {
      id: Number(walletId),
    },
    data: {
      balance: amount,
    },
  });
}
}

export default WalletService;