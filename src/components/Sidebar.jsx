import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Moon,
  Sun,
  Home,
  FolderKanban,
  Mail,
  BookOpen,
  Lightbulb,
  Menu,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./ui/tooltip";
import { handleSmoothScroll } from "../lib/smoothScroll";

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  // "system" resolves to light or dark; the toggle must flip what's on screen.
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const mainNavLinks = [
    {
      name: "Home",
      href: "#home",
      id: "home",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    // {
    //   name: "About",
    //   href: "#about",
    //   id: "about",
    //   path: "/#about",
    //   icon: <User className="h-5 w-5" />,
    // },
    // {
    //   name: "Skills",
    //   href: "#skills",
    //   id: "skills",
    //   path: "/#skills",
    //   icon: <Code className="h-5 w-5" />,
    // },
    {
      name: "Projects",
      href: "#projects",
      id: "projects",
      path: "/projects",
      icon: <FolderKanban className="h-5 w-5" />,
    },
    {
      name: "Publications",
      href: "#publications",
      id: "publications",
      path: "/publications",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      name: "Improve",
      href: "#improve",
      id: "improve",
      path: "/improve",
      icon: <Lightbulb className="h-5 w-5" />,
    },
    {
      name: "Contact",
      href: "#contact",
      id: "contact",
      path: "/contact",
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  // Combined links for display
  const navLinks = [...mainNavLinks];

  const isLinkActive = (link) =>
    link.path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(link.path);

  const handleNavigation = (e, link) => {
    // If it's a separate page (not on homepage), use router navigation
    if (link.path && !link.path.includes("#")) {
      // Let the default Link behavior handle it
      return;
    }

    // If we're on the homepage and it's a section link
    if (isHomePage && link.id) {
      e.preventDefault();
      handleSmoothScroll(e, link.id);
    }
  };

  return (
    <TooltipProvider delayDuration={100}>
      {/* Mobile horizontal navbar */}
      <header className="mobile-header fixed top-0 left-0 right-0 z-50 glass py-3 px-3 md:hidden mx-4 mt-4 border-2 rounded-2xl">
        <div className="container flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-neutral-900 dark:text-white font-extrabold tracking-tight">Amas</span>
          </Link>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.nav
              id="mobile-nav"
              aria-label="Main"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <ul className="pt-3 mt-3 border-t border-neutral-200/80 dark:border-neutral-800 space-y-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      aria-current={isLinkActive(link) ? "page" : undefined}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                        isLinkActive(link)
                          ? "bg-neutral-900/10 dark:bg-white/15 text-neutral-900 dark:text-white"
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-900/5 dark:hover:bg-white/10"
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Desktop vertical navbar */}
      <aside className="fixed left-0 top-0 z-40 hidden md:block pl-6 h-screen pointer-events-none">
        <div className="sidebar-glass flex flex-col items-center py-6 px-2 rounded-3xl shadow-lg pointer-events-auto absolute top-1/2 -translate-y-1/2">
          <nav aria-label="Main">
            <ul className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link);

                return (
                  <li key={link.name} className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-neutral-900/10 dark:bg-white/15 rounded-xl border border-neutral-300/40 dark:border-white/10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={link.path || link.href}
                          aria-current={isActive ? "page" : undefined}
                          className="relative z-10 cursor-pointer flex flex-col items-center justify-center w-16 h-16 text-center text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                          onClick={(e) => handleNavigation(e, link)}
                        >
                          <div className="mb-1">{link.icon}</div>
                          <span className="text-xs">{link.name}</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" sideOffset={5}>
                        {link.name}
                      </TooltipContent>
                    </Tooltip>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="mt-8 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              {isDark ? "Light mode" : "Dark mode"}
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
