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
        <label htmlFor={inputId} className="block text-utility font-semibold text-ash">
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
            `h-11 w-full rounded-full border border-slate bg-white/4 pr-12 pl-6 text-body text-porcelain transition-colors duration-200 placeholder:text-slate hover:border-ash focus:outline-1 focus:outline-offset-1 focus:outline-apple-blue`,

            error && `border-expense hover:border-expense focus:outline-expense`,

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
            className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center rounded-full p-1.5 text-ash transition hover:bg-white/5 hover:text-porcelain"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="pl-6 text-utility text-expense">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
