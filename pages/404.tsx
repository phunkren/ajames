import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Box } from "../components/Box";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { TextHeadline, TextTitle1 } from "../components/Text";
import { styled } from "../stitches.config";

const StyledHero = styled(Box, {
  position: "absolute",
  inset: 0,
  borderRadius: 4,
  background: "$background",
});

function NotFoundPage() {
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
            <TextTitle1 textAlign="center">404</TextTitle1>
            <TextHeadline textAlign="center">Page not found</TextHeadline>
          </Box>
        </StyledHero>
      </AspectRatio>

      <Box direction="vertical" alignItems="center" spacingTop={10} flexGrow>
        <Link href="/" variant="primary">
          <TextHeadline>Return to homepage</TextHeadline>
        </Link>
      </Box>
    </Layout>
  );
}

export default NotFoundPage;
