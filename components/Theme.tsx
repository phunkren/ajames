import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { blackA, blue, grayDark, yellow } from "@radix-ui/colors";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { styled } from "../stitches.config";
import { Theme } from "../types/theme";

// Create the theme context
export const ThemeContext = createContext({
  theme: Theme.LIGHT,
  onThemeChange: (newTheme: Theme) => {},
});

const ToggleGroupRoot = styled(ToggleGroup.Root, {
  display: "inline-flex",
  borderRadius: 4,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const ToggleGroupItem = styled(ToggleGroup.Item, {
  all: "unset",
  height: 35,
  width: 35,
  display: "flex",
  fontSize: 15,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 1,

  backgroundColor: "transparent",
  opacity: 0.4,

  "&:first-child": {
    marginLeft: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  "&[data-state=on]": {
    opacity: 1,
  },

  "&:last-child": { borderTopRightRadius: 4, borderBottomRightRadius: 4 },

  "&:focus": { position: "relative", boxShadow: `0 0 0 2px black` },
});

const LightToggle = styled(ToggleGroupItem, {
  "&:hover": { backgroundColor: "yellow" },

  "&[data-state=on]": {
    backgroundColor: blue.blue6,
    color: yellow.yellow6,
  },
});

const DarkToggle = styled(ToggleGroupItem, {
  "&:hover": { backgroundColor: "black" },

  "&[data-state=on]": {
    color: grayDark.gray11,
    backgroundColor: "black",
  },
});

const getSystemTheme = () => {
  const systemPrefersDark = window.matchMedia?.(
    `(prefers-color-scheme: ${Theme.DARK})`
  ).matches;

  return systemPrefersDark ? Theme.DARK : Theme.LIGHT;
};

// Create the theme provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [storageTheme, setStorageTheme] = useLocalStorage<Theme>("theme");
  const [theme, setTheme] = useState<Theme>();

  const handleThemeChange = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    setStorageTheme(newTheme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      onThemeChange: handleThemeChange,
    }),
    [theme]
  );

  useEffect(() => {
    // Set initial theme on local storage
    if (!theme && storageTheme) {
      setTheme(storageTheme);
    }

    // Set initial theme on system preference
    if (!theme && !storageTheme) {
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      setStorageTheme(systemTheme);
    }

    // Update the data-theme attribute on the body element
    // This allows us to set the background gradient on the parent element
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, storageTheme]);

  // Return the context provider with the current theme value
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, onThemeChange } = useContext(ThemeContext);

  function handleThemeChange(newTheme: Theme) {
    if (newTheme) {
      onThemeChange(newTheme);
    }
  }

  return (
    <ToggleGroupRoot
      type="single"
      aria-label="Theme toggle"
      orientation="horizontal"
      value={theme}
      onValueChange={handleThemeChange}
    >
      <DarkToggle value={Theme.DARK} aria-label="Dark mode">
        <MoonIcon width={28} height={28} />
      </DarkToggle>

      <LightToggle value={Theme.LIGHT} aria-label="Light mode">
        <SunIcon width={28} height={28} />
      </LightToggle>
    </ToggleGroupRoot>
  );
}
