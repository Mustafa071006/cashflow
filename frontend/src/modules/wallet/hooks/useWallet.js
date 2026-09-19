import { useEffect, useState } from "react";
import * as WalletService from "../services/walletService";

export default function useWallet() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWallets = async () => {
    try {
      setLoading(true);

      const data = await WalletService.getWallets();

      setWallets(data);
    } catch (error) {
      console.error("Gagal mengambil wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  const createWallet = async (walletData) => {
  try {
    const newWallet = await WalletService.createWallet(walletData);

    setWallets((prev) => [...prev, newWallet]);

    return {
      success: true,
      data: newWallet,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Gagal membuat wallet",
    };
  }
};

const updateWallet = async (id, data) => {
  await WalletService.updateWallet(id, data);
  await fetchWallets();
};

  useEffect(() => {
    fetchWallets();
  }, []);

  const removeWallet = async (id) => {
  await WalletService.deleteWallet(id);
  await fetchWallets();
};

return {
  wallets,
  loading,
  fetchWallets,
  createWallet,
  updateWallet,
  removeWallet,
};
}