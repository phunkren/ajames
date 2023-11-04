import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
  memo,
  ReactNode,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({
  theme: undefined,
  onThemeChange: (newTheme: Theme) => {},
});

// Create the theme provider component
export const ThemeProvider = memo(function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [storageTheme, setStorageTheme] = useLocalStorage<Theme>("theme");
  const [theme, setTheme] = useState<Theme>();

  const handleThemeChange = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
      setStorageTheme(newTheme);
    },
    [setStorageTheme]
  );

  const value = useMemo(
    () => ({
      theme,
      onThemeChange: handleThemeChange,
    }),
    [theme, handleThemeChange]
  );

  useEffect(() => {
    // Detect user's system theme preference
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Set initial theme based on user's system preference
    if (!theme && storageTheme) {
      setTheme(storageTheme);
    } else if (!theme && prefersDarkMode) {
      setTheme(Theme.DARK);
    } else if (!theme && !storageTheme && !prefersDarkMode) {
      setTheme(Theme.LIGHT);
    }
  }, [theme, storageTheme, setStorageTheme, handleThemeChange]);

  // Return the context provider with the current theme value
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
});
