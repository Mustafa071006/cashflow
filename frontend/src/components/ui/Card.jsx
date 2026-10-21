import clsx from "clsx";
import { motion } from "framer-motion";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

function Card({ children, className = "", hover = false, padding = "p-6", ...props }) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      whileHover={hover && !reduced ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={clsx(
        `rounded-card bg-carbon transition-colors duration-300`,

        hover && `hover:bg-[#232325]`,

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
