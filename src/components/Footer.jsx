import { Github, Linkedin, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { handleSmoothScroll } from "../lib/smoothScroll";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleNavigation = (e, sectionId) => {
    if (isHomePage) {
      e.preventDefault();
      handleSmoothScroll(e, sectionId);
    }
  };

  return (
    <footer className="py-12 border-t border-gray-200 dark:border-gray-800 relative z-10">
      <div className="container md:pl-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold mb-4 block">
              <span className="text-blue-600">Muhammad Amas</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              A passionate Full Stack Developer building modern and responsive
              web applications with clean code and exceptional user experiences.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/muhammadamas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://linkedin.com/in/amaswaseem"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:amaswaseem@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
              {/* medium */}
              {/* <Button variant="ghost" size="icon" asChild>
                <a href="https://muhammadamas.medium.com" aria-label="Medium">
                  <Medium className="h-5 w-5" />
                </a>
              </Button> */}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  onClick={(e) => handleNavigation(e, "about")}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/#skills"
                  onClick={(e) => handleNavigation(e, "skills")}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/publications"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                <a href="mailto:amaswaseem@gmail.com">amaswaseem@gmail.com</a>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <a href="tel:+923233263278">+92 323 3263278</a>
              </p>
            </div>
          </div>
        </div>
        <div className="pt-6 border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          Thanks for visit ✨
        </div>
      </div>
    </footer>
  );
};

export default Footer;
