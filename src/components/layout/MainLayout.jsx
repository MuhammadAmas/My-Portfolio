import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
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
      <Header />
      <div className="md:pl-24 px-6 md:px-6 lg:px-8">
        <main className="max-w-7xl mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
};

export default MainLayout;
