import { memo, ReactNode, useCallback } from "react";
import Router from "next/router";
import Image from "next/image";
import { Button } from "./Button";
import { TextHeadline } from "./Text";
import { Box } from "./Box";
import { Layout } from "./Layout";
import { ThemeProvider } from "./Theme";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { Hero } from "./sections/Hero";

export type ErrorBoundaryProps = {
  error?: Error;
  resetErrorBoundary?: (...args: Array<unknown>) => void;
};

const StyledImage = styled(Image, {
  display: "none",
  objectFit: "contain",
  position: "absolute",
  top: "10% !important",
  zIndex: -1,
  transform: "scale(-1.5, 1.5)",
  filter: "grayscale(1)",

  [`.${lightTheme} &`]: {
    filter: "brightness(75%) grayscale(1)",
  },

  [`.${darkTheme} &`]: {
    filter: "brightness(75%) grayscale(1)",
    opacity: 0.9,
  },

  "@bp2": {
    display: "block",
    left: "30% !important",
  },

  "@bp3": {
    display: "block",
    top: "7% !important",
    left: "25% !important",
  },
});

export const ErrorFallback = memo(function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorBoundaryProps) {
  const handleReload = useCallback(() => {
    Router.replace("/");
    resetErrorBoundary?.();
  }, [resetErrorBoundary]);

  return (
    <ThemeProvider>
      <Layout>
        <Box direction="vertical">
          <Hero />

          <Box
            role="alert"
            direction="vertical"
            alignItems="center"
            container="s"
            spacingTop={10}
            gap={10}
            flexGrow
          >
            {error?.message ? (
              <Box as="pre" css={{ whiteSpace: "normal" }}>
                {error.message}
              </Box>
            ) : null}

            {error?.cause ? (
              <Box as="pre" css={{ whiteSpace: "normal" }}>
                {error.cause as ReactNode}
              </Box>
            ) : null}

            <Box gap={10} justifyContent="center">
              {resetErrorBoundary ? (
                <Button variant="secondary" onClick={resetErrorBoundary}>
                  <TextHeadline>Try again</TextHeadline>
                </Button>
              ) : null}

              <Button variant="secondary" onClick={handleReload}>
                <TextHeadline>Return to homepage</TextHeadline>
              </Button>
            </Box>
          </Box>
        </Box>
      </Layout>
    </ThemeProvider>
  );
});
