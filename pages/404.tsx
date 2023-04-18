import Image from "next/image";
import { ReactElement } from "react";
import { Box } from "../components/Box";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { Hero } from "../components/sections/Hero";
import { TextHeadline } from "../components/Text";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { NextPageWithLayout } from "./_app";

const NotFound: NextPageWithLayout = () => {
  return (
    <Box direction="vertical">
      <Hero />

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
