import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
  memo,
} from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { styled } from "../stitches.config";
import { Theme, ThemeProviderProps } from "../types/theme";
import { ICON_SIZE } from "../util/images";

export const ThemeContext = createContext({
  theme: Theme.LIGHT,
  onThemeChange: (newTheme: Theme) => {},
});

const ToggleGroupRoot = styled(ToggleGroup.Root, {
  display: "inline-flex",
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$backgroundMuted",
  boxShadow: "$1",
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

  "&[data-state=off]": {
    opacity: 0.75,
  },

  "&[data-state=off]:hover": { backgroundColor: "$backgroundMuted" },

  "&:first-child": {
    marginLeft: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  "&:last-child": { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
});

const LightToggle = styled(ToggleGroupItem, {
  "&[data-state=on]": {
    backgroundColor: "$sky11",
    color: "$yellow8",
    opacity: 1,
  },
});

const DarkToggle = styled(ToggleGroupItem, {
  "&[data-state=on]": {
    backgroundColor: "black",
    color: "$gray11",
    opacity: 1,
  },
});

// Create the theme provider component
export const ThemeProvider = memo(function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [storageTheme, setStorageTheme] = useLocalStorage<Theme>("theme");
  const [theme, setTheme] = useState<Theme>();

  const getSystemTheme = useCallback(() => {
    const systemPrefersDark = window.matchMedia?.(
      `(prefers-color-scheme: ${Theme.DARK})`
    ).matches;

    return systemPrefersDark ? Theme.DARK : Theme.LIGHT;
  }, []);

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

    // Set initial theme on system preference
    if (!theme && !storageTheme) {
      const systemTheme = getSystemTheme();
      setTheme(systemTheme);
      setStorageTheme(systemTheme);
    }

    // Update the data-theme attribute on the body element
    // This allows us to set the background gradient on the parent element
    if (theme) {
      document.body.setAttribute("data-theme", theme);
    }
  }, [theme, storageTheme, getSystemTheme]);

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

export const ThemeToggle = memo(function ThemeToggle() {
  const { theme, onThemeChange } = useContext(ThemeContext);

  const handleThemeChange = useCallback(
    (newTheme: Theme) => {
      if (newTheme) {
        onThemeChange(newTheme);
      }
    },
    [onThemeChange]
  );

  return (
    <ToggleGroupRoot
      type="single"
      aria-label="Theme toggle"
      orientation="horizontal"
      value={theme}
      onValueChange={handleThemeChange}
    >
      <DarkToggle value={Theme.DARK} aria-label="Dark mode">
        <MoonIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
      </DarkToggle>

      <LightToggle value={Theme.LIGHT} aria-label="Light mode">
        <SunIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
      </LightToggle>
    </ToggleGroupRoot>
  );
});
