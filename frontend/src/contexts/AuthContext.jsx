import { createContext, useContext, useEffect, useState } from "react";
import * as AuthService from "../modules/auth/services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (credentials) => {
  const response = await AuthService.login(credentials);

  localStorage.setItem("token", response.token);
  localStorage.setItem("user", JSON.stringify(response.data));

  setUser(response.data);

  return response;
};

  const logout = async () => {
    await AuthService.logout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}