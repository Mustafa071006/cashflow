import { Outlet, NavLink, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Settings,
  WalletCards,
  Wallet,
  Tags,
  ArrowLeftRight,
  BarChart3,
  X,
  Menu as MenuIcon,
} from "lucide-react";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Suspense, useEffect, useRef, useState } from "react";

import clsx from "clsx";
import useFocusTrap from "@/hooks/useFocusTrap";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { pageTransition, withReducedMotion } from "@/theme/animation";
import PageLoader from "@/components/common/PageLoader";

function OwnerLayout() {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const location = useLocation();
  const reduced = usePrefersReducedMotion();

  const [open, setOpen] = useState(false);
  const asideRef = useRef(null);

  useFocusTrap(asideRef, open);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const menus = [
    {
      title: language === "id" ? "Ringkasan" : "Overview",

      items: [
        {
          name: "Dashboard",
          path: "/owner",
          icon: LayoutDashboard,
        },
      ],
    },

    {
      title: language === "id" ? "Manajemen" : "Management",

      items: [
        {
          name: language === "id" ? "Pengguna" : "Users",
          path: "/owner/users",
          icon: Users,
        },
      ],
    },

    {
      title: language === "id" ? "Keuangan" : "Finance",

      items: [
        {
          name: language === "id" ? "Dompet" : "Wallet",
          path: "/owner/wallet",
          icon: Wallet,
        },

        {
          name: language === "id" ? "Kategori" : "Category",
          path: "/owner/categories",
          icon: Tags,
        },

        {
          name: language === "id" ? "Transaksi" : "Transaction",
          path: "/owner/transactions",
          icon: ArrowLeftRight,
        },

        {
          name: language === "id" ? "Laporan" : "Reports",
          path: "/owner/reports",
          icon: BarChart3,
        },
      ],
    },

    {
      title: language === "id" ? "Pengaturan" : "Settings",

      items: [
        {
          name: language === "id" ? "Pengaturan" : "Settings",
          path: "/owner/settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <a href="#owner-main-content" className="skip-link rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
        {language === "id" ? "Lewati ke konten" : "Skip to content"}
      </a>

      {/* MOBILE OVERLAY */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        ref={asideRef}
        aria-label={language === "id" ? "Navigasi owner" : "Owner navigation"}
        tabIndex={-1}
        className={clsx(
          `fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-zinc-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 dark:border-zinc-800 dark:bg-zinc-950`,

          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* MOBILE CLOSE */}

        <div className="flex justify-end px-5 pt-5 lg:hidden">
          <button
            onClick={() => setOpen(false)}
            aria-label={language === "id" ? "Tutup menu" : "Close menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* BRAND */}

        <div className="px-6 py-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 dark:bg-zinc-100 dark:text-zinc-900">
              <WalletCards size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">CashFlow</h1>

              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {language === "id" ? "Panel Owner" : "Owner Panel"}
              </p>
            </div>
          </div>
        </div>

        {/* MENU */}

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {menus.map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-4 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                {section.title}
              </p>

              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}

                      to={item.path}

                      onClick={() => setOpen(false)}

                      className={({ isActive }) =>
                        clsx(
                          `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200`,

                          isActive
                            ? `bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 dark:bg-zinc-100 dark:text-zinc-900`
                            : `text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100`
                        )
                      }
                    >
                      <Icon
                        size={20}

                        className="transition-transform duration-200 group-hover:scale-110"
                      />

                      {item.name}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN */}

      <main className="flex-1">
        {/* TOPBAR */}

        <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
          <button
            onClick={() => setOpen(true)}
            aria-label={language === "id" ? "Buka menu" : "Open menu"}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm transition hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-500 lg:hidden dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <MenuIcon size={16} aria-hidden="true" />
            Menu
          </button>

          <button
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? language === "id"
                  ? "Beralih ke mode terang"
                  : "Switch to light mode"
                : language === "id"
                  ? "Beralih ke mode gelap"
                  : "Switch to dark mode"
            }
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
        </div>

        <div id="owner-main-content" className="scroll-area p-6">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} {...withReducedMotion(pageTransition, reduced)}>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default OwnerLayout;
