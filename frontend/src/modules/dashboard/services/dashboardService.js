import api from "@/config/api";

export const getSummary = async () => {
  const response = await api.get("/dashboard/summary");

  return response.data.data;
};

export const getRecentTransactions = async () => {
  const response = await api.get(
    "/dashboard/recent-transactions"
  );

  return response.data.data;
};

export const getWalletSummary = async () => {
  const response = await api.get(
    "/dashboard/wallet-summary"
  );

  return response.data.data;
};

export const getCashFlowChart = async (
  months = 6
) => {
  const response = await api.get(
    `/dashboard/chart?months=${months}`
  );

  return {
    summary: response.data.data.summary,
    chart: response.data.data.chart,
  };
};