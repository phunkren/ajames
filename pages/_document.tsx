import { Html, Head, Main, NextScript } from "next/document";
import { RootSEO } from "../components/SEO";
import { useTheme } from "../hooks/useTheme";

export default function Document() {
  const { theme } = useTheme();

  return (
    <Html lang="en">
      <Head>
        <RootSEO />
      </Head>

      <body className={theme}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
