import * as Toggle from "@radix-ui/react-toggle";
import { styled } from "@stitches/react";
import { useRouter } from "next/router";
import { Box, Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { PageToggle } from "../components/Tags";
import { Emoji, TextBody, TextHeadline, TextTitle1 } from "../components/Text";
import { EMPLOYMENT, PERSONAL } from "../util/data";

function Home() {
  const { pathname, push, query } = useRouter();

  const currentTab = (query.tab as string) ?? "short";

  function handleTabChange(newTab: string) {
    if (newTab) {
      push({ pathname, query: { ...query, tab: newTab } }, undefined, {
        scroll: false,
      });
    }
  }

  const currentEmployer = EMPLOYMENT[0];

  return (
    <Layout>
      <Box
        direction="vertical"
        justifyContent="center"
        alignItems="center"
        spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
        spacingVertical={7}
        flexGrow
      >
        <Box spacingBottom={5}>
          <PageToggle
            type="single"
            defaultValue="short"
            value={currentTab}
            onValueChange={handleTabChange}
          />
        </Box>

        {!query.tab || query.tab === "short" ? (
          <Box direction="vertical" alignItems="center">
            <TextTitle1>{PERSONAL.name}</TextTitle1>

            <Box direction="horizontal" gap={2} alignItems="flex-end">
              <TextHeadline>{PERSONAL.occupation}</TextHeadline>

              <TextBody as="span">@</TextBody>

              <Link href={currentEmployer.url} variant="primary">
                <TextHeadline>{currentEmployer.displayName}</TextHeadline>
              </Link>
            </Box>
          </Box>
        ) : null}

        {query.tab === "long" ? (
          <Box direction="vertical" gap={5} container="s">
            <Emoji emoji="👋" />
            <TextBody>{PERSONAL.profile1}</TextBody>
            <TextBody>{PERSONAL.profile2}</TextBody>
          </Box>
        ) : null}
      </Box>
    </Layout>
  );
}

export default Home;
