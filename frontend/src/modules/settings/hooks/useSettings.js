import { useState } from "react";

import toast from "react-hot-toast";

import settingsService from "../services/settingsService";

import { useLanguage } from "@/contexts/LanguageContext";

function useSettings() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;

  const [user, setUser] = useState(storedUser);

  const [loading, setLoading] = useState(false);

  const { language } = useLanguage();

  const updateProfile = async (payload) => {
    try {
      setLoading(true);

      const updatedUser = await settingsService.updateProfile(payload);

      setUser(updatedUser);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success(
        language === "id" ? "Profile berhasil diperbarui" : "Profile updated successfully"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          (language === "id" ? "Gagal memperbarui profile" : "Failed to update profile")
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (payload) => {
    try {
      setLoading(true);

      await settingsService.changePassword(payload);

      toast.success(
        language === "id" ? "Password berhasil diperbarui" : "Password updated successfully"
      );
    } catch (error) {
      console.error(error);

      const errorCode = error.response?.data?.code;

      if (errorCode === "INVALID_CURRENT_PASSWORD") {
        toast.error(
          language === "id" ? "Password lama tidak sesuai" : "Current password is incorrect"
        );
      } else {
        toast.error(language === "id" ? "Gagal mengubah password" : "Failed to change password");
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,

    loading,

    updateProfile,

    changePassword,
  };
}

export default useSettings;
