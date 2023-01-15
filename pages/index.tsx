import { useRouter } from "next/router";
import { Box, Layout } from "../components/Layout";
import { Link } from "../components/Link";
import {
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
} from "../components/Text";
import { EMPLOYMENT, PERSONAL } from "../util/data";

function Home() {
  const {
    query: { tab },
  } = useRouter();

  const currentTab = tab || "home";

  const currentEmployer = EMPLOYMENT[0];

  return (
    <Layout>
      <Box
        direction="vertical"
        justifyContent="center"
        alignItems="center"
        gap={5}
        spacingHorizontal={3}
        spacingVertical={7}
        flexGrow
      >
        <nav aria-label="Blog categories">
          <Box direction="horizontal" as="ul" role="list" gap={5}>
            <li>
              <Link href={{ pathname: "/", query: { tab: "home" } }}>
                Short
              </Link>
            </li>

            <li>
              <Link href={{ pathname: "/", query: { tab: "about" } }}>
                Long
              </Link>
            </li>
          </Box>
        </nav>

        {currentTab === "home" ? (
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

        {currentTab === "about" ? (
          <Box direction="vertical" gap={5} container="s">
            <TextAux>👋</TextAux>
            <TextBody>{PERSONAL.profile1}</TextBody>
            <TextBody>{PERSONAL.profile2}</TextBody>
          </Box>
        ) : null}
      </Box>
    </Layout>
  );
}

export default Home;
