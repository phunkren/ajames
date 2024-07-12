import { memo } from "react";
import {
  AvatarIcon,
  BellIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  CalendarIcon,
  ClockIcon,
  EyeOpenIcon,
  GlobeIcon,
  HeartIcon,
  LaptopIcon,
  MixIcon,
  Pencil2Icon,
  PersonIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { formatLongDate } from "../util/date";
import { ICON_SIZE } from "../util/images";
import { formatNumber } from "../util/number";
import { formatReadingTime, Tag } from "../util/notion";
import { Box, BoxProps } from "./Box";
import { TextAux, TextHeadline } from "./Text";
import { StyledTag } from "./Tags";
import { PERSONAL } from "../util/data";
import { Button } from "./Button";

type FrontMatterItemProps = BoxProps & {
  compact?: boolean;
  icon?: boolean;
};

type PostTagProps = FrontMatterItemProps & {
  tags: Tag[];
  onTagChange?: (tagName: string) => void;
};

type PublishDateProps = FrontMatterItemProps & {
  date: string;
};

type ActiveTagsProps = FrontMatterItemProps & {
  tags: Tag[];
  queryTag: string;
};

type ReadingTimeProps = FrontMatterItemProps & {
  time: number;
};

type TotalProps = FrontMatterItemProps & {
  filtered?: number;
  total: number;
};

type YoutubeChannelProps = FrontMatterItemProps & {
  channel: string;
};

type RetailerProps = FrontMatterItemProps & {
  name: string;
};

export const Frontmatter = memo(function Frontmatter(props: BoxProps) {
  return (
    <Box
      as="ul"
      role="list"
      direction="vertical"
      gap={{ "@initial": 2, "@bp2": 4 }}
      css={{ color: "$foregroundMuted" }}
      {...props}
    />
  );
});

export const FrontmatterItem = memo(function FrontmatterItem({
  compact,
  css,
  ...props
}: FrontMatterItemProps) {
  return (
    <Box
      as="li"
      gap={compact ? 2 : 6}
      alignItems="center"
      css={{ minHeight: 32, ...css }}
      {...props}
    />
  );
});

export const PostTags = memo(function PostTags({
  tags,
  icon = false,
  compact = false,
  mono = false,
  end = false,
  onTagChange,
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

      <Box
        as="ul"
        role="list"
        gap={4}
        flexWrap="wrap"
        justifyContent={end ? "flex-end" : "flex-start"}
      >
        {tags.map((tag) => {
          return onTagChange ? (
            <li key={tag.id}>
              <StyledTag
                as={Button}
                borderColor={!mono ? tag.color : undefined}
                compact={compact}
                onClick={() => onTagChange(tag.name)}
              >
                <TextAux>{tag.name}</TextAux>
              </StyledTag>
            </li>
          ) : (
            <StyledTag
              as="li"
              key={tag.id}
              borderColor={!mono ? tag.color : undefined}
              compact={compact}
            >
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
        <StyledTag borderColor={activeTag.color} active compact>
          <TextAux>{activeTag.name}</TextAux>
        </StyledTag>
      ) : (
        <TextHeadline textTransform="capitalize">All</TextHeadline>
      )}
    </FrontmatterItem>
  );
});

export const PublishDate = memo(function PublishDate({
  date,
  icon = false,
  compact = false,
  ...props
}: PublishDateProps) {
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

      <TextHeadline
        as="time"
        dateTime={dateObject.toISOString()}
        color="secondary"
      >
        {formattedDate}
      </TextHeadline>
    </FrontmatterItem>
  );
});

export const ReadingTime = memo(function ReadingTime({
  time,
  icon = false,
  ...props
}: ReadingTimeProps) {
  const formattedTime = formatReadingTime(time);

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Reading Time</VisuallyHidden.Root>
          <ClockIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextHeadline textTransform="capitalize">{formattedTime}</TextHeadline>
    </FrontmatterItem>
  );
});

export const SubscriberCount = memo(function SubscriberCount({
  total,
  icon = false,
  ...props
}: TotalProps) {
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
      <TextHeadline textTransform="capitalize">
        {formattedSubscribers}
      </TextHeadline>
    </FrontmatterItem>
  );
});

