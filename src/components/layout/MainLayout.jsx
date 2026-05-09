import { useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
import FloatingParticles from "../FloatingParticles";
import CursorEffect from "../CursorEffect";
import { initSmoothScrolling } from "../../lib/smoothScroll";

const MainLayout = () => {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    initSmoothScrolling();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[100] pointer-events-none"
      />

      {/* Mesh gradient background */}
      <div
        aria-hidden="true"
        className="mesh-bg fixed inset-0 -z-10 pointer-events-none"
      />

      {/* Background effects */}
      <FloatingParticles density={12} speed={0.5} />

      {/* Interactive cursor */}
      <CursorEffect />

      <ScrollToTop />
      <Sidebar />

      {/* Main content wrapper with padding to account for sidebar */}
      <div className="px-4 md:pl-[6.5rem] md:pr-6 lg:pr-8 relative z-0 pt-20 md:pt-0">
        <main className="max-w-7xl mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
