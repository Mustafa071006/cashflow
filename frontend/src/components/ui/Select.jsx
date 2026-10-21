import { useId } from "react";
import clsx from "clsx";

function Select({ label, error, children, className = "", id, ...props }) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={selectId} className="block text-utility font-semibold text-ash">
          {label}
        </label>
      )}

      <select
        id={selectId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? errorId : undefined}
        className={clsx(
          "h-11 w-full rounded-full border border-slate bg-white/4 pr-10 pl-6 text-body text-porcelain transition-colors duration-200 hover:border-ash focus:outline-1 focus:outline-offset-1 focus:outline-apple-blue",

          error && "border-expense focus:outline-expense",

          className
        )}
        {...props}
      >
        {children}
      </select>

      {error && (
        <p id={errorId} role="alert" className="pl-6 text-utility text-expense">
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;
