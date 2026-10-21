import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import useFocusTrap from "@/hooks/useFocusTrap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { modalBackdrop, modalPanel, withReducedMotion } from "@/theme/animation";

function Modal({ open, title, children, onClose }) {
  const panelRef = useRef(null);
  const titleId = useId();
  const reduced = usePrefersReducedMotion();

  useBodyScrollLock(open);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          {...withReducedMotion(modalBackdrop, reduced)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose?.();
          }}
        >
          <motion.div
            {...withReducedMotion(modalPanel, reduced)}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="scroll-area max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-card bg-carbon p-6 ring-1 ring-keyline sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 id={titleId} className="font-display text-feature-stat font-semibold text-porcelain">
                {title}
              </h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-steel/60 text-ash transition hover:bg-steel hover:text-porcelain"
              >
                <X size={16} />
              </button>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
