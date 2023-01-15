import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500&family=Arimo:wght@400;500&family=Chivo:wght@300;400;500&family=Finlandica:wght@400;500&family=Jost:wght@300;400;500&family=Major+Mono+Display&family=Montserrat:wght@200;300;400;500&family=Open+Sans:wght@300;400;500&family=Rubik:wght@300;400;500&family=Sora:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
