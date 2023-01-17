import { memo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useTheme } from "../hooks/useTheme";
import { styled } from "../stitches.config";
import { BLUR_DATA_URL, ICON_SIZE } from "../util/images";
import { PERSONAL, SITE, SOCIAL } from "../util/data";
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

const StyledBox = styled("div", {
  display: "flex",
  flexDirection: "row",

  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS, ...DISPLAY_VARIANTS },
});

export const Box = memo(function Box(props) {
  return <StyledBox {...props} />;
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

export const ActionButtons = memo(function ActionButtons(props) {
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

export const RootLayout = memo(function RootLayout({ children }) {
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
      spacingHorizontal={4}
      gap={{ "@initial": 4, "@bp2": 7 }}
      justifyContent="space-between"
      alignItems="center"
      css={{ "@print": { display: "none" } }}
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

export const Layout = memo(function Layout({ children }) {
  const router = useRouter();
  const { themeName, themeColor } = useTheme();
  const metaUrl = `${SITE.url}${router.asPath}`;
  const metaTitle = `${PERSONAL.name} | ${PERSONAL.occupation}`;
  const metaImage = `${SITE.url}/images/banner.png`;
  const metaDescription = `${PERSONAL.profile1}\n${PERSONAL.profile2}`;
  const metaKeywords = PERSONAL.keywords.join(",");

  return (
    <>
      <Head>
        <title>{metaTitle}</title>

        <link rel="canonical" href={metaUrl} />

        <meta name="description" content={metaDescription} />
        <meta name="author" content={PERSONAL.name} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="image" content={metaImage} />
        <meta name="theme-color" content={themeColor} />
        <meta name="color-scheme" content={themeName} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={SOCIAL.twitter.handle} />
        <meta name="twitter:creator" content={SOCIAL.twitter.handle} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />

        {/* OG */}
        <meta name="og:locale" content="en_GB" />
        <meta name="og:type" content="website" />
        <meta name="og:url" content={metaUrl} />
        <meta name="og:title" content={metaTitle} />
        <meta name="og:description" content={metaDescription} />
        <meta name="og:image" content={metaImage} />
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

export const BlogLayout = memo(function BlogLayout({ frontmatter, children }) {
  const router = useRouter();
  const { themeName, themeColor } = useTheme();
  const metaUrl = `${SITE.url}${router.asPath}`;
  const keywords = frontmatter.tags.map((tag) => tag.name).join(",");

  return (
    <>
      <Head>
        <title>
          {frontmatter.emoji} {frontmatter.title}
        </title>

        <link rel="canonical" href={frontmatter.canonical} />

        <meta name="description" content={frontmatter.description} />
        <meta name="author" content={PERSONAL.name} />
        <meta name="keywords" content={keywords} />
        <meta name="image" content={frontmatter.cover} />
        <meta name="theme-color" content={themeColor} />
        <meta name="color-scheme" content={themeName} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={SOCIAL.twitter.handle} />
        <meta name="twitter:creator" content={SOCIAL.twitter.handle} />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description} />
        <meta name="twitter:image" content={frontmatter.cover} />

        {/* OG */}
        <meta name="og:locale" content="en_GB" />
        <meta name="og:type" content="article" />
        <meta name="og:url" content={metaUrl} />
        <meta name="og:title" content={frontmatter.title} />
        <meta name="og:description" content={frontmatter.description} />
        <meta name="og:image" content={frontmatter.cover} />
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
