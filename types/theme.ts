import { ReactNode } from "react";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export type ThemeProviderProps = {
  children: ReactNode;
};
