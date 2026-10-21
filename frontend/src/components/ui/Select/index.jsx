import clsx from "clsx";

function Select({ label, children, className = "", ...props }) {
  return (
    <div className="space-y-2">
      {label && <label className="block text-utility font-semibold text-ash">{label}</label>}

      <select
        className={clsx(
          `h-11 w-full rounded-full border border-slate bg-white/4 pr-10 pl-6 text-body text-porcelain transition-colors duration-200 hover:border-ash focus:outline-1 focus:outline-offset-1 focus:outline-apple-blue`,
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
