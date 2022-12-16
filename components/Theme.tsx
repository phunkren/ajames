import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { Theme } from "../types/theme";

// Create the theme context
export const ThemeContext = createContext({
  theme: Theme.LIGHT,
  onThemeChange: (newTheme: Theme) => {},
});

// Create the theme provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // State to store the current theme
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  const handleThemeChange = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      onThemeChange: handleThemeChange,
    }),
    [theme]
  );

  // Use effect to update the theme based on system preferences
  useEffect(() => {
    const systemPrefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;

    setTheme(systemPrefersDark ? Theme.DARK : Theme.LIGHT);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Return the context provider with the current theme value
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, onThemeChange } = useContext(ThemeContext);

  function handleClick() {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    onThemeChange(newTheme);
  }

  return (
    <button type="button" onClick={handleClick}>
      {theme}
    </button>
  );
}
