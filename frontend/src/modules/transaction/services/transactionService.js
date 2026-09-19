import api from "@/config/api";

export const getTransactions = async () => {
  const response = await api.get("/transactions");
  return response.data.data;
};

export const getTransactionById = async (id) => {
  const response = await api.get(`/transactions/${id}`);
  return response.data.data;
};

export const createTransaction = async (data) => {
  const response = await api.post("/transactions", data);
  return response.data.data;
};

export const updateTransaction = async (id, data) => {
  const response = await api.put(
    `/transactions/${id}`,
    data
  );

  return response.data.data;
};

export const deleteTransaction = async (id) => {
  const response = await api.delete(
    `/transactions/${id}`
  );

  return response.data;
};