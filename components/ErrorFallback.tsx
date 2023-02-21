import { memo, useCallback } from "react";
import Router from "next/router";
import Image from "next/image";
import { ErrorBoundaryProps } from "../types/error";
import { Button } from "./Button";
import { TextHeadline, TextTitle1 } from "./Text";
import { Box } from "./Box";
import { HeroLayout, Layout } from "./Layout";
import { ThemeProvider } from "./Theme";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import uhoh from "../public/images/500.png";

const StyledImage = styled(Image, {
  display: "none",
  objectFit: "contain",
  position: "absolute",
  top: "10% !important",
  zIndex: -1,
  transform: "scale(0.9)",
  pointerEvents: "none",
  filter: "grayscale(1)",

  [`.${lightTheme} &`]: {
    filter: "brightness(75%)",
  },

  [`.${darkTheme} &`]: {
    filter: "brightness(75%)",
    opacity: 0.9,
  },

  "@bp2": {
    display: "block",
    left: "30% !important",
  },

  "@bp3": {
    display: "block",
    transform: "scale(1)",
    top: "7% !important",
    left: "50% !important",
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
          <HeroLayout bordered>
            <Box direction="vertical" position="relative" flexGrow>
              <Box
                direction="vertical"
                spacingLeft={{ "@bp2": 6, "@bp3": 0 }}
                justifyContent="flex-end"
                flexGrow
              >
                <Box direction="vertical">
                  <TextTitle1>Uh-oh!</TextTitle1>
                  <TextHeadline>Something went wrong</TextHeadline>
                </Box>
              </Box>

              <StyledImage src={uhoh} alt="" sizes="25vw" priority fill />
            </Box>
          </HeroLayout>

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
                {error.cause}
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
