import {
  AvatarIcon,
  CalendarIcon,
  ClockIcon,
  EyeOpenIcon,
  ListBulletIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/router";
import { styled } from "../stitches.config";
import { NOTION_TAG_VARIANTS } from "../styles/tag";
import { Tag } from "../types/notion";
import { formatShortDate } from "../util/date";
import { formatReadingTime } from "../util/posts";
import { Box } from "./Layout";
import { TextAux } from "./Text";

type PostTagProps = {
  tags: Tag[];
  icon?: boolean;
};

const StyledTag = styled(Box, {
  padding: "0 $2",
  borderRadius: 4,
  borderStyle: "solid",
  borderWidth: 1,
  textTransform: "uppercase",
  color: "$foregroundMuted",

  variants: {
    ...NOTION_TAG_VARIANTS,
  },
});

const StyledBox = styled(Box, {
  color: "$foregroundMuted",
});

export function PostTags({ tags, icon = false, ...props }: PostTagProps) {
  const { query } = useRouter();

  return (
    <StyledBox gap={4} {...props}>
      {icon ? (
        <Box spacingTop={1} alignItems="flex-start" justify-content="center">
          <VisuallyHidden.Root>Tags</VisuallyHidden.Root>
          <ListBulletIcon width={24} height={24} />
        </Box>
      ) : null}

      <Box as="ul" role="list" gap={4} flexWrap="wrap">
        {tags.map((tag) => (
          <StyledTag
            as="li"
            key={tag.id}
            borderColor={tag.color}
            active={!query.tag || query.tag === tag.name.toLowerCase()}
          >
            <TextAux css={{ color: "inherit" }}>{tag.name}</TextAux>
          </StyledTag>
        ))}
      </Box>
    </StyledBox>
  );
}

export function PublishDate({ date, icon = false, ...props }) {
  const dateObject = new Date(date);
  const formattedDate = formatShortDate(dateObject);

  return (
    <StyledBox alignItems="center" gap={4} {...props}>
      {icon ? <CalendarIcon width={24} height={24} /> : null}
      <TextAux as="time" dateTime={dateObject.toISOString()}>
        {formattedDate}
      </TextAux>
    </StyledBox>
  );
}

export function ReadingTime({ time, icon = false, ...props }) {
  const formattedTime = formatReadingTime(time);

  return (
    <StyledBox alignItems="center" gap={4} {...props}>
      {icon ? <ClockIcon width={24} height={24} /> : null}
      <TextAux>{formattedTime}</TextAux>
    </StyledBox>
  );
}

export function SubscriberCount({ subscribers, icon = false, ...props }) {
  const formattedSubscribers = `${subscribers} subscribers`;

  return (
    <StyledBox alignItems="center" gap={4} {...props}>
      {icon ? <AvatarIcon width={24} height={24} /> : null}
      <TextAux>{formattedSubscribers}</TextAux>
    </StyledBox>
  );
}

export function VideosViewsCount({ views, icon = false, ...props }) {
  const formattedViews = `${views} total views`;

  return (
    <StyledBox alignItems="center" gap={4} {...props}>
      {icon ? <EyeOpenIcon width={24} height={24} /> : null}
      <TextAux>{formattedViews}</TextAux>
    </StyledBox>
  );
}

export function VideosTotalCount({ total, icon = false, ...props }) {
  const formattedTotal = `${total} videos`;

  return (
    <StyledBox alignItems="center" gap={4} {...props}>
      {icon ? <VideoIcon width={24} height={24} /> : null}
      <TextAux>{formattedTotal}</TextAux>
    </StyledBox>
  );
}
