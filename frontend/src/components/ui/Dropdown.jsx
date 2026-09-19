import { useState, useRef, useEffect, useId } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { withReducedMotion } from "@/theme/animation";

function Dropdown({ value, onChange, options = [], className = "", label }) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const listboxId = useId();
  const reduced = usePrefersReducedMotion();

  const selectedOption = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option.value);

    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full lg:w-auto ${className} `}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
      >
        <span>{selectedOption?.label}</span>

        <ChevronDown
          size={18}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""} `}
        />
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
            role="listbox"
            id={listboxId}
            className="absolute top-full left-0 z-50 mt-2 w-full origin-top overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option)}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  option.value === value
                    ? `bg-indigo-500/10 text-indigo-500`
                    : `text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800`
                } `}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
