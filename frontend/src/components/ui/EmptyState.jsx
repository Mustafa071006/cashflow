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
    <Card className={`flex h-80 flex-col items-center justify-center ${className}`}>
      <motion.div {...withReducedMotion(fadeInUp, reduced)} className="flex flex-col items-center">
        {Icon && (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-obsidian text-ash">
            <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
          </div>
        )}

        <h3 className="mt-5 font-display text-product-label font-semibold text-porcelain">{title}</h3>

        <p className="mt-2 max-w-md text-center text-body text-ash">{description}</p>
      </motion.div>
    </Card>
  );
}

export default EmptyState;
