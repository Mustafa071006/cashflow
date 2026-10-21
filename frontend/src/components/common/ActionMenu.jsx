import { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { withReducedMotion } from "@/theme/animation";

function ActionMenu({ onEdit, onDelete, editLabel = "Edit", deleteLabel = "Delete" }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More actions"
        className="rounded-full p-2 text-ash transition hover:bg-white/5 hover:text-porcelain"
      >
        <MoreVertical size={18} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            {...withReducedMotion(
              {
                initial: { opacity: 0, y: -4, scale: 0.98 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: -4, scale: 0.98 },
                transition: { duration: 0.15 },
              },
              reduced
            )}
            role="menu"
            className="absolute top-11 right-0 z-50 w-44 origin-top-right overflow-hidden rounded-nav bg-graphite/95 p-1.5 ring-1 ring-keyline backdrop-blur-xl"
          >
            <button
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
              className="flex w-full items-center gap-3 rounded-link px-3 py-2.5 text-left text-body text-porcelain transition hover:bg-white/5"
            >
              <Pencil size={16} className="text-ash" aria-hidden="true" />
              {editLabel}
            </button>

            <button
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
              className="flex w-full items-center gap-3 rounded-link px-3 py-2.5 text-left text-body text-expense transition hover:bg-expense/10"
            >
              <Trash2 size={16} aria-hidden="true" />
              {deleteLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ActionMenu;
