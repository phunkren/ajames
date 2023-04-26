import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import localFont from "next/font/local";
import { ErrorBoundary } from "react-error-boundary";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { ErrorFallback } from "../components/ErrorFallback";
import { ThemeProvider } from "../components/Theme";
import Head from "next/head";

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
      <Head>
        <meta key="robots" name="robots" content="index,follow" />
        <meta key="generator" name="generator" content="Next.js" />
        <meta key="charset" charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style jsx global>{`
          body {
            font-family: ${euclid.style.fontFamily};
          }
        `}</style>
      </Head>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThemeProvider>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
      </ErrorBoundary>
    </>
  );
}
