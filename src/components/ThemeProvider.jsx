import { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext({
  theme: "system",
  setTheme: () => null,
  themes: ["light", "dark", "system"],
});

export function ThemeProvider({
  children,
  defaultTheme = "system",
  enableSystem = true,
  themes = ["light", "dark", "system"],
  ...props
}) {
  const [theme, setTheme] = useState(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage after component mounts
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || defaultTheme;
    setTheme(storedTheme);
    setMounted(true);
  }, [defaultTheme]);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    
    // Clear existing theme classes
    root.classList.remove("light", "dark");

    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme, enableSystem, mounted]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
    },
    themes: enableSystem ? themes : themes.filter((t) => t !== "system"),
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
