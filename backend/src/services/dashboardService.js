import prisma from "../lib/prisma.js";

class DashboardService {
  // ==========================
  // SUMMARY
  // ==========================

  static async getDashboardSummary(userId) {
    const wallets = await prisma.wallet.findMany({
      where: {
        userId,
      },
    });

    const totalBalance = wallets.reduce(
      (total, wallet) => total + Number(wallet.balance),
      0
    );

    const income = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: "INCOME",
        wallet: {
          userId,
        },
      },
    });

    const expense = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        type: "EXPENSE",
        wallet: {
          userId,
        },
      },
    });

    const totalIncome = Number(income._sum.amount ?? 0);
    const totalExpense = Number(expense._sum.amount ?? 0);

    const walletCount = await prisma.wallet.count({
      where: {
        userId,
      },
    });

    const transactionCount = await prisma.transaction.count({
      where: {
        wallet: {
          userId,
        },
      },
    });

    return {
      totalBalance,
      totalIncome,
      totalExpense,
      cashflow: totalIncome - totalExpense,
      walletCount,
      transactionCount,
    };
  }

  // ==========================
  // RECENT TRANSACTION
  // ==========================

  static async getRecentTransactions(userId) {
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
      take: 5,
    });
  }

  // ==========================
  // WALLET SUMMARY
  // ==========================

  static async getWalletSummary(userId) {
    return await prisma.wallet.findMany({
      where: {
        userId,
      },
      orderBy: {
        balance: "desc",
      },
    });
  }

  // ==========================
  // CASHFLOW CHART
  // ==========================

  static async getCashFlowChart(userId, months = 6) {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - (months - 1));
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const transactions = await prisma.transaction.findMany({
      where: {
        wallet: {
          userId,
        },
        transactionDate: {
          gte: startDate,
        },
      },
      orderBy: {
        transactionDate: "asc",
      },
    });

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Ags",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];

    const chart = [];

    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - i,
        1
      );

      chart.push({
        year: date.getFullYear(),
        month: date.getMonth(),
        label: monthNames[date.getMonth()],
        income: 0,
        expense: 0,
        cashflow: 0,
      });
    }

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      const date = new Date(transaction.transactionDate);

      const item = chart.find(
        (month) =>
          month.month === date.getMonth() &&
          month.year === date.getFullYear()
      );

      if (!item) return;

      const amount = Number(transaction.amount);

      if (transaction.type === "INCOME") {
        item.income += amount;
        totalIncome += amount;
      } else {
        item.expense += amount;
        totalExpense += amount;
      }

      item.cashflow = item.income - item.expense;
    });

    return {
      summary: {
        income: totalIncome,
        expense: totalExpense,
        cashflow: totalIncome - totalExpense,
      },
      chart,
    };
  }
}

export default DashboardService;