export type ErrorBoundaryProps = {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
};
