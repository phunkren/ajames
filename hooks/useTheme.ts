import { useContext } from "react";
import { ThemeContext } from "../components/Theme";
import { darkTheme, lightTheme } from "../stitches.config";

const THEME_MAP = new Map([
  ["light", lightTheme],
  ["dark", darkTheme],
]);

// Create a hook to easily consume the theme context
export function useTheme() {
  const { theme: themeName } = useContext(ThemeContext);

  const theme = THEME_MAP.get(themeName);

  const themeColor = theme?.colors.background.value;

  return { theme, themeName, themeColor };
}
