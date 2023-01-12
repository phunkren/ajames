import { ErrorBoundary } from "react-error-boundary";
import { RootLayout } from "../components/Layout";
import { ThemeProvider } from "../components/Theme";
import { globalStyles } from "../styles/global";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

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
