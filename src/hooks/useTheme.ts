import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  // Theme switching disabled — locked to dark mode
  return "dark";
  // if (typeof window === "undefined") return "light";
  // const stored = localStorage.getItem("theme") as Theme | null;
  // if (stored) return stored;
  // return window.matchMedia("(prefers-color-scheme: dark)").matches
  //   ? "dark"
  //   : "light";
}

export function useTheme() {
  const [theme, _setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Theme toggle disabled — locked to dark mode
  const toggle = useCallback(() => {
    // setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggle } as const;
}
