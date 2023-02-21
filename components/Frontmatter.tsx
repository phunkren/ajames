import { memo } from "react";
import {
  AvatarIcon,
  BellIcon,
  CalendarIcon,
  ClockIcon,
  EyeOpenIcon,
  MixIcon,
  Pencil2Icon,
  VideoIcon,
} from "@radix-ui/react-icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Tag } from "../types/notion";
import { formatLongDate } from "../util/date";
import { ICON_SIZE } from "../util/images";
import { formatNumber } from "../util/number";
import { formatReadingTime } from "../util/posts";
import { Box } from "./Box";
import { TextAux, TextBody } from "./Text";
import { StyledTag } from "./Tags";

type PostTagProps = {
  as?: string;
  tags: Tag[];
  icon?: boolean;
};

type ActiveTagsProps = {
  tags: Tag[];
  queryTag: string;
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

export const FrontmatterItem = memo(function FrontmatterItem({
  compact,
  css,
  ...props
}: any) {
  return (
    <Box
      as="li"
      gap={compact ? 4 : 6}
      alignItems="center"
      css={{ minHeight: 32, ...css }}
      {...props}
    />
  );
});

export const PostTags = memo(function PostTags({
  tags,
  icon = false,
  ...props
}: PostTagProps) {
  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false} alignItems="flex-start">
          <VisuallyHidden.Root>Tags</VisuallyHidden.Root>
          <MixIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}

      <Box as="ul" role="list" gap={4} flexWrap="wrap">
        {tags.map((tag) => {
          return (
            <StyledTag as="li" key={tag.id} borderColor={tag.color}>
              <TextAux>{tag.name}</TextAux>
            </StyledTag>
          );
        })}
      </Box>
    </FrontmatterItem>
  );
});

export const ActiveTag = memo(function ActiveTag({
  tags,
  queryTag,
  icon = false,
  ...props
}: ActiveTagsProps) {
  const activeTag = tags.find((tag) => queryTag === tag.name);

  return (
    <FrontmatterItem
      alignItems="center"
      css={{ "@bp3": { maxWidth: 400 } }}
      {...props}
    >
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Tags</VisuallyHidden.Root>
          <EyeOpenIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}

      {activeTag ? (
        <StyledTag borderColor={activeTag.color} active>
          <TextAux>{activeTag.name}</TextAux>
        </StyledTag>
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
  const formattedDate = formatLongDate(dateObject);

  if (compact) {
    return (
      <FrontmatterItem compact {...props}>
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
          <BellIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
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

export const YoutubeChannel = memo(function TotalCategories({
  channel,
  icon = false,
  compact = false,
  ...props
}: any) {
  if (compact) {
    return (
      <FrontmatterItem compact {...props}>
        {icon ? (
          <Box flexShrink={false}>
            <VisuallyHidden.Root>YouTube Channel</VisuallyHidden.Root>
            <AvatarIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
          </Box>
        ) : null}

        <TextAux clamp={1} color="secondary">
          {channel}
        </TextAux>
      </FrontmatterItem>
    );
  }
  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>YouTube Channel</VisuallyHidden.Root>
          <AvatarIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextBody color="secondary">{channel}</TextBody>
    </FrontmatterItem>
  );
});
