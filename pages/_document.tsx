import { Html, Head, Main, NextScript } from "next/document";
import { DocumentSeo } from "../components/SEO";
import { getCssText } from "../stitches.config";
import { globalStyles } from "../styles/global";

export default function Document() {
  globalStyles();

  return (
    <Html lang="en">
      <Head>
        <DocumentSeo />

        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
