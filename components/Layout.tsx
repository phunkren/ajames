import { Navigation } from "./Navigation";
import { Social } from "./Social";

export function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Social />
    </>
  );
}
