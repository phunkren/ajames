import { ErrorProps } from "next/error";

export type ErrorBoundaryProps = {
  error?: Error | ErrorProps;
  resetErrorBoundary?: (...args: Array<unknown>) => void;
};
