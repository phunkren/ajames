import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";
import { globalStyles } from "../styles/global";
import { PERSONAL, SITE } from "../util/data";

export default function Document() {
  globalStyles();

  return (
    <Html lang="en">
      <Head>
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
