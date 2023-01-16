import { ComponentProps, memo, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useTheme } from "../hooks/useTheme";
import { styled } from "../stitches.config";
import { DISPLAY_VARIANTS } from "../styles/display";
import { FLEX_VARIANTS } from "../styles/flex";
import { SPACING_VARIANTS } from "../styles/spacing";
import { ELEVATION_VARIANTS } from "../styles/elevation";
import { Avatar } from "./Avatar";
import { Link } from "./Link";
import { Navigation, NavigationMobile } from "./Navigation";
import { Social } from "./Social";
import { ThemeToggle } from "./Theme";
import { ScrollToTopButton } from "./Button";
import { TextHeadline } from "./Text";
import Head from "next/head";
import { PERSONAL, SITE, SOCIAL } from "../util/data";
import { BLUR_DATA_URL, ICON_SIZE } from "../util/images";
import { BlogLayoutProps, BoxProps, LayoutProps } from "../types/layout";
import { BlogSEO, PageSEO } from "./SEO";

export const Box = styled("div", {
  display: "flex",
  flexDirection: "row",

  variants: {
    ...DISPLAY_VARIANTS,
    ...ELEVATION_VARIANTS,
    ...FLEX_VARIANTS,
    ...SPACING_VARIANTS,
  },
});

const StyledImage = styled(Image, {
  objectFit: "cover",
  borderRadius: 4,
});

// These magic numbers are calculated based on the font size of the TextTitle1 component
// The computed value is (fontSize * lineHeight) / 2.
const StyledContent = styled(Box, {
  position: "relative",
  top: -16,

  "@bp2": {
    top: -32,
  },
});

export const ActionButtons = memo(function ActionButtons(props: BoxProps) {
  return (
    <Box
      direction={{ "@initial": "vertical", "@bp2": "horizontal" }}
      gap={4}
      justifyContent={{
        "@initial": "flex-end",
        "@bp2": "flex-end",
        "@bp12": "flex-start",
      }}
      alignItems={{ "@initial": "flex-end", "@bp2": "center" }}
      {...props}
    />
  );
});

export const RootLayout = memo(function RootLayout({ children }: LayoutProps) {
  return (
    <Box id="__root" direction="vertical" container="xl">
      {children}
    </Box>
  );
});

export const HeaderLayout = memo(function HeaderLayout() {
  return (
    <Box
      as="header"
      direction="horizontal"
      spacingTop={7}
      spacingBottom={10}
      spacingHorizontal={4}
      gap={{ "@initial": 4, "@bp2": 7 }}
      justifyContent="space-between"
      alignItems="center"
      css={{ "@print": { display: "none" } }}
    >
      <Box direction="horizontal" alignItems="center">
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
      direction="horizontal"
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

export const Layout = memo(function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <PageSEO />
      </Head>

      <Box
        direction="vertical"
        spacingHorizontal={{ "@initial": 2, "@bp2": 4 }}
        flexGrow
      >
        <HeaderLayout />

        <Box as="main" direction="vertical" container="l" flexGrow>
          {children}
        </Box>

        <FooterLayout />
      </Box>
    </>
  );
});

export const BlogLayout = memo(function BlogLayout({
  frontmatter,
  children,
}: BlogLayoutProps) {
  return (
    <>
      <Head>
        <BlogSEO frontmatter={frontmatter} />
      </Head>

      <Box
        direction="vertical"
        spacingHorizontal={{ "@initial": 2, "@bp2": 4 }}
      >
        <HeaderLayout />

        <Box direction="vertical" container="l">
          <Link href="/blog" variant="secondary">
            <Box
              alignItems="center"
              gap={2}
              spacingBottom={{ "@initial": 4, "@bp2": 7 }}
            >
              <ArrowLeftIcon
                width={ICON_SIZE.m}
                height={ICON_SIZE.m}
                aria-hidden
              />
              <TextHeadline>Back to blog overview</TextHeadline>
            </Box>
          </Link>

          <AspectRatio.Root ratio={2.5 / 1}>
            <StyledImage
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              src={frontmatter.cover}
              alt=""
              sizes="100vw"
              fill
              priority
            />
          </AspectRatio.Root>

          <StyledContent as="main" direction="vertical">
            {children}
          </StyledContent>

          <FooterLayout />
        </Box>

        <ScrollToTopButton />
      </Box>
    </>
  );
});
