import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-gray-200 dark:border-gray-800 relative z-10">
      <div className="container md:pl-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <a href="#home" className="text-2xl font-bold mb-4 block">
              <span className="text-blue-600">Muhammad Amas</span>
            </a>
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
                <a
                  href="#home"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                amaswaseem@gmail.com
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                +92 323 3263278
              </p>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          © {currentYear} Muhammad Amas. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
