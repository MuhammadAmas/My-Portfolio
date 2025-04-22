import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Moon, Sun, Home, User, Code, FolderKanban, Mail } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./ui/tooltip";
import { handleSmoothScroll } from "../lib/smoothScroll";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const navLinks = [
    {
      name: "Home",
      href: "#home",
      id: "home",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "About",
      href: "#about",
      id: "about",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Skills",
      href: "#skills",
      id: "skills",
      icon: <Code className="h-5 w-5" />,
    },
    {
      name: "Projects",
      href: "#projects",
      id: "projects",
      icon: <FolderKanban className="h-5 w-5" />,
    },
    {
      name: "Contact",
      href: "#contact",
      id: "contact",
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  return (
    <TooltipProvider delayDuration={100}>
      {/* Mobile horizontal navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass py-3 px-3 md:hidden mx-4 mt-4 border-2 rounded-2xl">
        <div className="container flex items-center justify-between">
          <a
            href="#home"
            className="text-2xl font-bold"
            onClick={(e) => handleSmoothScroll(e, "home")}
          >
            <span className="text-blue-600">Amas</span>
          </a>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </TooltipContent>
          </Tooltip>
        </div>
      </header>

      {/* Desktop vertical navbar */}
      <aside className="fixed left-0 top-0 z-40 hidden md:block pl-6 h-screen pointer-events-none">
        <div className="sidebar-glass flex flex-col items-center py-6 px-1/2 rounded-3xl shadow-lg pointer-events-auto absolute top-1/2 -translate-y-1/2">
          <nav>
            <ul className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={link.href}
                        className="flex flex-col items-center justify-center w-16 h-16 text-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        onClick={(e) => handleSmoothScroll(e, link.id)}
                      >
                        <div className="mb-1">{link.icon}</div>
                        <span className="text-xs">{link.name}</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                      {link.name}
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="mt-8 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default Header;
