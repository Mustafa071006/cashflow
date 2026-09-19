import { useCallback, useEffect, useState } from "react";
import reportService from "../services/reportService";

function useReport() {
  const [overview, setOverview] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [overviewData, monthlyData, categoryData] =
            await Promise.all([
            reportService.getOverview(),
            reportService.getMonthlyReport(),
            reportService.getExpenseByCategory(),
        ]);

      setOverview(overviewData);
      setMonthly(monthlyData);
      setCategories(categoryData);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    overview,
    monthly,
    categories,
    loading,
    error,
    refresh: fetchReports,
  };
}

export default useReport;