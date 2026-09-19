import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";

function AuthLayout({ children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-100 via-white to-zinc-200 px-6 transition-colors duration-300 dark:from-zinc-950 dark:via-zinc-900 dark:to-black">
      <button
        type="button"
        onClick={toggleTheme}

        className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

export default AuthLayout;
