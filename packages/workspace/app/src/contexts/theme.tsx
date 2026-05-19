import React, { createContext, useContext, useEffect, useState } from "react";
import { generateTheme, themeToCss } from "@ubento/bento.arlo-core";

interface ThemeContextType {
  currentTheme: string;
  isThemeOpen: boolean;
  setIsThemeOpen: (open: boolean) => void;
  changeTheme: (themeId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState("sky");
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  useEffect(() => {
    // 1. Load legacy/preset theme
    const savedTheme = localStorage.getItem("ubento-theme") || "sky";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    // 2. Load dynamic HSL theme if exists
    const savedThemeRoot = localStorage.getItem("themeRoot");
    if (savedThemeRoot) {
      try {
        const themeRoot = JSON.parse(savedThemeRoot);
        const theme = generateTheme(themeRoot);
        const css = themeToCss(theme);
        
        let styleTag = document.getElementById("theme-variables");
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = "theme-variables";
          document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = css;
      } catch (e) {
        console.error("Failed to load dynamic theme", e);
      }
    }
  }, []);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("ubento-theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);
  };

  return (
    <ThemeContext.Provider
      value={{ currentTheme, isThemeOpen, setIsThemeOpen, changeTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
