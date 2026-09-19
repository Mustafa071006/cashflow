import api from "@/config/api";

export const getWallets = async () => {
  const response = await api.get("/wallets");
  return response.data.data;
};

export const getWalletById = async (id) => {
  const response = await api.get(`/wallets/${id}`);
  return response.data.data;
};

export const createWallet = async (data) => {
  const response = await api.post("/wallets", data);
  return response.data.data;
};

export const updateWallet = async (id, data) => {
  const response = await api.put(`/wallets/${id}`, data);
  return response.data.data;
};

export const deleteWallet = async (id) => {
  const response = await api.delete(`/wallets/${id}`);
  return response.data;
};