import { Outlet, useLocation } from "react-router-dom";

import { Suspense, useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import PageLoader from "@/components/common/PageLoader";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { pageTransition, withReducedMotion } from "@/theme/animation";

function DashboardLayout() {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();
  const enter = withReducedMotion(pageTransition, reduced);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-obsidian">
      <a href="#main-content" className="skip-link rounded-full bg-porcelain px-4 py-2 text-body font-medium text-obsidian">
        Skip to content
      </a>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main
          id="main-content"
          className="scroll-area flex-1 overflow-y-auto bg-obsidian p-4 sm:p-6 lg:p-10"
        >
          {/* Enter-only transition: AnimatePresence mode="wait" could stall on fast
              navigation and leave the content area blank until a reload. */}
          <motion.div
            key={location.pathname}
            initial={enter.initial}
            animate={enter.animate}
            transition={enter.transition}
          >
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
