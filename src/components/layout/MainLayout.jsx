import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
import FloatingParticles from "../FloatingParticles";
import CursorEffect from "../CursorEffect";
import { initSmoothScrolling } from "../../lib/smoothScroll";

const MainLayout = () => {
  useEffect(() => {
    // Initialize smooth scrolling
    initSmoothScrolling();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <FloatingParticles density={30} speed={0.8} />
      
      {/* Interactive cursor */}
      <CursorEffect />
      
      <ScrollToTop />
      <Sidebar  />
      
      {/* Main content wrapper with padding to account for sidebar */}
      <div className="md:pl-[6.5rem] px-4 md:px-6 lg:px-8 relative z-10">
        <main className="max-w-7xl mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
