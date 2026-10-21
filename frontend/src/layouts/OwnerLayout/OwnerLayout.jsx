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

import { motion } from "framer-motion";

import { useLanguage } from "@/contexts/LanguageContext";
import { Suspense, useEffect, useRef, useState } from "react";

import clsx from "clsx";
import useFocusTrap from "@/hooks/useFocusTrap";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { pageTransition, withReducedMotion } from "@/theme/animation";
import PageLoader from "@/components/common/PageLoader";

function OwnerLayout() {
  const { language } = useLanguage();
  const location = useLocation();
  const reduced = usePrefersReducedMotion();
  const enter = withReducedMotion(pageTransition, reduced);

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
    <div className="flex h-screen bg-obsidian">
      <a href="#owner-main-content" className="skip-link rounded-full bg-porcelain px-4 py-2 text-body font-medium text-obsidian">
        {language === "id" ? "Lewati ke konten" : "Skip to content"}
      </a>

      {/* MOBILE OVERLAY */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        ref={asideRef}
        aria-label={language === "id" ? "Navigasi owner" : "Owner navigation"}
        tabIndex={-1}
        className={clsx(
          `fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-keyline bg-graphite transition-transform duration-300 lg:static lg:translate-x-0`,

          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* MOBILE CLOSE */}

        <div className="flex justify-end px-5 pt-5 lg:hidden">
          <button
            onClick={() => setOpen(false)}
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
              <h1 className="font-display text-product-label font-semibold text-porcelain">CashFlow</h1>

              <p className="text-utility text-ash">
                {language === "id" ? "Panel Owner" : "Owner Panel"}
              </p>
            </div>
          </div>
        </div>

        {/* MENU */}

        <nav className="scroll-area flex-1 space-y-6 overflow-y-auto px-3 py-4">
          {menus.map((section) => (
            <div key={section.title}>
              <p className="mb-1.5 px-4 text-utility font-semibold text-slate">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}

                      to={item.path}

                      onClick={() => setOpen(false)}

                      className={({ isActive }) =>
                        clsx(
                          `group flex items-center gap-3 rounded-full px-4 py-2.5 text-body font-medium transition-colors duration-200`,

                          isActive
                            ? `bg-white/10 text-porcelain`
                            : `text-ash hover:bg-white/5 hover:text-porcelain`
                        )
                      }
                    >
                      <Icon size={18} strokeWidth={1.75} aria-hidden="true" />

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

      <main className="flex flex-1 flex-col overflow-hidden">
        {/* TOPBAR */}

        <div className="flex h-14 shrink-0 items-center justify-between border-b border-keyline bg-obsidian/80 px-4 backdrop-blur-xl sm:px-6 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label={language === "id" ? "Buka menu" : "Open menu"}
            className="flex items-center gap-2 rounded-full border border-slate px-3.5 py-1.5 text-utility text-porcelain transition hover:bg-white/5"
          >
            <MenuIcon size={16} aria-hidden="true" />
            Menu
          </button>

          <span className="font-display text-product-label font-semibold text-porcelain">CashFlow</span>
        </div>

        <div id="owner-main-content" className="scroll-area flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          {/* Enter-only transition: AnimatePresence mode="wait" could stall on fast
              navigation and leave the content area blank until a reload. */}
          <motion.div
            key={location.pathname}
            initial={enter.initial}
            animate={enter.animate}
            transition={enter.transition}
          >
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default OwnerLayout;
