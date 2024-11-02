import { memo, ReactElement } from "react";
import { Box } from "../components/Box";
import { About as CV } from "../components/sections/About";
import { Layout } from "../components/Layout";
import { NextPageWithLayout } from "./_app";

const About: NextPageWithLayout = memo(function About() {
  return (
    <Box
      as="section"
      display={{ "@print": "none", "@initial": "flex" }}
      direction="vertical"
      spacingTop={{ "@initial": 11, "@bp2": 10, "@bp3": 11 }}
      spacingBottom={{ "@print": 0, "@initial": 12 }}
      spacingHorizontal={7}
    >
      <Box
        direction="vertical"
        gap={12}
        container="l"
        spacingBottom={{ "@print": 0, "@initial": 10, "@bp2": 11 }}
        css={{ zIndex: "$1" }}
      >
        <Box direction="vertical" gap={10}>
          <CV />
        </Box>
      </Box>
    </Box>
  );
});

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
