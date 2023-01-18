import { ErrorProps } from "next/error";

export type ErrorBoundaryProps = {
  error?: Error;
  resetErrorBoundary?: (...args: Array<unknown>) => void;
};
