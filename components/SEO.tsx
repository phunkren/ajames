import { useRouter } from "next/router";
import { memo } from "react";
import { useTheme } from "../hooks/useTheme";
import { PERSONAL, SITE, SOCIAL } from "../util/data";

export const RootSeo = memo(function RootSeo() {
  return (
    <>
      <meta name="robots" content="index,follow" />
      <meta name="generator" content="Next.js" />
    </>
  );
});

export const PageSEO = memo(function PageSEO({ path }) {
  const { themeName, themeColor } = useTheme();
  const metaUrl = path ? `${SITE.url}${path}` : SITE.url;
  const metaTitle = `${PERSONAL.name} | ${PERSONAL.occupation}`;
  const metaImage = `${SITE.url}/images/banner.png`;
  const metaDescription = `${PERSONAL.profile1}\n${PERSONAL.profile2}`;
  const metaKeywords = PERSONAL.keywords.join(",");

  return (
    <>
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
    </>
  );
});

export const BlogSEO = memo(function BlogSEO({ frontmatter, path }) {
  const { themeName, themeColor } = useTheme();
  const metaUrl = path ? `${SITE.url}${path}` : SITE.url;
  const keywords = frontmatter.tags.map((tag) => tag.name).join(",");

  return (
    <>
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
    </>
  );
});
