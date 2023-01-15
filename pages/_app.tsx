import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback";
import { RootLayout } from "../components/Layout";
import { ThemeProvider } from "../components/Theme";
import { globalStyles } from "../styles/global";
import { Alexandria, Jost, Fira_Code } from "@next/font/google";

const alexandria = Alexandria({
  weight: ["300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-alex",
});

const jost = Jost({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-jost",
});

const firaCode = Fira_Code({
  weight: ["300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-fira",
});

export default function MyApp({ Component, pageProps }) {
  globalStyles();

  return (
    <>
      <style jsx global>{`
        h1,
        h2,
        h3 {
          font-family: ${alexandria.style.fontFamily};
        }
      `}</style>

      <style jsx global>{`
        body {
          font-family: ${jost.style.fontFamily};
        }
      `}</style>

      <style jsx global>{`
        code {
          font-family: ${firaCode.style.fontFamily};
        }
      `}</style>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}
