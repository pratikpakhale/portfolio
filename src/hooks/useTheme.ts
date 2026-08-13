import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/**
 * The `dark` class on `<html>` is the store.
 *
 * The inline script in index.html sets it from localStorage before first
 * paint, so the page never flashes the wrong theme — this hook subscribes to
 * that class rather than keeping a second copy of the state in React, which
 * also means the prerendered markup and the first client render agree.
 */

let listeners: (() => void)[] = [];

function subscribe(onChange: () => void) {
  listeners = [...listeners, onChange];
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/** Prerendered HTML carries no `dark` class; the script applies it on load. */
function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
    listeners.forEach((l) => l());
  }, []);

  return { theme, toggle } as const;
}
