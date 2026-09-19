import { motion } from "framer-motion";

import Card from "./Card";
import { fadeInUp, withReducedMotion } from "@/theme/animation";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

function EmptyState({
  icon: Icon,
  title = "No Data",
  description = "There is nothing to display.",
  className = "",
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <Card
      className={`
        flex
        h-80
        flex-col
        items-center
        justify-center
        border-dashed
        ${className}
      `}
    >
      <motion.div
        {...withReducedMotion(fadeInUp, reduced)}
        className="flex flex-col items-center"
      >
      {Icon && (
        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            bg-zinc-100
            text-zinc-700
            dark:bg-zinc-800
            dark:text-white
          "
        >
          <Icon size={36} aria-hidden="true" />
        </div>
      )}


      <h3
        className="
          mt-5
          text-xl
          font-semibold
          text-zinc-900
          dark:text-white
        "
      >
        {title}
      </h3>


      <p
        className="
          mt-2
          max-w-md
          text-center
          text-sm
          leading-6
          text-zinc-500
          dark:text-zinc-400
        "
      >
        {description}
      </p>
      </motion.div>
    </Card>
  );
}

export default EmptyState;