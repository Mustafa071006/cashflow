/* eslint-disable react-refresh/only-export-components -- this file only
   exports a router config object; the lazy() bindings below aren't
   themselves exported as components, so Fast Refresh doesn't apply here. */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import OwnerRoute from "./OwnerRoute";

import DashboardLayout from "@/layouts/DashboardLayout";
import OwnerLayout from "@/layouts/OwnerLayout";

// AUTH — kept eager: these are the first thing an unauthenticated visitor
// sees, so there's nothing to gain from lazy-loading them.
import LoginPage from "@/modules/auth/pages/LoginPage";
import ForgotPasswordPage from "@/modules/auth/pages/ForgotPasswordPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";

// USER — each route gets its own chunk, so the initial bundle only pays for
// the dashboard, not every module in the app.
const DashboardPage = lazy(() => import("@/modules/dashboard/pages/DashboardPage"));
const WalletPage = lazy(() => import("@/modules/wallet/pages/WalletPage"));
const TransactionPage = lazy(() => import("@/modules/transaction/pages/TransactionPage"));
const ReportsPage = lazy(() => import("@/modules/reports/pages/ReportsPage"));
const CategoryPage = lazy(() => import("@/modules/category/pages/CategoryPage"));
const SettingsPage = lazy(() => import("@/modules/settings/pages/SettingsPage"));

// OWNER
const OwnerPage = lazy(() => import("@/modules/owner/pages/OwnerPage"));
const UsersPage = lazy(() => import("@/modules/owner/pages/UsersPage"));

const router = createBrowserRouter([
  // =========================
  // AUTH
  // =========================

  {
    path: "/",

    element: <LoginPage />,
  },

  {
    path: "/login",

    element: <LoginPage />,
  },

  {
    path: "/register",

    element: <RegisterPage />,
  },

  {
    path: "/forgot-password",

    element: <ForgotPasswordPage />,
  },

  // =========================
  // USER AREA
  // =========================

  {
    element: <ProtectedRoute />,

    children: [
      {
        element: <DashboardLayout />,

        children: [
          {
            path: "/dashboard",

            element: <DashboardPage />,
          },

          {
            path: "/wallet",

            element: <WalletPage />,
          },

          {
            path: "/transactions",

            element: <TransactionPage />,
          },

          {
            path: "/reports",

            element: <ReportsPage />,
          },

          {
            path: "/categories",

            element: <CategoryPage />,
          },

          {
            path: "/settings",

            element: <SettingsPage />,
          },
        ],
      },
    ],
  },

  // =========================
  // OWNER AREA
  // =========================

  {
    element: <ProtectedRoute />,

    children: [
      {
        element: <OwnerRoute />,

        children: [
          {
            element: <OwnerLayout />,

            children: [
              {
                path: "/owner",

                element: <OwnerPage />,
              },

              {
                path: "/owner/users",

                element: <UsersPage />,
              },

              {
                path: "/owner/wallet",

                element: <WalletPage />,
              },

              {
                path: "/owner/categories",

                element: <CategoryPage />,
              },

              {
                path: "/owner/transactions",

                element: <TransactionPage />,
              },

              {
                path: "/owner/reports",

                element: <ReportsPage />,
              },

              {
                path: "/owner/settings",

                element: <SettingsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
