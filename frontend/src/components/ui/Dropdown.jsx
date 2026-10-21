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
        className="flex h-10 w-full items-center justify-between gap-3 rounded-full border border-slate bg-white/4 pr-4 pl-5 text-body text-porcelain transition hover:border-ash"
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
            className="absolute top-full left-0 z-50 mt-2 w-full min-w-44 origin-top overflow-hidden rounded-nav bg-graphite/95 p-1.5 ring-1 ring-keyline backdrop-blur-xl"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option)}
                className={`w-full rounded-link px-3 py-2 text-left text-body transition ${
                  option.value === value
                    ? `bg-white/8 text-porcelain`
                    : `text-ash hover:bg-white/5 hover:text-porcelain`
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
