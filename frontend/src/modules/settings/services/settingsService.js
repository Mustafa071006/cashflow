import api from "@/config/api";

const settingsService = {
  async updateProfile(payload) {
    const { data } = await api.patch("/users/profile", payload);

    return data.data;
  },

  async changePassword(payload) {
    const { data } = await api.patch("/users/change-password", payload);

    return data;
  },
};

export default settingsService;
