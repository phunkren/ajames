import { ReactElement } from "react";
import { Box } from "../components/Box";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { HeroContainer } from "../components/sections/Hero";
import { TextHeadline, TextSubtitle, TextTitle } from "../components/Text";
import { NextPageWithLayout } from "./_app";
import notFound from "../public/images/404.png";

const NotFound: NextPageWithLayout = () => {
  return (
    <HeroContainer
      src={notFound}
      alt="A picture of Andrew James, looking confused and scratching his head"
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
        <Box direction="vertical">
          <TextTitle>404</TextTitle>

          <TextSubtitle>Page not found. Sorry about that.</TextSubtitle>

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
            alignItems={{
              "@portrait": "center",
              "@landscape": "flex-start",
            }}
          >
            <Link href="/" variant="tertiary">
              <TextHeadline>Return to homepage</TextHeadline>
            </Link>
          </Box>
        </Box>
      </Box>
    </HeroContainer>
  );
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NotFound;
