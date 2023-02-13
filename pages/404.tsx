import { ReactElement } from "react";
import { Box } from "../components/Box";
import { HeroLayout, Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { TextHeadline, TextTitle1 } from "../components/Text";
import { NextPageWithLayout } from "./_app";

const NotFound: NextPageWithLayout = () => {
  return (
    <Box direction="vertical">
      <HeroLayout bordered>
        <Box direction="vertical" css={{ marginTop: "auto" }}>
          <TextTitle1>404</TextTitle1>
          <TextHeadline>Page not found</TextHeadline>
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
