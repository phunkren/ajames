import { memo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useTheme } from "../hooks/useTheme";
import { CSS, styled } from "../stitches.config";
import { BLUR_DATA_URL, ICON_SIZE } from "../util/images";
import { DISPLAY_VARIANTS } from "../styles/display";
import { FLEX_VARIANTS } from "../styles/flex";
import { SPACING_VARIANTS } from "../styles/spacing";
import { Avatar } from "./Avatar";
import { Link } from "./Link";
import { Navigation, NavigationMobile } from "./Navigation";
import { Social } from "./Social";
import { ThemeToggle } from "./Theme";
import { ScrollToTopButton } from "./Button";
import { TextHeadline } from "./Text";
import { BlogSEO, PageSEO } from "./SEO";

const StyledBox = styled("div", {
  display: "flex",
  flexDirection: "row",

  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS, ...DISPLAY_VARIANTS },
});

export const Box = memo(function Box(props: any) {
  return <StyledBox {...props} />;
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

const StyledHeroLayout = styled(Box, {
  width: "100vw",
  position: "relative",
  left: "-$2",

  "@bp2": {
    width: "100%",
    left: 0,
  },
});

const StyledImage = styled(Image, {
  objectFit: "cover",
  borderRadius: 0,

  "@bp2": {
    borderRadius: 4,
  },
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

export const RootLayout = memo(function RootLayout({ children }: any) {
  const { theme } = useTheme();

  return (
    <Box id="__root" direction="vertical" container="xl" className={theme}>
      {children}
    </Box>
  );
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

export const HeroLayout = memo(function HeroLayout({ src }: any) {
  return (
    <StyledHeroLayout>
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
  const { asPath } = useRouter();

  return (
    <>
      <Head>
        <PageSEO path={asPath} />
      </Head>

      <Box
        direction="vertical"
        spacingHorizontal={{ "@initial": 2, "@bp2": 4 }}
        container="l"
        flexGrow
        css={{ overflowX: "hidden" }}
      >
        <HeaderLayout />

        <Box as="main" direction="vertical" spacingVertical={6} flexGrow>
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
}: any) {
  return (
    <>
      <Head>
        <BlogSEO frontmatter={frontmatter} />
      </Head>

      <Box
        direction="vertical"
        spacingHorizontal={{ "@initial": 2, "@bp2": 4 }}
        container="l"
      >
        <HeaderLayout />

        <Box direction="vertical">
          <Link href="/blog" variant="secondary">
            <Box
              alignItems="center"
              spacingBottom={{ "@initial": 4, "@bp2": 7 }}
              gap={2}
            >
              <ArrowLeftIcon
                width={ICON_SIZE.m}
                height={ICON_SIZE.m}
                aria-hidden
              />
              <TextHeadline>Back to blog overview</TextHeadline>
            </Box>
          </Link>

          <HeroLayout src={frontmatter.cover} />

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
