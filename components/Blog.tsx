import { Children, ReactNode } from "react";
import Image from "next/image";
import { BlogPost } from "../types/notion";
import { HStack, VStack } from "./Layout";
import { TextAux, TextBody, TextHeadline, TextTitle2 } from "./Text";
import { Link } from "./Link";
import { styled } from "../stitches.config";
import { FALLBACK_IMAGE_DATA_URL } from "../constants/images";

type ContainerProps = {
  children: ReactNode;
};

type PreviewProps = {
  post: any; // BlogPost;
};

export function Container({ children }: ContainerProps) {
  return (
    <VStack as="ul" role="list" gap={10}>
      {Children.map(children, (child, i) => (
        <li key={i}>{child}</li>
      ))}
    </VStack>
  );
}

export function Preview({ post }: PreviewProps) {
  const { properties, cover } = post;
  const { date, page, published, slug, tags } = properties;

  const title = page.title[0].plain_text;
  const publishDate = date.created_time;
  const url = slug.rich_text[0].plain_text;
  const imageUrl = cover?.file.url ?? "";
  const blogTags = tags.multi_select;
  const isPublished = Boolean(published.checkbox);

  if (!isPublished) {
    return null;
  }

  return (
    <VStack>
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
      <HStack gap={2}>
        <TextBody>Published:</TextBody>
        <TextBody>{publishDate}</TextBody>
      </HStack>

      {blogTags.length ? (
        <HStack gap={2}>
          {blogTags.map((blogTag) => (
            <TextAux>{blogTag.name}</TextAux>
          ))}
        </HStack>
      ) : null}
      <Link href={`/blog/${url}`}>Read </Link>
    </VStack>
  );
}
