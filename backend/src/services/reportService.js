import prisma from "../lib/prisma.js";

class ReportService {
  // ==========================
  // OVERVIEW
  // ==========================

  static async getOverview(userId) {
    const [income, expense, transactionCount] = await Promise.all([
      prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          type: "INCOME",
          wallet: {
            userId,
          },
        },
      }),

      prisma.transaction.aggregate({
        _sum: {
          amount: true,
        },
        where: {
          type: "EXPENSE",
          wallet: {
            userId,
          },
        },
      }),

      prisma.transaction.count({
        where: {
          wallet: {
            userId,
          },
        },
      }),
    ]);

    const totalIncome = Number(income._sum.amount ?? 0);
    const totalExpense = Number(expense._sum.amount ?? 0);

    return {
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      transactionCount,
    };
  }

  // ==========================
  // EXPENSE BY CATEGORY
  // ==========================

  static async getExpenseByCategory(userId) {
    const categories = await prisma.category.findMany({
      where: {
        userId,
        type: "EXPENSE",
      },
      include: {
        transactions: {
          select: {
            amount: true,
            type: true,
          },
        },
      },
    });

    return categories
      .map((category) => {
        const amount = category.transactions.reduce((total, transaction) => {
          if (transaction.type !== "EXPENSE") return total;

          return total + Number(transaction.amount);
        }, 0);

        return {
          id: category.id,
          name: category.name,
          icon: category.icon,
          amount,
        };
      })
      .filter((category) => category.amount > 0)
      .sort((a, b) => b.amount - a.amount);
  }

    // ==========================
  // MONTHLY REPORT
  // ==========================

  static async getMonthlyReport(userId, year = new Date().getFullYear()) {
    const startDate = new Date(Number(year), 0, 1);
    const endDate = new Date(Number(year) + 1, 0, 1);

    const transactions = await prisma.transaction.findMany({
      where: {
        wallet: {
          userId,
        },
        transactionDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        amount: true,
        type: true,
        transactionDate: true,
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

    const monthly = monthNames.map((name, index) => ({
      month: index + 1,
      label: name,
      income: 0,
      expense: 0,
      cashflow: 0,
    }));

    for (const transaction of transactions) {
      const monthIndex = new Date(
        transaction.transactionDate
      ).getMonth();

      const amount = Number(transaction.amount);

      if (transaction.type === "INCOME") {
        monthly[monthIndex].income += amount;
      } else {
        monthly[monthIndex].expense += amount;
      }

      monthly[monthIndex].cashflow =
        monthly[monthIndex].income -
        monthly[monthIndex].expense;
    }

    return monthly;
  }
}

export default ReportService;