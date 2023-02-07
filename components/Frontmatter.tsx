import { memo } from "react";
import { useRouter } from "next/router";
import {
  AvatarIcon,
  CalendarIcon,
  ClockIcon,
  EyeOpenIcon,
  ListBulletIcon,
  MixIcon,
  Pencil2Icon,
  VideoIcon,
} from "@radix-ui/react-icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Tag } from "../types/notion";
import { formatShortDate } from "../util/date";
import { ICON_SIZE } from "../util/images";
import { formatNumber } from "../util/number";
import { formatReadingTime, getQueryTags } from "../util/posts";
import { Box } from "./Box";
import { TextAux, TextBody } from "./Text";
import { StyledTag } from "./Tags";

type PostTagProps = {
  as?: string;
  active?: boolean;
  tags: Tag[];
  icon?: boolean;
};

type ActiveTagsProps = {
  tags: Tag[];
  queryTags: string[];
  icon?: boolean;
};

export const Frontmatter = memo(function Frontmatter(props: any) {
  return (
    <Box
      as="ul"
      role="list"
      direction="vertical"
      gap={4}
      css={{ color: "$foregroundMuted" }}
      {...props}
    />
  );
});

export const FrontmatterItem = memo(function FrontmatterItem(props: any) {
  return <Box as="li" gap={6} alignItems="center" {...props} />;
});

export const PostTags = memo(function PostTags({
  tags,
  active,
  icon = false,
  ...props
}: PostTagProps) {
  const { query } = useRouter();
  const queryTags = getQueryTags(query);

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Tags</VisuallyHidden.Root>
          <ListBulletIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}

      <Box as="ul" role="list" gap={4} flexWrap="wrap">
        {tags.map((tag) => {
          const isActive =
            !queryTags.length || queryTags.includes(tag.name.toLowerCase());

          return (
            <StyledTag
              as="li"
              key={tag.id}
              borderColor={tag.color}
              active={isActive}
            >
              <TextAux>{tag.name}</TextAux>
            </StyledTag>
          );
        })}
      </Box>
    </FrontmatterItem>
  );
});

export const ActiveTags = memo(function ActiveTags({
  tags,
  queryTags,
  icon = false,
  ...props
}: ActiveTagsProps) {
  const activeTags = tags.filter((tag) => queryTags.includes(tag.name));

  return (
    <FrontmatterItem
      alignItems="flex-start"
      css={{ "@bp3": { maxWidth: 400 } }}
      {...props}
    >
      {icon ? (
        <Box flexShrink={false} css={{ height: 32 }} alignItems="center">
          <VisuallyHidden.Root>Tags</VisuallyHidden.Root>
          <EyeOpenIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}

      {activeTags.length ? (
        <Box as="ul" role="list" gap={2} flexWrap="wrap">
          {activeTags.map((tag) => (
            <StyledTag
              as="li"
              key={tag.id}
              borderColor={tag.color}
              css={{ margin: "$1 0" }}
              active
            >
              <TextAux>{tag.name}</TextAux>
            </StyledTag>
          ))}
        </Box>
      ) : (
        <TextBody textTransform="capitalize">All</TextBody>
      )}
    </FrontmatterItem>
  );
});

export const PublishDate = memo(function PublishDate({
  date,
  icon = false,
  compact = false,
  ...props
}: any) {
  const dateObject = new Date(date);
  const formattedDate = formatShortDate(dateObject);

  if (compact) {
    return (
      <FrontmatterItem {...props}>
        {icon ? (
          <Box flexShrink={false}>
            <VisuallyHidden.Root>Publish Date</VisuallyHidden.Root>
            <CalendarIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
          </Box>
        ) : null}

        <TextAux
          as="time"
          dateTime={dateObject.toISOString()}
          color="secondary"
        >
          {formattedDate}
        </TextAux>
      </FrontmatterItem>
    );
  }

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Publish Date</VisuallyHidden.Root>
          <CalendarIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}

      <TextBody as="time" dateTime={dateObject.toISOString()} color="secondary">
        {formattedDate}
      </TextBody>
    </FrontmatterItem>
  );
});

export const ReadingTime = memo(function ReadingTime({
  time,
  icon = false,
  ...props
}: any) {
  const formattedTime = formatReadingTime(time);

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Reading Time</VisuallyHidden.Root>
          <ClockIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextBody textTransform="capitalize">{formattedTime}</TextBody>
    </FrontmatterItem>
  );
});

export const SubscriberCount = memo(function SubscriberCount({
  total,
  icon = false,
  ...props
}: any) {
  const formattedNumber = formatNumber(total);
  const formattedSubscribers = `${formattedNumber} subscribers`;

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Total Subscribers</VisuallyHidden.Root>
          <AvatarIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextBody textTransform="capitalize">{formattedSubscribers}</TextBody>
    </FrontmatterItem>
  );
});

export const VideosViewsCount = memo(function VideosViewsCount({
  total,
  icon = false,
  ...props
}: any) {
  const formattedNumber = formatNumber(total);
  const formattedViews = `${formattedNumber} total views`;

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Total Views</VisuallyHidden.Root>
          <EyeOpenIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextBody textTransform="capitalize">{formattedViews}</TextBody>
    </FrontmatterItem>
  );
});

export const VideosTotalCount = memo(function VideosTotalCount({
  total,
  icon = false,
  ...props
}: any) {
  const formattedNumber = formatNumber(total);
  const formattedTotal = `${formattedNumber} videos`;

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Total Videos</VisuallyHidden.Root>
          <VideoIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextBody textTransform="capitalize">{formattedTotal}</TextBody>
    </FrontmatterItem>
  );
});

export const TotalPosts = memo(function TotalPosts({
  total,
  icon = false,
  ...props
}: any) {
  const formattedNumber = formatNumber(total);
  const formattedTotal = `${formattedNumber} articles`;

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Total Posts</VisuallyHidden.Root>
          <Pencil2Icon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextBody textTransform="capitalize">{formattedTotal}</TextBody>
    </FrontmatterItem>
  );
});

export const TotalCategories = memo(function TotalCategories({
  total,
  icon = false,
  ...props
}: any) {
  const formattedNumber = formatNumber(total);
  const formattedTotal = `${formattedNumber} categories`;

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Total Categories</VisuallyHidden.Root>
          <MixIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextBody textTransform="capitalize">{formattedTotal}</TextBody>
    </FrontmatterItem>
  );
});
