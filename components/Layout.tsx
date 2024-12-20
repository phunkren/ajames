import { memo, ReactElement } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { slateDarkA, whiteA } from "@radix-ui/colors";
import { useTheme } from "../hooks/useTheme";
import { styled } from "../stitches.config";
import { Link } from "./Link";
import { Navigation, NavigationMobile } from "./Navigation";
import { Social } from "./Social";
import { ThemeToggle } from "./Toggle";
import { Box, BoxProps } from "./Box";
import { TextAux } from "./Text";
import { Logo } from "./Logo";
import { Tooltip } from "./Tooltip";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { useScroll } from "../hooks/useScroll";
import { useRouter } from "next/router";
import Head from "next/head";
import { PERSONAL, SITE, SOCIAL } from "../util/data";
import { Noise } from "./Noise";

type LayoutProps = {
  children: ReactElement;
};

const HeaderBox = styled(Box, {
  zIndex: "$2",
  width: "100%",
  position: "fixed",
  color: "currentcolor",
  top: 0,
  right: 0,
  left: 0,
  transition:
    "background-color $transitions$durationDefault $transitions$functionDefault",
  ["-webkit-transition"]:
    "background-color $transitions$durationDefault $transitions$functionDefault",

  variants: {
    opaque: {
      true: {
        backgroundColor: `$background`,
        boxShadow: "$1",
      },
      false: {
        color: `${whiteA.whiteA12}`,
      },
    },
  },
});

export const HeaderLayout = memo(function HeaderLayout() {
  const { asPath } = useRouter();
  const { isHeaderActive } = useScroll();
  const isBlogPost = asPath.includes("/writing");
  const isInventory = asPath.includes("/inventory");
  const isAbout = asPath.includes("/about");
  const isOpaque = isBlogPost || isInventory || isAbout || isHeaderActive;

  return (
    <HeaderBox
      as="header"
      opaque={isOpaque}
      css={{ "@print": { display: "none !important" } }}
    >
      <Box
        display={{ "@print": "none", "@initial": "flex" }}
        spacingVertical={3}
        spacingHorizontal={7}
        gap={7}
        justifyContent="space-between"
        alignItems="center"
        flexGrow
      >
        <Box direction="horizontal" gap={10} alignItems="center">
          <Tooltip title="Home">
            <Link href="/" variant="icon" nextLinkProps={{ shallow: true }}>
              <VisuallyHidden.Root>Home</VisuallyHidden.Root>
              <Logo />
            </Link>
          </Tooltip>

          <Box display={{ "@initial": "none", "@bp2": "flex" }}>
            <Navigation />
          </Box>
        </Box>

        <Box display={{ "@initial": "none", "@bp2": "flex" }}>
          <ThemeToggle opaque={isOpaque} />
        </Box>

        <Box display={{ "@initial": "flex", "@bp2": "none" }}>
          <NavigationMobile />
        </Box>
      </Box>
    </HeaderBox>
  );
});

export const FooterLayout = memo(function FooterLayout() {
  return (
    <Box
      as="footer"
      spacingTop={12}
      css={{
        "@print": { display: "none !important" },
      }}
    >
      <Box
        direction={{
          "@initial": "vertical",
          "@bp2": "horizontal",
        }}
        spacingVertical={10}
        spacingHorizontal={7}
        gap={6}
        justifyContent="center"
        alignItems="center"
        css={{ zIndex: "$1" }}
      >
        <Social gap="6" />
      </Box>
    </Box>
  );
});

export const Layout = memo(function Layout({ children }: LayoutProps) {
  const { theme, themeName, themeColor } = useTheme();
  const metaDescription = `${PERSONAL.description}`;
  const metaKeywords = PERSONAL.keywords.join(",");
  const metaTitle = `${PERSONAL.name} | ${SITE.displayName}`;
  const metaContent = `${SITE.url}/api/og`;
  const metaImgAlt = "A picture of Andrew James welcoming you to ajames.dev";

  return (
    <>
      <Head>
        <title key="title">{metaTitle}</title>
        <meta key="description" name="description" content={metaDescription} />
        <meta key="author" name="author" content={PERSONAL.name} />
        <meta key="keywords" name="keywords" content={metaKeywords} />
        <meta key="image" name="image" content={metaContent} />
        <meta name="theme-color" content={themeColor} />
        <meta name="color-scheme" content={themeName} />

        {/* OG */}
        <meta key="og:title" name="og:title" content={metaTitle} />
        <meta
          key="og:description"
          name="og:description"
          content={metaDescription}
        />
        <meta key="og:type" name="og:type" content="website" />
        <meta key="og:image" name="og:image" content={metaContent} />
        <meta key="og:image:alt" name="og:image:alt" content={metaImgAlt} />
        <meta key="og:image:height" name="og:image:height" content="640" />
        <meta key="og:image:width" name="og:image:width" content="1280" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={SOCIAL.x.handle} />
        <meta name="twitter:site" content={SOCIAL.x.handle} />
        <meta key="twitter:title" name="twitter:title" content={metaTitle} />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={metaDescription}
        />
        <meta key="twitter:image" name="twitter:image" content={metaContent} />
      </Head>

      <Box
        id="__root"
        direction="vertical"
        css={{
          "@print": { overflow: "visible" },
          "@initial": { overflowX: "hidden" },
          "@bp3": { overflowX: "visible" },
        }}
        className={theme}
      >
        <HeaderLayout />

        <Box
          as="main"
          direction="vertical"
          flexGrow
          css={{ overflowX: "hidden" }}
        >
          {children}
        </Box>

        <FooterLayout />

        <Noise />

        <SpeedInsights />
      </Box>
    </>
  );
});

export const ActionButtons = memo(function ActionButtons(props: BoxProps) {
  return (
    <Box
      direction={{ "@initial": "vertical", "@bp2": "horizontal" }}
      gap={4}
      justifyContent={{
        "@initial": "flex-end",
        "@bp2": "flex-end",
      }}
      alignItems={{ "@initial": "flex-end", "@bp2": "center" }}
      spacingBottom={1}
      {...props}
    />
  );
});

export const LoadingLayout = memo(function LoadingLayout() {
  return (
    <Box direction="vertical">
      <TextAux>Loading...</TextAux>
    </Box>
  );
});
