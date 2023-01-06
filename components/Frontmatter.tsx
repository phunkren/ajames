import {
  AvatarIcon,
  CalendarIcon,
  ClockIcon,
  EyeOpenIcon,
  ListBulletIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { formatReadingTime } from "../helpers/posts";
import { styled } from "../stitches.config";
import { Box } from "./Layout";
import { TextAux } from "./Text";

const StyledTag = styled(Box, {
  spacingHorizontal: "$2",
  borderRadius: 4,
  border: "1px solid",
});

export function PostTags({ tags, icon = false, ...props }) {
  return (
    <Box as="ul" role="list" alignItems="center" gap={4} {...props}>
      {icon ? <ListBulletIcon width={22} height={22} /> : null}

      {tags.map((tag) => (
        <StyledTag as="li" key={tag.id} css={{ borderColor: tag.color }}>
          <TextAux>{tag.name}</TextAux>
        </StyledTag>
      ))}
    </Box>
  );
}

export function PublishDate({ date, icon = false, ...props }) {
  const formattedDate = date;

  return (
    <Box alignItems="center" gap={3} {...props}>
      {icon ? <CalendarIcon width={22} height={22} /> : null}
      <TextAux as="time" dateTime={date}>
        {formattedDate}
      </TextAux>
    </Box>
  );
}

export function ReadingTime({ time, icon = false, ...props }) {
  const formattedTime = formatReadingTime(time);

  return (
    <Box alignItems="center" gap={3} {...props}>
      {icon ? <ClockIcon width={22} height={22} /> : null}
      <TextAux>{formattedTime}</TextAux>
    </Box>
  );
}

export function SubscriberCount({ subscribers, icon = false, ...props }) {
  const formattedSubscribers = `${subscribers} subscribers`;

  return (
    <Box alignItems="center" gap={3} {...props}>
      {icon ? <AvatarIcon width={22} height={22} /> : null}
      <TextAux>{formattedSubscribers}</TextAux>
    </Box>
  );
}

export function VideosViewsCount({ views, icon = false, ...props }) {
  const formattedViews = `${views} total views`;

  return (
    <Box alignItems="center" gap={3} {...props}>
      {icon ? <EyeOpenIcon width={22} height={22} /> : null}
      <TextAux>{formattedViews}</TextAux>
    </Box>
  );
}

export function VideosTotalCount({ total, icon = false, ...props }) {
  const formattedTotal = `${total} videos`;

  return (
    <Box alignItems="center" gap={3} {...props}>
      {icon ? <VideoIcon width={22} height={22} /> : null}
      <TextAux>{formattedTotal}</TextAux>
    </Box>
  );
}
