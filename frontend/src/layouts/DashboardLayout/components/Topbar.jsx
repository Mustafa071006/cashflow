import { Moon, Sun, Menu } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

function Topbar({ onMenuClick }) {
  const { user } = useAuth();

  const { theme, toggleTheme } = useTheme();

  const userName = user?.name || "User";

  const initial = userName.charAt(0).toUpperCase();

  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-200 bg-white px-4 transition-colors duration-300 sm:px-6 lg:px-8 dark:border-zinc-800 dark:bg-zinc-950">
      {/* MOBILE MENU */}

      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-500 lg:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      {/* MOBILE BRAND */}

      <div className="flex items-center lg:hidden">
        <h1 className="text-lg font-bold text-zinc-900 dark:text-white">CashFlow</h1>
      </div>

      {/* ACTION */}

      <div className="ml-auto flex items-center gap-3">
        {/* THEME */}

        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>

        {/* PROFILE */}

        <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
            {initial}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{userName}</p>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">{user?.role || "USER"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
