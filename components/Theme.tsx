import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
  memo,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Theme, ThemeProviderProps } from "../types/theme";

export const ThemeContext = createContext({
  theme: Theme.LIGHT,
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
    // Set initial theme on local storage
    if (!theme && storageTheme) {
      setTheme(storageTheme);
    }

    // Set theme to dark otherwise
    // https://twitter.com/phunkren/status/1621046678399881217
    if (!storageTheme) {
      handleThemeChange(Theme.DARK);
    }

    // Update the data-theme attribute on the body element
    // This allows us to set the background gradient on the parent element
    if (theme) {
      document.body.setAttribute("data-theme", theme);
    }
  }, [theme, storageTheme, setStorageTheme, handleThemeChange]);

  // [HACK]: Prevent light theme flash on page load if system prefers dark
  // [TODO] - There's gotta be a better way!?
  if (!theme) {
    return null;
  }

  // Return the context provider with the current theme value
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
});
