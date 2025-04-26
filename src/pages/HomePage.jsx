import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Testimonials from "../components/Testimonials";
import EmploymentStatus from "../components/EmploymentStatus";

const HomePage = () => {
  return (
    <>
      <Hero />
      <EmploymentStatus />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
    </>
  );
};

export default HomePage;
