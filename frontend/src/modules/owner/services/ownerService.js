import api from "@/config/api";

// =========================
// OWNER DASHBOARD
// =========================

export async function getDashboardStats() {
  const response = await api.get("/owner/dashboard");

  return response.data;
}

// =========================
// USER MANAGEMENT
// =========================

export async function getUsers() {
  const response = await api.get("/owner/users");

  return response.data;
}

export async function getUserById(id) {
  const response = await api.get(`/owner/users/${id}`);

  return response.data;
}

export async function updateUser(id, data) {
  const response = await api.put(`/owner/users/${id}`, data);

  return response.data;
}

export async function deleteUser(id) {
  const response = await api.delete(`/owner/users/${id}`);

  return response.data;
}
