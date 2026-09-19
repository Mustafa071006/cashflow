import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  getDashboardStats,
  getUsers,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "../services/ownerService";
import { useLanguage } from "@/contexts/LanguageContext";

function useOwner() {
  const { language } = useLanguage();

  const [stats, setStats] = useState(null);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  // =========================
  // DASHBOARD STATS
  // =========================

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();

      // response:
      // {
      //   success: true,
      //   data: {
      //     totalUsers,
      //     totalWallet,
      //     totalTransactions,
      //     income,
      //     expense
      //   }
      // }

      setStats(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (language === "id" ? "Gagal mengambil statistik dashboard" : "Failed to load dashboard stats"),
      );
    }
  };

  // =========================
  // GET USERS
  // =========================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      setUsers(response.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (language === "id" ? "Gagal mengambil data user" : "Failed to load users"),
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE USER
  // =========================

  const updateUser = async (id, data) => {
    try {
      const response = await updateUserService(id, data);

      toast.success(language === "id" ? "User berhasil diperbarui" : "User updated successfully");

      await fetchUsers();

      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (language === "id" ? "Gagal memperbarui user" : "Failed to update user"),
      );
    }
  };

  // =========================
  // DELETE USER
  // =========================

  const deleteUser = async (id) => {
    try {
      await deleteUserService(id);

      toast.success(language === "id" ? "User berhasil dihapus" : "User deleted successfully");

      await fetchUsers();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (language === "id" ? "Gagal menghapus user" : "Failed to delete user"),
      );
    }
  };

  useEffect(() => {
    fetchStats();

    fetchUsers();
  }, []);

  return {
    stats,

    users,

    loading,

    fetchStats,

    fetchUsers,

    updateUser,

    deleteUser,
  };
}

export default useOwner;
