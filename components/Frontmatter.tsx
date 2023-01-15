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
import { useRouter } from "next/router";
import { styled } from "../stitches.config";
import { NOTION_TAG_VARIANTS } from "../styles/tag";
import { Tag } from "../types/notion";
import { formatShortDate } from "../util/date";
import { ICON_SIZE } from "../util/images";
import { formatNumber } from "../util/number";
import { formatReadingTime, getQueryTags } from "../util/posts";
import { Box } from "./Layout";
import { TextAux, TextHeadline } from "./Text";

type PostTagProps = {
  tags: Tag[];
  icon?: boolean;
};

type PostActiveTagsProps = {
  tags: Tag[];
  queryTags: string[];
  icon?: boolean;
};

const StyledTag = styled(Box, {
  padding: "0 $2",
  borderRadius: 4,
  lineHeight: 1.2,
  borderStyle: "solid",
  borderWidth: 1,
  textTransform: "uppercase",
  color: "$foregroundMuted",

  variants: {
    ...NOTION_TAG_VARIANTS,
  },
});

export const StyledFilterTag = styled(StyledTag, {
  color: "$foreground",
  cursor: "pointer",
  padding: "$2",
  boxShadow: "$1",

  "&:hover": {
    background: "$foreground",
    color: "$background",
  },
});

export function PostTags({ tags, icon = false, ...props }: PostTagProps) {
  const { query } = useRouter();
  const queryTags = getQueryTags(query);

  return (
    <Box gap={6} {...props}>
      {icon ? (
        <Box
          alignItems="flex-start"
          justify-content="center"
          css={{ color: "$foregroundMuted" }}
        >
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
              <TextAux
                color={isActive ? "primary" : "secondary"}
                css={{ position: "relative", top: -2 }}
              >
                {tag.name}
              </TextAux>
            </StyledTag>
          );
        })}
      </Box>
    </Box>
  );
}

export function PostActiveTags({
  tags,
  queryTags,
  icon = false,
  ...props
}: PostActiveTagsProps) {
  const activeTags = tags.filter((tag) => queryTags.includes(tag.name));

  return (
    <Box gap={6} alignItems="center" {...props}>
      {icon ? (
        <Box
          alignItems="flex-start"
          justify-content="center"
          css={{ color: "$foregroundMuted" }}
        >
          <VisuallyHidden.Root>Tags</VisuallyHidden.Root>
          <EyeOpenIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
        </Box>
      ) : null}

      {activeTags.length ? (
        <Box as="ul" role="list" gap={4} flexWrap="wrap">
          {activeTags.map((tag) => (
            <StyledTag as="li" key={tag.id} borderColor={tag.color} active>
              <TextAux css={{ position: "relative", top: -2 }}>
                {tag.name}
              </TextAux>
            </StyledTag>
          ))}
        </Box>
      ) : (
        <TextHeadline color="secondary">All</TextHeadline>
      )}
    </Box>
  );
}

export function PublishDate({ date, icon = false, compact = false, ...props }) {
  const dateObject = new Date(date);
  const formattedDate = formatShortDate(dateObject);

  if (compact) {
    return (
      <Box
        alignItems="center"
        gap={4}
        css={{ color: "$foregroundMuted" }}
        {...props}
      >
        {icon ? (
          <CalendarIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
        ) : null}

        <TextAux
          as="time"
          dateTime={dateObject.toISOString()}
          color="secondary"
        >
          {formattedDate}
        </TextAux>
      </Box>
    );
  }

  return (
    <Box
      alignItems="center"
      gap={6}
      css={{ color: "$foregroundMuted" }}
      {...props}
    >
      {icon ? <CalendarIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}

      <TextHeadline as="time" dateTime={dateObject.toISOString()}>
        {formattedDate}
      </TextHeadline>
    </Box>
  );
}

export function ReadingTime({ time, icon = false, ...props }) {
  const formattedTime = formatReadingTime(time);

  return (
    <Box
      alignItems="center"
      gap={6}
      css={{ color: "$foregroundMuted" }}
      {...props}
    >
      {icon ? <ClockIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline>{formattedTime}</TextHeadline>
    </Box>
  );
}

export function SubscriberCount({ subscribers, icon = false, ...props }) {
  const formattedNumber = formatNumber(subscribers);
  const formattedSubscribers = `${formattedNumber} subscribers`;

  return (
    <Box
      alignItems="center"
      gap={6}
      css={{ color: "$foregroundMuted" }}
      {...props}
    >
      {icon ? <AvatarIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline textTransform="capitalize">
        {formattedSubscribers}
      </TextHeadline>
    </Box>
  );
}

export function VideosViewsCount({ views, icon = false, ...props }) {
  const formattedNumber = formatNumber(views);
  const formattedViews = `${formattedNumber} total views`;

  return (
    <Box
      alignItems="center"
      gap={6}
      css={{ color: "$foregroundMuted" }}
      {...props}
    >
      {icon ? <EyeOpenIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline textTransform="capitalize">{formattedViews}</TextHeadline>
    </Box>
  );
}

export function VideosTotalCount({ total, icon = false, ...props }) {
  const formattedNumber = formatNumber(total);
  const formattedTotal = `${formattedNumber} videos`;

  return (
    <Box
      alignItems="center"
      gap={6}
      css={{ color: "$foregroundMuted" }}
      {...props}
    >
      {icon ? <VideoIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline textTransform="capitalize">{formattedTotal}</TextHeadline>
    </Box>
  );
}

export function PostTotalCount({ total, icon = false, ...props }) {
  const formattedNumber = formatNumber(total);
  const formattedTotal = `${formattedNumber} articles`;

  return (
    <Box
      alignItems="center"
      gap={6}
      css={{ color: "$foregroundMuted" }}
      {...props}
    >
      {icon ? <Pencil2Icon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline color="secondary">{formattedTotal}</TextHeadline>
    </Box>
  );
}

export function PostCategoriesCount({ total, icon = false, ...props }) {
  const formattedNumber = formatNumber(total);
  const formattedTotal = `${formattedNumber} categories`;

  return (
    <Box
      alignItems="center"
      gap={6}
      css={{ color: "$foregroundMuted" }}
      {...props}
    >
      {icon ? <MixIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline color="secondary">{formattedTotal}</TextHeadline>
    </Box>
  );
}
