import { useState, useEffect } from "react";
import * as storage from "../lib/storage.js";

/**
 * Hook de gestion du thème sombre / clair.
 * Persiste la préférence dans le localStorage.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => storage.getTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    storage.setTheme(theme);
  }, [theme]);

  const toggle = () => setThemeState((t) => (t === "light" ? "dark" : "light"));

  return { theme, isDark: theme === "dark", toggle };
}
