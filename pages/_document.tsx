import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";
import { globalStyles } from "../styles/global";
import { PERSONAL, SITE } from "../util/data";

export default function Document() {
  globalStyles();

  return (
    <Html lang="en">
      <Head>
        <title key="title">{`${PERSONAL.name} | ${PERSONAL.occupation}`}</title>
        <meta key="og:image" name="og:image" content={`${SITE.url}/api/og`} />

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
