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
        className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-zinc-800 dark:hover:text-white"
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
            className="absolute top-12 right-0 z-50 w-44 origin-top-right overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
          >
            <button
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"
            >
              <Pencil size={16} className="text-blue-500" aria-hidden="true" />
              {editLabel}
            </button>

            <button
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-zinc-800"
            >
              <Trash2 size={16} className="text-red-500" aria-hidden="true" />
              {deleteLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ActionMenu;
