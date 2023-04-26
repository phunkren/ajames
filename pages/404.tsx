import { ReactElement } from "react";
import { Box } from "../components/Box";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { HeroContainer } from "../components/sections/Hero";
import { TextSubtitle, TextTitle } from "../components/Text";
import { NextPageWithLayout } from "./_app";
import notFound from "../public/images/404.png";

const NotFound: NextPageWithLayout = () => {
  return (
    <HeroContainer src={notFound}>
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

          <TextSubtitle>Page not found.</TextSubtitle>
        </Box>
      </Box>
    </HeroContainer>
  );
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NotFound;
