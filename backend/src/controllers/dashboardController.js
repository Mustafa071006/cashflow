import DashboardService from "../services/dashboardService.js";

class DashboardController {
  // ==========================
  // SUMMARY
  // ==========================

  static async getSummary(req, res) {
    try {
      const userId = req.user.id;

      const summary =
        await DashboardService.getDashboardSummary(
          userId
        );

      return res.status(200).json({
        success: true,
        data: summary,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // RECENT TRANSACTIONS
  // ==========================

  static async getRecentTransactions(
    req,
    res
  ) {
    try {
      const userId = req.user.id;

      const transactions =
        await DashboardService.getRecentTransactions(
          userId
        );

      return res.status(200).json({
        success: true,
        data: transactions,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // WALLET SUMMARY
  // ==========================

  static async getWalletSummary(
    req,
    res
  ) {
    try {
      const userId = req.user.id;

      const wallets =
        await DashboardService.getWalletSummary(
          userId
        );

      return res.status(200).json({
        success: true,
        data: wallets,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // CASHFLOW CHART
  // ==========================

  static async getCashFlowChart(
    req,
    res
  ) {
    try {
      const userId = req.user.id;

      const months = Number(
        req.query.months || 6
      );

      const chart =
        await DashboardService.getCashFlowChart(
          userId,
          months
        );

      return res.status(200).json({
        success: true,
        data: chart,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default DashboardController;