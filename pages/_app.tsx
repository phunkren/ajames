import { Rubik, Jost, Fira_Code } from "@next/font/google";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback";
import { ThemeProvider } from "../components/Theme";

export const rubik = Rubik({
  weight: ["300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
});

export const jost = Jost({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const firaCode = Fira_Code({
  weight: ["300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

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
          font-weight: 400;
        }
      `}</style>

      <style jsx global>{`
        code {
          font-family: ${firaCode.style.fontFamily};
          font-weight: 500;
        }
      `}</style>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
      </ErrorBoundary>
    </>
  );
}
