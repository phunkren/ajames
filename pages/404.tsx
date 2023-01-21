import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ReactElement } from "react";
import { Box } from "../components/Box";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { TextHeadline, TextTitle1 } from "../components/Text";
import { styled } from "../stitches.config";
import { NextPageWithLayout } from "./_app";

const StyledHero = styled(Box, {
  position: "absolute",
  inset: 0,
  borderRadius: 4,
  background: "$background",
});

const NotFound: NextPageWithLayout = () => {
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
    </Box>
  );
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NotFound;
