import { CalendarIcon, ClockIcon, ListBulletIcon } from "@radix-ui/react-icons";
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
