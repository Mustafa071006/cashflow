import ReportService from "../services/reportService.js";

class ReportController {
  // ==========================
  // OVERVIEW
  // ==========================

  static async getOverview(req, res) {
    try {
      const userId = req.user.id;

      const overview = await ReportService.getOverview(userId);

      return res.status(200).json({
        success: true,
        data: overview,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // EXPENSE BY CATEGORY
  // ==========================

  static async getExpenseByCategory(req, res) {
    try {
      const userId = req.user.id;

      const categories = await ReportService.getExpenseByCategory(userId);

      return res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // MONTHLY REPORT
  // ==========================

  static async getMonthlyReport(req, res) {
    try {
      const userId = req.user.id;
      const { year } = req.query;

      const report = await ReportService.getMonthlyReport(
        userId,
        year
      );

      return res.status(200).json({
        success: true,
        data: report,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default ReportController;