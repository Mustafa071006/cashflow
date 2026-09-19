import api from "@/config/api";

export async function login(credentials) {
  const response = await api.post("/auth/login", credentials);

  return response.data;
}

export async function register(payload) {
  const response = await api.post("/auth/register", payload);

  return response.data;
}

export async function checkEmail(email) {
  const response = await api.post("/auth/check-email", {
    email,
  });

  return response.data;
}

export async function resetPassword(payload) {
  const response = await api.patch("/auth/reset-password", payload);

  return response.data;
}

export async function logout() {
  return true;
}