export const VideosViewsCount = memo(function VideosViewsCount({
  total,
  icon = false,
  ...props
}: TotalProps) {
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
      <TextHeadline textTransform="capitalize">{formattedViews}</TextHeadline>
    </FrontmatterItem>
  );
});

export const VideosTotalCount = memo(function VideosTotalCount({
  total,
  icon = false,
  ...props
}: TotalProps) {
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
      <TextHeadline textTransform="capitalize">{formattedTotal}</TextHeadline>
    </FrontmatterItem>
  );
});

export const TotalPosts = memo(function TotalPosts({
  filtered,
  total,
  icon = false,
  ...props
}: TotalProps) {
  const formattedFiltered = formatNumber(total);
  const formattedTotal = formatNumber(total);
  const formattedValue =
    filtered && formattedFiltered !== formattedTotal
      ? `${formattedFiltered}/${formattedTotal} articles`
      : `${formattedTotal} articles`;

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Total Posts</VisuallyHidden.Root>
          <Pencil2Icon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextHeadline textTransform="capitalize">{formattedValue}</TextHeadline>
    </FrontmatterItem>
  );
});

export const TotalCategories = memo(function TotalCategories({
  total,
  icon = false,
  ...props
}: TotalProps) {
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
      <TextHeadline textTransform="capitalize">{formattedTotal}</TextHeadline>
    </FrontmatterItem>
  );
});

export const YoutubeChannel = memo(function TotalCategories({
  channel,
  icon = false,
  compact = false,
  ...props
}: YoutubeChannelProps) {
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
      <TextHeadline color="secondary">{channel}</TextHeadline>
    </FrontmatterItem>
  );
});

export const Name = memo(function Name({ icon = false, ...props }: TotalProps) {
  const formattedName = PERSONAL.name;

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Location</VisuallyHidden.Root>
          <PersonIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextHeadline textTransform="capitalize">{formattedName}</TextHeadline>
    </FrontmatterItem>
  );
});

export const Location = memo(function Location({
  icon = false,
  ...props
}: TotalProps) {
  const formattedLocation = PERSONAL.location;

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Location</VisuallyHidden.Root>
          <GlobeIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextHeadline textTransform="capitalize">
        {formattedLocation}
      </TextHeadline>
    </FrontmatterItem>
  );
});

export const Occupation = memo(function Occupation({
  total,
  icon = false,
  ...props
}: TotalProps) {
  const formattedOccupation = PERSONAL.occupation;

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Occupation</VisuallyHidden.Root>
          <LaptopIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextHeadline textTransform="capitalize">
        {formattedOccupation}
      </TextHeadline>
    </FrontmatterItem>
  );
});

export const Retailer = memo(function Retailer({
  name,
  icon = false,
  compact = false,
  ...props
}: RetailerProps) {
  if (compact) {
    return (
      <FrontmatterItem compact {...props}>
        {icon ? (
          <Box flexShrink={false}>
            <VisuallyHidden.Root>Bookmark</VisuallyHidden.Root>
            <BookmarkFilledIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
          </Box>
        ) : null}

        <TextAux clamp={1} color="secondary">
          {name}
        </TextAux>
      </FrontmatterItem>
    );
  }

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Bookmark</VisuallyHidden.Root>
          <BookmarkFilledIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
        </Box>
      ) : null}

      <TextHeadline textTransform="capitalize">{name}</TextHeadline>
    </FrontmatterItem>
  );
});

export const InventoryCount = memo(function VideosViewsCount({
  total,
  icon = false,
  ...props
}: TotalProps) {
  const formattedNumber = formatNumber(total);
  const formattedItems = `${formattedNumber} items*`;

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Heart</VisuallyHidden.Root>
          <HeartIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextHeadline textTransform="capitalize">{formattedItems}</TextHeadline>
    </FrontmatterItem>
  );
});

export const RetailerCount = memo(function RetailerCount({
  total,
  icon = false,
  ...props
}: TotalProps) {
  const formattedNumber = formatNumber(total);
  const formattedItems = `${formattedNumber} retailers`;

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box flexShrink={false}>
          <VisuallyHidden.Root>Bookmarks</VisuallyHidden.Root>
          <BookmarkFilledIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}
      <TextHeadline textTransform="capitalize">{formattedItems}</TextHeadline>
    </FrontmatterItem>
  );
});
