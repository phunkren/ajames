import { HStack, Layout, VStack } from "../components/Layout";
import { Link } from "../components/Link";
import { TextBody, TextHeadline, TextTitle1 } from "../components/Text";
import { EMPLOYMENT } from "../data/employment";
import { PERSONAL } from "../data/personal";
import { SITE } from "../data/site";

function Home() {
  const currentEmployer = EMPLOYMENT[0];

  return (
    <Layout>
      <VStack
        justifyContent="center"
        alignItems="center"
        spacingHorizontal={3}
        spacingVertical={7}
        flexGrow
      >
        <TextTitle1 css={{ textTransform: "uppercase" }}>
          {SITE.displayName}
        </TextTitle1>

        <HStack gap={2} alignItems="center">
          <TextHeadline>{PERSONAL.occupation}</TextHeadline>

          <TextBody as="span">@</TextBody>

          <Link href={currentEmployer.url} variant="primary">
            <TextHeadline>{currentEmployer.displayName}</TextHeadline>
          </Link>
        </HStack>
      </VStack>
    </Layout>
  );
}

export default Home;
