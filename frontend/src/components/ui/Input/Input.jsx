import { useId, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import clsx from "clsx";

function Input({ label, error, className = "", type = "text", id, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;

  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? errorId : undefined}
          className={clsx(
            `w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 pr-12 text-sm text-zinc-900 transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:hover:border-zinc-600 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20`,

            error &&
              `border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500 dark:focus:border-red-400`,

            className
          )}

          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center rounded-lg p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
