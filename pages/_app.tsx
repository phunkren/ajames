import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback";
import { RootLayout } from "../components/Layout";
import { ThemeProvider } from "../components/Theme";
import { globalStyles } from "../styles/global";
import { Rubik, Jost, Fira_Code } from "@next/font/google";

const rubik = Rubik({
  weight: ["300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
});

const jost = Jost({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  weight: ["300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: any) {
  globalStyles();

  return (
    <>
      <style jsx global>{`
        h1,
        h2,
        h3 {
          font-family: ${rubik.style.fontFamily};
          font-weight: 400;
        }
      `}</style>

      <style jsx global>{`
        body {
          font-family: ${jost.style.fontFamily};
          font-weight: 300;
        }
      `}</style>

      <style jsx global>{`
        code {
          font-family: ${firaCode.style.fontFamily};
          font-weight: 500;
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
