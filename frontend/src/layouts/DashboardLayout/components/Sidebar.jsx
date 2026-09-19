import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Wallet, Tags, ArrowLeftRight, BarChart3, Settings, WalletCards, X,} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import useFocusTrap from "@/hooks/useFocusTrap";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";

function Sidebar({ open, onClose }) {
  const { language } = useLanguage();
  const asideRef = useRef(null);

  useFocusTrap(asideRef, open);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const menus = [
    {
      name: language === "id" ? "Dashboard" : "Dashboard",

      path: "/dashboard",

      icon: LayoutDashboard,
    },

    {
      name: language === "id" ? "Dompet" : "Wallet",

      path: "/wallet",

      icon: Wallet,
    },

    {
      name: language === "id" ? "Kategori" : "Category",

      path: "/categories",

      icon: Tags,
    },

    {
      name: language === "id" ? "Transaksi" : "Transaction",

      path: "/transactions",

      icon: ArrowLeftRight,
    },

    {
      name: language === "id" ? "Laporan" : "Reports",

      path: "/reports",

      icon: BarChart3,
    },

    {
      name: language === "id" ? "Pengaturan" : "Settings",

      path: "/settings",

      icon: Settings,
    },
  ];

  return (
    <>
      {/* OVERLAY MOBILE */}

      {open && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        ref={asideRef}
        aria-label={language === "id" ? "Navigasi utama" : "Main navigation"}
        aria-hidden={!open ? undefined : false}
        tabIndex={-1}
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-zinc-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 dark:border-zinc-800 dark:bg-zinc-950 ${
          open ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        {/* MOBILE CLOSE */}

        <div className="flex justify-end px-5 pt-5 lg:hidden">
          <button
            onClick={onClose}
            aria-label={language === "id" ? "Tutup menu" : "Close menu"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
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
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                CashFlow
              </h1>

              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {language === "id" ? "Keuangan Pribadi" : "Personal Finance"}
              </p>
            </div>
          </div>
        </div>

        {/* MENU */}

        <nav className="flex-1 space-y-2 px-4 py-4">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}

                to={menu.path}

                onClick={onClose}

                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? `bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 dark:bg-zinc-100 dark:text-zinc-900`
                      : `text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100`
                  } `
                }
              >
                <Icon
                  size={20}

                  className="transition-transform duration-200 group-hover:scale-110"
                />

                <span>{menu.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* FOOTER */}

        <div className="border-t border-zinc-200 px-6 py-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          CashFlow v1.0
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
