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

type ActiveTagsProps = {
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

export function Frontmatter(props) {
  return (
    <Box
      as="ul"
      role="list"
      direction="vertical"
      gap={6}
      css={{ color: "$foregroundMuted" }}
      {...props}
    />
  );
}

export function FrontmatterItem(props) {
  return <Box as="li" gap={6} alignItems="center" {...props} />;
}

export function PostTags({ tags, icon = false, ...props }: PostTagProps) {
  const { query } = useRouter();
  const queryTags = getQueryTags(query);

  return (
    <FrontmatterItem {...props}>
      {icon ? (
        <Box alignItems="flex-start" justify-content="center">
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
    </FrontmatterItem>
  );
}

export function ActiveTags({
  tags,
  queryTags,
  icon = false,
  ...props
}: ActiveTagsProps) {
  const activeTags = tags.filter((tag) => queryTags.includes(tag.name));

  return (
    <FrontmatterItem>
      {icon ? (
        <Box alignItems="flex-start" justify-content="center">
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
        <TextHeadline textTransform="capitalize">All</TextHeadline>
      )}
    </FrontmatterItem>
  );
}

export function PublishDate({ date, icon = false, compact = false, ...props }) {
  const dateObject = new Date(date);
  const formattedDate = formatShortDate(dateObject);

  if (compact) {
    return (
      <FrontmatterItem>
        {icon ? (
          <CalendarIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
        ) : null}

        <TextAux as="time" dateTime={dateObject.toISOString()}>
          {formattedDate}
        </TextAux>
      </FrontmatterItem>
    );
  }

  return (
    <FrontmatterItem>
      {icon ? <CalendarIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}

      <TextHeadline as="time" dateTime={dateObject.toISOString()}>
        {formattedDate}
      </TextHeadline>
    </FrontmatterItem>
  );
}

export function ReadingTime({ time, icon = false, ...props }) {
  const formattedTime = formatReadingTime(time);

  return (
    <FrontmatterItem>
      {icon ? <ClockIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline textTransform="capitalize">{formattedTime}</TextHeadline>
    </FrontmatterItem>
  );
}

export function SubscriberCount({ subscribers, icon = false, ...props }) {
  const formattedNumber = formatNumber(subscribers);
  const formattedSubscribers = `${formattedNumber} subscribers`;

  return (
    <FrontmatterItem>
      {icon ? <AvatarIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline textTransform="capitalize">
        {formattedSubscribers}
      </TextHeadline>
    </FrontmatterItem>
  );
}

export function VideosViewsCount({ views, icon = false, ...props }) {
  const formattedNumber = formatNumber(views);
  const formattedViews = `${formattedNumber} total views`;

  return (
    <FrontmatterItem>
      {icon ? <EyeOpenIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline textTransform="capitalize">{formattedViews}</TextHeadline>
    </FrontmatterItem>
  );
}

export function VideosTotalCount({ total, icon = false, ...props }) {
  const formattedNumber = formatNumber(total);
  const formattedTotal = `${formattedNumber} videos`;

  return (
    <FrontmatterItem>
      {icon ? <VideoIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline textTransform="capitalize">{formattedTotal}</TextHeadline>
    </FrontmatterItem>
  );
}

export function TotalPosts({ total, icon = false, ...props }) {
  const formattedNumber = formatNumber(total);
  const formattedTotal = `${formattedNumber} articles`;

  return (
    <FrontmatterItem>
      {icon ? <Pencil2Icon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline textTransform="capitalize">{formattedTotal}</TextHeadline>
    </FrontmatterItem>
  );
}

export function TotalCategories({ total, icon = false, ...props }) {
  const formattedNumber = formatNumber(total);
  const formattedTotal = `${formattedNumber} categories`;

  return (
    <FrontmatterItem>
      {icon ? <MixIcon width={ICON_SIZE.l} height={ICON_SIZE.l} /> : null}
      <TextHeadline textTransform="capitalize">{formattedTotal}</TextHeadline>
    </FrontmatterItem>
  );
}
