import { useId } from "react";
import clsx from "clsx";

function Select({ label, error, children, className = "", id, ...props }) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-zinc-900 dark:text-white">
          {label}
        </label>
      )}

      <select
        id={selectId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? errorId : undefined}
        className={clsx(
          "w-full rounded-md border transition-colors duration-200",

          "border-zinc-300 dark:border-zinc-700",

          "bg-white dark:bg-zinc-900",

          "px-4 py-3",

          "text-zinc-900 dark:text-white",

          "focus:border-indigo-500",

          "focus:ring-2 focus:ring-indigo-500/20",

          "outline-none",

          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",

          className
        )}
        {...props}
      >
        {children}
      </select>

      {error && (
        <p id={errorId} role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;
