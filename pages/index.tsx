import { useRouter } from "next/router";
import { HStack, Layout, VStack } from "../components/Layout";
import { Link } from "../components/Link";
import {
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
} from "../components/Text";
import { EMPLOYMENT } from "../data/employment";
import { PERSONAL } from "../data/personal";

function Home() {
  const {
    query: { tab },
  } = useRouter();

  const currentTab = tab || "home";

  const currentEmployer = EMPLOYMENT[0];

  return (
    <Layout>
      <VStack
        justifyContent="center"
        alignItems="center"
        gap={5}
        spacingHorizontal={3}
        spacingVertical={7}
        flexGrow
      >
        <nav aria-label="Blog categories">
          <HStack as="ul" role="list" gap={5}>
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
          </HStack>
        </nav>

        {currentTab === "home" ? (
          <VStack alignItems="center">
            <TextTitle1 css={{ textTransform: "uppercase" }}>
              {PERSONAL.name}
            </TextTitle1>

            <HStack gap={2} alignItems="flex-end">
              <TextHeadline>{PERSONAL.occupation}</TextHeadline>

              <TextBody as="span">@</TextBody>

              <Link href={currentEmployer.url} variant="primary">
                <TextHeadline>{currentEmployer.displayName}</TextHeadline>
              </Link>
            </HStack>
          </VStack>
        ) : null}

        {currentTab === "about" ? (
          <VStack gap={5} css={{ maxWidth: 720, margin: "0 auto" }}>
            <TextAux>👋</TextAux>
            <TextBody>{PERSONAL.profile1}</TextBody>
            <TextBody>{PERSONAL.profile2}</TextBody>
          </VStack>
        ) : null}
      </VStack>
    </Layout>
  );
}

export default Home;
