import { memo, ReactNode, useCallback } from "react";
import Router from "next/router";
import { Button } from "./Button";
import { TextHeadline, TextSubtitle, TextTitle } from "./Text";
import { Box } from "./Box";
import { ThemeProvider } from "./Theme";
import { HeroContainer } from "./sections/Hero";
import uhoh from "../public/images/500.png";
import { Layout } from "./Layout";

export type ErrorBoundaryProps = {
  error?: Error;
  resetErrorBoundary?: (...args: Array<unknown>) => void;
};

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
        <HeroContainer
          src={uhoh}
          alt="A picture of Andrew James, facepalming in frustration"
        >
          <Box
            role="alert"
            direction="vertical"
            spacingBottom={7}
            justifyContent={{
              "@portrait": "flex-end",
              "@landscape": "center",
            }}
            alignItems={{
              "@portrait": "center",
              "@landscape": "flex-start",
            }}
            css={{ zIndex: "$1" }}
            flexGrow
          >
            <Box
              direction="vertical"
              spacingVertical={{
                "@portrait": 7,
                "@landscape": 12,
              }}
            >
              <TextTitle css={{ textAlign: "left" }}>Uh oh!</TextTitle>

              {error?.message ? (
                <TextSubtitle
                  as="pre"
                  css={{
                    whiteSpace: "normal",
                    textAlign: "left",

                    "@landscape": {
                      maxWidth: "500px",
                    },
                  }}
                >
                  {error.message}
                </TextSubtitle>
              ) : null}

              {error?.cause ? (
                <TextSubtitle
                  as="pre"
                  css={{
                    whiteSpace: "normal",
                    textAlign: "left",

                    "@landscape": {
                      maxWidth: "500px",
                    },
                  }}
                >
                  {error.cause as ReactNode}
                </TextSubtitle>
              ) : null}

              <Box
                gap={{
                  "@portrait": 4,
                  "@landscape": 10,
                }}
                spacingTop={7}
                direction={{
                  "@portrait": "vertical",
                  "@landscape": "horizontal",
                }}
              >
                <Button variant="primary" onClick={handleReload}>
                  <TextHeadline>Return to homepage</TextHeadline>
                </Button>

                {resetErrorBoundary ? (
                  <Button variant="secondary" onClick={resetErrorBoundary}>
                    <TextHeadline>Try again</TextHeadline>
                  </Button>
                ) : null}
              </Box>
            </Box>
          </Box>
        </HeroContainer>
      </Layout>
    </ThemeProvider>
  );
});
