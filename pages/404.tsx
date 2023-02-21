import Image from "next/image";
import { ReactElement } from "react";
import { Box } from "../components/Box";
import { HeroLayout, Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { TextHeadline, TextTitle1 } from "../components/Text";
import lost from "../public/images/404.png";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { NextPageWithLayout } from "./_app";

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

const NotFound: NextPageWithLayout = () => {
  return (
    <Box direction="vertical">
      <HeroLayout bordered>
        <Box direction="vertical" position="relative" flexGrow>
          <Box
            direction="vertical"
            spacingLeft={{ "@bp2": 6, "@bp3": 0 }}
            justifyContent={{
              "@initial": "center",
              "@bp2": "flex-end",
              "@bp3": "space-between",
            }}
            flexGrow
          >
            <Box direction="vertical" css={{ marginTop: "auto" }}>
              <TextTitle1>404</TextTitle1>
              <TextHeadline>Page not found</TextHeadline>
            </Box>
          </Box>

          <StyledImage src={lost} alt="" sizes="25vw" priority fill />
        </Box>
      </HeroLayout>

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
