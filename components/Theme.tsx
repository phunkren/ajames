import { blackA, whiteA, yellow } from "@radix-ui/colors";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { styled } from "../stitches.config";
import { Theme } from "../types/theme";
import { Button } from "./Button";
import { Box } from "./Layout";

// Create the theme context
export const ThemeContext = createContext({
  theme: Theme.LIGHT,
  onThemeChange: (newTheme: Theme) => {},
});

const ToggleGroupRoot = styled(ToggleGroup.Root, {
  display: "inline-flex",
  backgroundColor: "black",
  borderRadius: 4,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const ToggleGroupItem = styled(ToggleGroup.Item, {
  all: "unset",
  backgroundColor: "white",
  color: "black",
  height: 35,
  width: 35,
  display: "flex",
  fontSize: 15,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 1,

  "&:first-child": {
    marginLeft: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  "&:last-child": { borderTopRightRadius: 4, borderBottomRightRadius: 4 },

  "&:hover": { backgroundColor: "black" },

  "&[data-state=on]": {
    backgroundColor: "black",
    color: "black",
  },

  "&:focus": { position: "relative", boxShadow: `0 0 0 2px black` },
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
      `(prefers-color-scheme: ${Theme.DARK})`
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

  function handleThemeChange(newTheme: Theme) {
    onThemeChange(newTheme);
  }

  return (
    <ToggleGroupRoot
      type="single"
      defaultValue={theme}
      aria-label="Theme toggle"
      orientation="horizontal"
      onValueChange={handleThemeChange}
    >
      <ToggleGroupItem value={Theme.DARK} aria-label="Dark mode">
        <MoonIcon color={whiteA.whiteA10} width={28} height={28} />
      </ToggleGroupItem>
      <ToggleGroupItem value={Theme.LIGHT} aria-label="Light mode">
        <SunIcon color={yellow.yellow8} width={28} height={28} />
      </ToggleGroupItem>
    </ToggleGroupRoot>
  );
}
