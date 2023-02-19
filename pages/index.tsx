import { ReactElement } from "react";
import { Box } from "../components/Box";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { TextBody, TextHeadline, TextTitle1 } from "../components/Text";
import { EMPLOYMENT, PERSONAL } from "../util/data";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const currentEmployer = EMPLOYMENT[0];

  return (
    <Box
      direction="vertical"
      justifyContent="center"
      alignItems="center"
      container="m"
      spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
      flexGrow
    >
      <TextTitle1>{PERSONAL.name}</TextTitle1>

      <Box direction="horizontal" gap={2} alignItems="flex-end">
        <TextHeadline>{PERSONAL.occupation}</TextHeadline>

        <TextBody as="span">@</TextBody>

        <Link href={currentEmployer.url} variant="primary">
          <TextHeadline>{currentEmployer.displayName}</TextHeadline>
        </Link>
      </Box>
    </Box>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
