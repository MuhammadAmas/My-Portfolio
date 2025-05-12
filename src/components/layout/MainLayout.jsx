import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import ScrollToTop from "../ScrollToTop";
import { initSmoothScrolling } from "../../lib/smoothScroll";

const MainLayout = () => {
  useEffect(() => {
    // Initialize smooth scrolling
    initSmoothScrolling();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Sidebar />
      {/* Main content wrapper with padding to account for sidebar */}
      <div className="md:pl-[6.5rem] px-4 md:px-6 lg:px-8">
        <main className="max-w-7xl mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
