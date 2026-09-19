import { useEffect, useState } from "react";

import {
  getSummary,
  getWalletSummary,
  getRecentTransactions,
  getCashFlowChart,
} from "../services/dashboardService";

export default function useDashboard() {
  const [summary, setSummary] = useState(null);

  const [wallets, setWallets] = useState([]);

  const [transactions, setTransactions] =
    useState([]);

  const [chart, setChart] = useState([]);

  const [chartSummary, setChartSummary] =
    useState({
      income: 0,
      expense: 0,
      cashflow: 0,
    });

  const [months, setMonths] = useState(6);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [
        summaryData,
        walletData,
        transactionData,
        chartResponse,
      ] = await Promise.all([
        getSummary(),
        getWalletSummary(),
        getRecentTransactions(),
        getCashFlowChart(months),
      ]);

      setSummary(summaryData);

      setWallets(walletData);

      setTransactions(transactionData);

      setChart(chartResponse.chart);

      setChartSummary(chartResponse.summary);
    } catch (error) {
      console.error(
        "Failed to fetch dashboard:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [months]);

  return {
    loading,

    summary,

    wallets,

    transactions,

    chart,

    chartSummary,

    months,

    setMonths,

    refresh: fetchDashboard,
  };
}