import { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Testimonials from "../components/Testimonials";
import EmploymentStatus from "../components/EmploymentStatus";
import FeaturedPublications from "../components/FeaturedPublications";
import FeaturedProjects from "../components/FeaturedProjects";
import ContactSection from "../components/ContactSection";
import { logPageView } from "../lib/analytics";

const HomePage = () => {
  useEffect(() => {
    logPageView("home", "Muhammad Amas - Portfolio Home");
  }, []);

  return (
    <>
      <Hero />
      <EmploymentStatus />
      <About />
      <Skills />
      <FeaturedProjects />
      <FeaturedPublications />
      <Testimonials />
      <ContactSection />
    </>
  );
};

export default HomePage;
