import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

function OwnerRoute() {
  const { user } = useAuth();

  if (user?.role !== "OWNER") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default OwnerRoute;
