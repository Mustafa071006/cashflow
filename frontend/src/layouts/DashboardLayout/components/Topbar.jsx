import { Menu } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

function Topbar({ onMenuClick }) {
  const { user } = useAuth();

  const userName = user?.name || "User";

  const initial = userName.charAt(0).toUpperCase();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-keyline bg-obsidian/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* MOBILE MENU */}

      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-full text-ash transition hover:bg-white/5 hover:text-porcelain lg:hidden"
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      {/* MOBILE BRAND */}

      <div className="flex items-center lg:hidden">
        <h1 className="font-display text-product-label font-semibold text-porcelain">CashFlow</h1>
      </div>

      {/* PROFILE */}

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-utility font-semibold text-porcelain">{userName}</p>

          <p className="text-utility text-ash">{user?.role || "USER"}</p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-porcelain text-utility font-semibold text-obsidian">
          {initial}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
