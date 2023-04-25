import Head from "next/head";
import { useRouter } from "next/router";
import { memo } from "react";
import { useTheme } from "../hooks/useTheme";
import { Frontmatter } from "../pages/writing/[id]";
import { PERSONAL, SITE, SOCIAL } from "../util/data";

type BlogSeoProps = {
  frontmatter: Frontmatter;
};

export const PageSeo = memo(function PageSeo() {
  const { themeName, themeColor } = useTheme();
  const metaImage = `${SITE.url}/images/banner.png`;
  const metaDescription = `${PERSONAL.description}`;
  const metaKeywords = PERSONAL.keywords.join(",");
  const metaTitle = `${PERSONAL.name} | ${PERSONAL.occupation}`;

  return (
    <Head>
      <title key="title">{metaTitle}</title>
      <meta key="description" name="description" content={metaDescription} />
      <meta key="author" name="author" content={PERSONAL.name} />
      <meta key="keywords" name="keywords" content={metaKeywords} />
      <meta key="image" name="image" content={metaImage} />

      {/* Twitter */}
      <meta key="twitter:card" name="twitter:card" content="summary" />
      <meta key="twitter:image" name="twitter:image" content={metaImage} />
      <meta key="twitter:title" name="twitter:title" content={metaTitle} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={metaDescription}
      />
      <meta
        key="twitter:site"
        name="twitter:site"
        content={SOCIAL.twitter.handle}
      />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={SOCIAL.twitter.handle}
      />

      {/* OG */}
      <meta key="og:locale" name="og:locale" content="en_GB" />
      <meta key="og:type" name="og:type" content="website" />
      <meta key="og:url" name="og:url" content={SITE.url} />
      <meta key="og:title" name="og:title" content={metaTitle} />
      <meta key="og:image" name="og:image" content={metaImage} />
      <meta
        key="og:description"
        name="og:description"
        content={metaDescription}
      />

      <meta key="robots" name="robots" content="index,follow" />
      <meta key="generator" name="generator" content="Next.js" />
      <meta key="charset" charSet="utf-8" />
      <meta key="theme-color" name="theme-color" content={themeColor} />
      <meta key="color-scheme" name="color-scheme" content={themeName} />
    </Head>
  );
});

export const BlogSeo = memo(function BlogSeo({ frontmatter }: BlogSeoProps) {
  const { asPath } = useRouter();
  const { themeName, themeColor } = useTheme();
  const metaUrl = asPath ? `${SITE.url}${asPath}` : SITE.url;
  const metaTitle = `${frontmatter.emoji} ${frontmatter.title} | ${SITE.displayName}`;
  const keywords = frontmatter.tags.map((tag) => tag.name).join(",");

  return (
    <Head>
      <title key="title">{metaTitle}</title>

      <link key="canonical" rel="canonical" href={frontmatter.canonical} />
      <meta key="keywords" name="keywords" content={keywords} />
      <meta key="image" name="image" content={frontmatter.cover} />

      {/* Twitter */}
      <meta key="twitter:card" name="twitter:card" content="summary" />
      <meta
        key="twitter:image"
        name="twitter:image"
        content={frontmatter.cover}
      />
      <meta key="twitter:title" name="twitter:title" content={metaTitle} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={frontmatter.description}
      />
      <meta
        key="twitter:site"
        name="twitter:site"
        content={SOCIAL.twitter.handle}
      />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={SOCIAL.twitter.handle}
      />
      <meta
        key="description"
        name="description"
        content={frontmatter.description}
      />

      {/* OG */}
      <meta key="og:locale" name="og:locale" content="en_GB" />
      <meta key="og:type" name="og:type" content="article" />
      <meta key="og:url" name="og:url" content={metaUrl} />
      <meta key="og:title" name="og:title" content={metaTitle} />
      <meta key="og:image" name="og:image" content={frontmatter.cover} />
      <meta
        key="og:description"
        name="og:description"
        content={frontmatter.description}
      />

      <meta key="robots" name="robots" content="index,follow" />
      <meta key="generator" name="generator" content="Next.js" />
      <meta key="charset" charSet="utf-8" />
      <meta key="theme-color" name="theme-color" content={themeColor} />
      <meta key="color-scheme" name="color-scheme" content={themeName} />
    </Head>
  );
});
