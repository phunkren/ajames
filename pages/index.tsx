import { HStack, Layout, VStack } from "../components/Layout";
import { Link } from "../components/Link";
import { TextBody, TextHeadline, TextTitle1 } from "../components/Text";
import { PERSONAL } from "../data/personal";

function Home() {
  return (
    <Layout>
      <VStack
        justifyContent="center"
        alignItems="center"
        spacingHorizontal={3}
        spacingVertical={7}
        flexGrow
      >
        <TextTitle1>AJAMES.DEV</TextTitle1>

        <HStack gap={2} alignItems="center">
          <TextHeadline>{PERSONAL.occupation.title}</TextHeadline>

          <TextBody as="span">@</TextBody>

          <Link href={PERSONAL.occupation.url} variant="primary">
            <TextHeadline>{PERSONAL.occupation.employer}</TextHeadline>
          </Link>
        </HStack>
      </VStack>
    </Layout>
  );
}

export default Home;
