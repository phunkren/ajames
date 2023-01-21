import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { memo, useCallback } from "react";
import Router from "next/router";
import { styled } from "../stitches.config";
import { ErrorBoundaryProps } from "../types/error";
import { Button } from "./Button";
import { Layout } from "./Layout";
import { TextHeadline, TextTitle1 } from "./Text";
import { Box } from "./Box";

const StyledHero = styled(Box, {
  position: "absolute",
  inset: 0,
  borderRadius: 4,
  backgroundColor: "$background",
});

export const ErrorFallback = memo(function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorBoundaryProps) {
  const handleReload = useCallback(() => {
    Router.replace("/");
  }, []);

  return (
    <Box direction="vertical">
      <AspectRatio ratio={2.5 / 1}>
        <StyledHero
          spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
          spacingVertical={{ "@initial": 5, "@bp2": 7 }}
          alignItems="center"
          justifyContent="center"
        >
          <Box direction="vertical">
            <TextTitle1 textAlign="center">Uh-oh!</TextTitle1>
            <TextHeadline textAlign="center">Something went wrong</TextHeadline>
          </Box>
        </StyledHero>
      </AspectRatio>

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
