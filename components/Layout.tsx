import { useTheme } from "../hooks/useTheme";
import { Navigation } from "./Navigation";
import { Social } from "./Social";
import { ThemeToggle } from "./Theme";

export function RootLayout({ children }) {
  const theme = useTheme();

  return (
    <div id="root" className={theme}>
      {children}
    </div>
  );
}

export function Layout({ children }) {
  return (
    <>
      <Navigation />
      <ThemeToggle />
      <main>{children}</main>
      <Social />
    </>
  );
}
