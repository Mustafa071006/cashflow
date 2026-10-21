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
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        ref={asideRef}
        aria-label={language === "id" ? "Navigasi utama" : "Main navigation"}
        aria-hidden={!open ? undefined : false}
        tabIndex={-1}
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-keyline bg-graphite transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        {/* MOBILE CLOSE */}

        <div className="flex justify-end px-5 pt-5 lg:hidden">
          <button
            onClick={onClose}
            aria-label={language === "id" ? "Tutup menu" : "Close menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-steel/60 text-ash transition hover:bg-steel hover:text-porcelain"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* BRAND */}

        <div className="px-6 pt-7 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-porcelain text-obsidian">
              <WalletCards size={20} strokeWidth={1.75} />
            </div>

            <div>
              <h1 className="font-display text-product-label font-semibold text-porcelain">
                CashFlow
              </h1>

              <p className="text-utility text-ash">
                {language === "id" ? "Keuangan Pribadi" : "Personal Finance"}
              </p>
            </div>
          </div>
        </div>

        {/* MENU */}

        <nav className="flex-1 space-y-1 px-3 py-4">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}

                to={menu.path}

                onClick={onClose}

                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-full px-4 py-2.5 text-body font-medium transition-colors duration-200 ${
                    isActive
                      ? `bg-white/10 text-porcelain`
                      : `text-ash hover:bg-white/5 hover:text-porcelain`
                  }`
                }
              >
                <Icon size={18} strokeWidth={1.75} aria-hidden="true" />

                <span>{menu.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* FOOTER */}

        <div className="border-t border-keyline px-6 py-4 text-utility text-slate">
          CashFlow v1.0
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
