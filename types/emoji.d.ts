import { ComponentProps } from "react";
import { StyledEmoji } from "../components/Text";

export type EmojiProps = ComponentProps<StyledEmoji> & {
  emoji: string;
};
