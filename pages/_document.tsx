import { Html, Head, Main, NextScript } from "next/document";
import { RootSeo } from "../components/SEO";
import { getCssText } from "../stitches.config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <RootSeo />

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
