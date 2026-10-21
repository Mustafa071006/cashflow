import clsx from "clsx";
import { motion } from "framer-motion";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  ...props
}) {
  const reduced = usePrefersReducedMotion();

  const variants = {
    primary: `bg-porcelain text-obsidian hover:bg-white`,

    secondary: `border border-slate bg-transparent text-porcelain hover:bg-white/5`,

    ghost: `text-ash hover:bg-white/5 hover:text-porcelain`,

    destructive: `border border-expense/40 bg-transparent text-expense hover:bg-expense/10`,

    danger: `bg-expense text-white hover:bg-expense/90`,
  };

  const sizes = {
    sm: `h-8 px-3.5 text-utility`,

    md: `h-10 px-5 text-body`,

    lg: `h-12 px-6 text-section-nav`,
  };

  return (
    <motion.button
      whileTap={reduced || disabled || loading ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={clsx(
        `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40`,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 shrink-0 animate-spin-smooth rounded-full border-2 border-current border-t-transparent opacity-70"
        />
      )}
      {children}
    </motion.button>
  );
}

export default Button;
