import prisma from "../lib/prisma.js";

class OwnerService {
  // =========================
  // OWNER DASHBOARD STATS
  // =========================

  static async getDashboardStats(userId) {
    const ownerId = Number(userId);

    const [totalUsers, totalWallet, totalTransactions, income, expense] =
      await Promise.all([
        // Total seluruh user sistem
        prisma.user.count(),

        // Wallet milik owner sendiri
        prisma.wallet.count({
          where: {
            userId: ownerId,
          },
        }),

        // Transaksi owner melalui wallet
        prisma.transaction.count({
          where: {
            wallet: {
              userId: ownerId,
            },
          },
        }),

        // Income owner sendiri
        prisma.transaction.aggregate({
          _sum: {
            amount: true,
          },

          where: {
            wallet: {
              userId: ownerId,
            },

            type: "INCOME",
          },
        }),

        // Expense owner sendiri
        prisma.transaction.aggregate({
          _sum: {
            amount: true,
          },

          where: {
            wallet: {
              userId: ownerId,
            },

            type: "EXPENSE",
          },
        }),
      ]);

    return {
      totalUsers,

      totalWallet,

      totalTransactions,

      income: income._sum.amount || 0,

      expense: expense._sum.amount || 0,
    };
  }

  // =========================
  // USER MANAGEMENT
  // =========================

  static async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,

        name: true,

        email: true,

        role: true,

        createdAt: true,

        updatedAt: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async getUserById(id) {
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

        updatedAt: true,

        wallets: {
          select: {
            id: true,

            name: true,

            balance: true,
          },
        },
      },
    });
  }

  static async updateUser(id, data) {
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

  static async deleteUser(id) {
    return await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}

export default OwnerService;
