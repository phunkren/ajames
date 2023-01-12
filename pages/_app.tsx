import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback";
import { RootLayout } from "../components/Layout";
import { ThemeProvider } from "../components/Theme";
import { globalStyles } from "../styles/global";

export default function MyApp({ Component, pageProps }) {
  globalStyles();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
