import clsx from "clsx";
import { motion } from "framer-motion";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

function Card({ children, className = "", hover = false, padding = "p-6", ...props }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      whileHover={hover && !reduced ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      className={clsx(
        `rounded-3xl border border-zinc-200 bg-white shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900`,

        hover && `hover:shadow-lg`,

        padding,

        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default Card;
