import { translate } from "googleapis/build/src/apis/translate";
import { useRouter } from "next/router";
import { ReactElement, useCallback } from "react";
import { Box } from "../components/Box";
import { Divider } from "../components/Divider";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { PageToggle } from "../components/Tags";
import {
  Emoji,
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "../components/Text";
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
      direction={{ "@initial": "vertical", "@bp2": "horizontal" }}
      justifyContent="space-between"
      alignItems="center"
      container="m"
      spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
      flexGrow
    >
      <Box
        direction={{ "@initial": "vertical", "@bp2": "horizontal" }}
        justifyContent="center"
        position="relative"
        flexGrow
      >
        <Box
          display={{ "@initial": "none", "@bp2": "flex" }}
          direction="horizontal"
          css={{ width: 80 }}
        >
          <PageToggle
            type="single"
            defaultValue="short"
            value={currentTab}
            onValueChange={handleTabChange}
          />

          <Box spacingLeft={10}>
            <Divider orientation="vertical" />
          </Box>
        </Box>

        {!query.tab || query.tab === "short" ? (
          <Box
            direction="vertical"
            alignItems="center"
            justifyContent="center"
            spacingHorizontal={10}
            css={{ transform: "translateX(-40px)" }}
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
        ) : null}

        {query.tab === "long" ? (
          <Box direction="vertical" gap={5} spacingLeft={{ "@bp2": 10 }}>
            <StyledHand>
              <StyledPalm data-palm emoji="👋" size="s" />
              <StyledFist data-fist emoji="👊" size="s" />
            </StyledHand>

            <TextHeadline>{PERSONAL.profile1}</TextHeadline>

            <TextHeadline>{PERSONAL.profile2}</TextHeadline>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
