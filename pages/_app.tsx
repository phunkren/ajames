import { ErrorBoundary } from "react-error-boundary";
import { RootLayout } from "../components/Layout";
import { ThemeProvider } from "../components/Theme";
import { globalStyles } from "../styles/global";

export default function MyApp({ Component, pageProps }) {
  globalStyles();

  return (
    <ThemeProvider>
      <ErrorBoundary fallback={<div>Oh no</div>}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
