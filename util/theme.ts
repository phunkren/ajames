import { Theme } from "../types/theme";

export function getSystemTheme() {
  const systemPrefersDark = window.matchMedia?.(
    `(prefers-color-scheme: ${Theme.DARK})`
  ).matches;

  return systemPrefersDark ? Theme.DARK : Theme.LIGHT;
}
