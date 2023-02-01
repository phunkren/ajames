import { memo } from "react";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { useTheme } from "../hooks/useTheme";
import { styled } from "../stitches.config";
import { BLUR_DATA_URL } from "../util/images";
import { Avatar } from "./Avatar";
import { Link } from "./Link";
import { Navigation, NavigationMobile } from "./Navigation";
import { Social } from "./Social";
import { ThemeToggle } from "./Theme";
import { PERSONAL } from "../util/data";
import { Box } from "./Box";
import { PageSeo } from "./SEO";

const StyledHeroLayout = styled(Box, {
  width: "100vw",
  position: "relative",
  left: "-$2",

  "@bp2": {
    left: "-$7",
  },

  "@bp3": {
    left: 0,
    width: "100%",
  },
});

const StyledImage = styled(Image, {
  objectFit: "cover",
  borderRadius: 0,

  "@bp3": {
    borderRadius: 4,
  },
});

export const HeaderLayout = memo(function HeaderLayout() {
  return (
    <Box
      as="header"
      spacingTop={7}
      spacingBottom={10}
      gap={{ "@initial": 4, "@bp2": 7 }}
      justifyContent="space-between"
      alignItems="center"
      css={{
        paddingLeft: "$4",
        paddingRight: "$4",
        "@bp2": { paddingLeft: 0, paddingRight: 0 },
        "@print": { display: "none" },
      }}
    >
      <Box direction="horizontal" gap={10} alignItems="center">
        <Link href="/">
          <Avatar />
        </Link>

        <Box display={{ "@initial": "none", "@bp2": "flex" }}>
          <Navigation />
        </Box>
      </Box>

      <Box display={{ "@initial": "none", "@bp2": "flex" }}>
        <ThemeToggle />
      </Box>

      <Box display={{ "@initial": "flex", "@bp2": "none" }}>
        <NavigationMobile />
      </Box>
    </Box>
  );
});

export const FooterLayout = memo(function FooterLayout() {
  return (
    <Box
      as="footer"
      spacingTop={10}
      spacingBottom={7}
      spacingHorizontal={4}
      justifyContent="center"
      css={{ "@print": { display: "none" } }}
    >
      <Social />
    </Box>
  );
});

export const Layout = memo(function Layout({ children }: any) {
  const { theme } = useTheme();

  return (
    <>
      <PageSeo />

      <Box
        id="__root"
        direction="vertical"
        spacingHorizontal={{ "@initial": 2, "@bp2": 7 }}
        container="l"
        className={theme}
      >
        <HeaderLayout />

        <Box
          as="main"
          direction="vertical"
          spacingTop={{ "@print": 4, "@bp2": 10 }}
          flexGrow
        >
          {children}
        </Box>

        <FooterLayout />
      </Box>
    </>
  );
});

export const HeroLayout = memo(function HeroLayout({ src }: any) {
  return (
    <StyledHeroLayout id={PERSONAL.initials}>
      <AspectRatio.Root ratio={2.5 / 1}>
        <StyledImage
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          src={src}
          alt=""
          sizes="100vw"
          fill
          priority
        />
      </AspectRatio.Root>
    </StyledHeroLayout>
  );
});

export const ActionButtons = memo(function ActionButtons(props: any) {
  return (
    <Box
      direction={{ "@initial": "vertical", "@bp2": "horizontal" }}
      gap={4}
      justifyContent={{
        "@initial": "flex-end",
        "@bp2": "flex-end",
      }}
      alignItems={{ "@initial": "flex-end", "@bp2": "center" }}
      {...props}
    />
  );
});
