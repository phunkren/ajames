import { memo, useCallback } from "react";
import Router from "next/router";
import { ErrorBoundaryProps } from "../types/error";
import { Button } from "./Button";
import { TextHeadline, TextTitle1 } from "./Text";
import { Box } from "./Box";
import { HeroLayout } from "./Layout";

export const ErrorFallback = memo(function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorBoundaryProps) {
  const handleReload = useCallback(() => {
    Router.replace("/");
  }, []);

  return (
    <Box direction="vertical">
      <HeroLayout bordered css={{ marginTop: "auto" }}>
        <Box direction="vertical">
          <TextTitle1>Uh-oh!</TextTitle1>
          <TextHeadline>Something went wrong</TextHeadline>
        </Box>
      </HeroLayout>

      <Box
        role="alert"
        container="m"
        direction="vertical"
        alignItems="center"
        spacingTop={10}
        gap={10}
        flexGrow
      >
        {error?.message ? <Box as="pre">{error.message}</Box> : null}

        {error?.cause ? <Box as="pre">{error.cause}</Box> : null}

        {resetErrorBoundary ? (
          <Button onClick={resetErrorBoundary}>Try again</Button>
        ) : null}

        <Button onClick={handleReload}>
          <TextHeadline>Return to homepage</TextHeadline>
        </Button>
      </Box>
    </Box>
  );
});
