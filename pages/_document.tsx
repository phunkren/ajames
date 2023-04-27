import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";
import { globalStyles } from "../styles/global";
import { SITE } from "../util/data";

export default function Document() {
  globalStyles();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        if (registration.scope.startsWith(SITE.url)) {
          registration.unregister();
        }
      }
    });
  }

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
