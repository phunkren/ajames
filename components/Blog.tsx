import { Children, ReactNode } from "react";
import Image from "next/image";
import { BlogPost } from "../types/notion";
import { Box } from "./Layout";
import { TextAux, TextBody, TextHeadline, TextTitle2 } from "./Text";
import { Link } from "./Link";
import { FALLBACK_IMAGE_DATA_URL } from "../constants/images";

type ContainerProps = {
  children: ReactNode;
};

type PreviewProps = {
  post: BlogPost;
};

export function Container({ children }: ContainerProps) {
  return (
    <Box direction="vertical" as="ul" role="list" gap={10}>
      {Children.map(children, (child, i) => (
        <li key={i}>{child}</li>
      ))}
    </Box>
  );
}

export function Preview({ post }: PreviewProps) {
  const { properties, cover } = post;
  const { date, page, published, slug, tags } = properties;

  function getCoverImage() {
    if (cover.type === "file") {
      console.log({ file: cover });
      return cover.file.url;
    }

    if (cover.type === "external") {
      console.log({ external: cover });
      return cover.external.url;
    }
  }

  const title = page.title[0].plain_text;
  const publishDate = date.date.start as string;
  const url = slug.rich_text[0].plain_text;
  const imageUrl = getCoverImage();
  const blogTags = tags.multi_select;
  const isPublished = Boolean(published.checkbox);

  if (!isPublished) {
    return null;
  }

  return (
    <Box direction="vertical">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="cover image"
          width={100}
          height={100}
          blurDataURL={FALLBACK_IMAGE_DATA_URL}
          placeholder="blur"
          priority
        />
      ) : (
        <Image
          src={FALLBACK_IMAGE_DATA_URL}
          alt="No image"
          width={100}
          height={100}
        />
      )}
      <TextTitle2>{title}</TextTitle2>

      <Box direction="horizontal" gap={2}>
        <TextBody>Published:</TextBody>
        <TextBody>{publishDate}</TextBody>
      </Box>

      {blogTags.length ? (
        <Box direction="horizontal" gap={2}>
          {blogTags.map((blogTag) => (
            <TextAux key={blogTag.id}>{blogTag.name}</TextAux>
          ))}
        </Box>
      ) : null}

      <Link href={`/blog/${url}`}>
        <TextHeadline>Read</TextHeadline>
      </Link>
    </Box>
  );
}
