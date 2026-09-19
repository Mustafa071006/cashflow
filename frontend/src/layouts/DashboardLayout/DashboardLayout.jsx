import { Outlet, useLocation } from "react-router-dom";

import { Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import PageLoader from "@/components/common/PageLoader";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { pageTransition, withReducedMotion } from "@/theme/animation";

function DashboardLayout() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-zinc-50 transition-colors duration-300 dark:bg-zinc-950">
      <a href="#main-content" className="skip-link rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
        Skip to content
      </a>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main
          id="main-content"
          className="scroll-area flex-1 overflow-y-auto bg-zinc-50 p-4 transition-colors duration-300 sm:p-6 lg:p-8 dark:bg-zinc-950"
        >
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} {...withReducedMotion(pageTransition, reduced)}>
              <Suspense fallback={<PageLoader />}>
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
