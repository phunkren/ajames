import { RootLayout } from "../components/Layout";
import { ThemeProvider } from "../components/Theme";
import { globalStyles } from "../styles/global";

export default function MyApp({ Component, pageProps }) {
  globalStyles();

  return (
    <ThemeProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ThemeProvider>
  );
}
