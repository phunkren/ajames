import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import localFont from "@next/font/local";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback";
import { ThemeProvider } from "../components/Theme";

const euclid = localFont({
  src: [
    {
      path: "../public/fonts/euclid-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/euclid-italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/euclid-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/euclid-semi-bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/euclid-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const monoLisa = localFont({
  src: [
    {
      path: "../public/fonts/mono-lisa-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/mono-lisa-regular-italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/mono-lisa-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/mono-lisa-bold-italic.ttf",
      weight: "700",
      style: "normal",
    },
  ],
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
          font-family: ${euclid.style.fontFamily};
          font-weight: 400;
        }
      `}</style>

      <style jsx global>{`
        body {
          font-family: ${euclid.style.fontFamily};
          font-weight: 400;
        }
      `}</style>

      <style jsx global>{`
        code {
          font-family: ${monoLisa.style.fontFamily};
          font-weight: 500;
        }
      `}</style>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
      </ErrorBoundary>
    </>
  );
}
