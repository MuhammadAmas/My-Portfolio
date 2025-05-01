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
    <>
      <ScrollToTop />
      <Sidebar />
      <div className="md:pl-24 px-4 md:px-6 lg:px-8 pt-20 md:pt-0">
        <main className="max-w-7xl mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
