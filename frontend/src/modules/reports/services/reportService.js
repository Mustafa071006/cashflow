import api from "@/config/api";

const reportService = {
  async getOverview() {
    const { data } = await api.get("/reports/overview");
    return data.data;
  },

  async getMonthlyReport() {
    const { data } = await api.get("/reports/monthly");
    return data.data;
  },

  async getExpenseByCategory() {
    const { data } = await api.get("/reports/category");
    return data.data;
  },
};

export default reportService;