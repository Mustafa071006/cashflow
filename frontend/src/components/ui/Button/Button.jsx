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
    primary: `
      bg-zinc-900
      text-white
      shadow-sm

      hover:bg-zinc-800
      hover:shadow-lg
      hover:shadow-zinc-900/20


      dark:bg-zinc-100
      dark:text-zinc-900
      dark:hover:bg-white
      dark:hover:shadow-black/20
      `,

    secondary: `
      border
      border-zinc-200

      bg-white

      text-zinc-900

      hover:bg-zinc-50


      dark:border-zinc-700

      dark:bg-zinc-900

      dark:text-zinc-100

      dark:hover:bg-zinc-800
      `,

    ghost: `
      text-zinc-600

      hover:bg-zinc-100
      hover:text-zinc-900


      dark:text-zinc-400

      dark:hover:bg-zinc-800

      dark:hover:text-zinc-100
      `,

    destructive: `
      border
      border-red-200

      bg-white

      text-red-600

      hover:bg-red-50


      dark:border-red-500/30

      dark:bg-zinc-900

      dark:text-red-400

      dark:hover:bg-red-500/10
      `,
  };

  const sizes = {
    sm: `
      h-9
      px-3
      text-sm
      `,

    md: `
      h-11
      px-5
      text-sm
      `,

    lg: `
      h-12
      px-6
      text-base
      `,
  };

  return (
    <motion.button
      whileTap={reduced || disabled || loading ? undefined : { scale: 0.97 }}
      whileHover={reduced || disabled || loading ? undefined : { scale: 1.01 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={clsx(
        `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 focus:ring-4 focus:ring-zinc-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-zinc-700`,
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
