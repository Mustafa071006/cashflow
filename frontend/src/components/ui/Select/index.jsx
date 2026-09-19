import clsx from "clsx";

function Select({
  label,
  children,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          {label}
        </label>
      )}

      <select
        className={clsx(
          `
          w-full
          rounded-xl
          border
          border-zinc-200
          bg-white
          px-4
          py-3
          text-sm
          text-zinc-900

          transition-all
          duration-200

          dark:border-zinc-700
          dark:bg-zinc-950
          dark:text-white

          hover:border-zinc-300
          dark:hover:border-zinc-600

          focus:border-indigo-500
          focus:outline-none
          focus:ring-4
          focus:ring-indigo-500/20

          `,
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export default Select;