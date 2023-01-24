import { useRouter } from "next/router";
import { ReactElement, useCallback } from "react";
import { Box } from "../components/Box";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { PageToggle } from "../components/Tags";
import { Emoji, TextBody, TextHeadline, TextTitle1 } from "../components/Text";
import { keyframes, styled } from "../stitches.config";
import { EMPLOYMENT, PERSONAL } from "../util/data";
import { NextPageWithLayout } from "./_app";

const wave = keyframes({
  "0%": { transform: "rotate(20deg)" },
  "50%": { transform: "rotate(50deg)" },
  "100%": { transform: "rotate(20deg)" },
});

const punch = keyframes({
  "0%": { transform: "scale(1)" },
  "50%": { transform: "scale(1.5)" },
  "100%": { transform: "scale(1)" },
});

const StyledHand = styled(Box, {
  position: "relative",
  width: 44,
  height: 44,

  "&:hover": {
    cursor: "grabbing",

    "& > span[data-palm=true]": {
      visibility: "hidden",
    },

    "& > span[data-fist=true]": {
      display: "block",
    },
  },
});

const StyledPalm = styled(Emoji, {
  position: "absolute",
  width: "100%",
  height: "100%",
  visibility: "visible",
  transform: "rotate(20deg)",
  animation: `${wave} 400ms linear 600ms 2 forwards`,
});

const StyledFist = styled(Emoji, {
  position: "absolute",
  display: "none",
  width: "100%",
  height: "100%",

  "&:hover": {
    animation: `${punch} 400ms ease-out 600ms forwards`,
  },
});

const Home: NextPageWithLayout = () => {
  const { pathname, push, query } = useRouter();
  const currentTab = (query.tab as string) ?? "short";
  const currentEmployer = EMPLOYMENT[0];

  const handleTabChange = useCallback(
    (newTab: string) => {
      if (newTab) {
        push({ pathname, query: { ...query, tab: newTab } }, undefined, {
          scroll: false,
        });
      }
    },
    [pathname, push, query]
  );

  return (
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
          <StyledHand>
            <StyledPalm data-palm emoji="👋" size="s" />
            <StyledFist data-fist emoji="👊" size="s" />
          </StyledHand>
          <TextBody>{PERSONAL.profile1}</TextBody>
          <TextBody>{PERSONAL.profile2}</TextBody>
        </Box>
      ) : null}
    </Box>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
