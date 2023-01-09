import {
  AvatarIcon,
  CalendarIcon,
  ClockIcon,
  EyeOpenIcon,
  ListBulletIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
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

  variants: {
    ...NOTION_TAG_VARIANTS,
  },
});

export function PostTags({ tags, icon = false, ...props }: PostTagProps) {
  const { query } = useRouter();

  return (
    <Box alignItems="center" gap={4} {...props}>
      {icon ? <ListBulletIcon width={24} height={24} /> : null}

      <Box as="ul" role="list" gap={4}>
        {tags.map((tag) => (
          <StyledTag
            as="li"
            key={tag.id}
            borderColor={tag.color}
            active={query?.tag === tag.name}
          >
            <TextAux>{tag.name}</TextAux>
          </StyledTag>
        ))}
      </Box>
    </Box>
  );
}

export function PublishDate({ date, icon = false, ...props }) {
  const dateObject = new Date(date);
  const formattedDate = formatShortDate(dateObject);

  return (
    <Box alignItems="center" gap={4} {...props}>
      {icon ? <CalendarIcon width={24} height={24} /> : null}
      <TextAux as="time" dateTime={dateObject}>
        {formattedDate}
      </TextAux>
    </Box>
  );
}

export function ReadingTime({ time, icon = false, ...props }) {
  const formattedTime = formatReadingTime(time);

  return (
    <Box alignItems="center" gap={4} {...props}>
      {icon ? <ClockIcon width={24} height={24} /> : null}
      <TextAux>{formattedTime}</TextAux>
    </Box>
  );
}

export function SubscriberCount({ subscribers, icon = false, ...props }) {
  const formattedSubscribers = `${subscribers} subscribers`;

  return (
    <Box alignItems="center" gap={4} {...props}>
      {icon ? <AvatarIcon width={24} height={24} /> : null}
      <TextAux>{formattedSubscribers}</TextAux>
    </Box>
  );
}

export function VideosViewsCount({ views, icon = false, ...props }) {
  const formattedViews = `${views} total views`;

  return (
    <Box alignItems="center" gap={4} {...props}>
      {icon ? <EyeOpenIcon width={24} height={24} /> : null}
      <TextAux>{formattedViews}</TextAux>
    </Box>
  );
}

export function VideosTotalCount({ total, icon = false, ...props }) {
  const formattedTotal = `${total} videos`;

  return (
    <Box alignItems="center" gap={4} {...props}>
      {icon ? <VideoIcon width={24} height={24} /> : null}
      <TextAux>{formattedTotal}</TextAux>
    </Box>
  );
}
