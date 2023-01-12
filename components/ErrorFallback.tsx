import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { styled } from "../stitches.config";
import { Button } from "./Button";
import { Box, Layout } from "./Layout";
import { Link } from "./Link";
import { TextHeadline, TextTitle1 } from "./Text";

const StyledHero = styled(Box, {
  position: "absolute",
  inset: 0,
  borderRadius: 4,
  background: "$background",
});

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Layout>
      <AspectRatio ratio={2.5 / 1}>
        <StyledHero
          spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
          spacingVertical={{ "@initial": 5, "@bp2": 7 }}
          alignItems="center"
          justifyContent="center"
        >
          <Box direction="vertical">
            <TextTitle1 textAlign="center">{error.code ?? "Uh-oh!"}</TextTitle1>
            <TextHeadline textAlign="center">Something went wrong</TextHeadline>
          </Box>
        </StyledHero>
      </AspectRatio>

      <Box
        role="alert"
        direction="vertical"
        justifyContent="center"
        alignItems="center"
        spacingTop={10}
        gap={10}
        flexGrow
      >
        <Box as="pre">{error.message}</Box>

        <Button onClick={resetErrorBoundary}>Try again</Button>

        <Link href="/" variant="primary">
          <TextHeadline>Return to homepage</TextHeadline>
        </Link>
      </Box>
    </Layout>
  );
}
