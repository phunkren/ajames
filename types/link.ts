import { ComponentProps } from "react";
import { LinkProps as NextLinkProps } from "next/link";
import { CSS } from "../stitches.config";
import {
  Link,
  StyledIconLink,
  StyledLink,
  StyledRssSubscription,
  StyledYoutubeSubscription,
} from "../components/Link";
import { UrlObject } from "url";

export type LinkProps = Omit<ComponentProps<typeof StyledLink>, "href"> &
  CSS & {
    href: string | UrlObject;
    nextLinkProps?: Omit<NextLinkProps, "href">;
  };

export type MarkdownLinkProps = LinkProps & {
  node?: Record<string, Record<string, string>[]>;
};

export type TwitterLinkProps = ComponentProps<
  typeof StyledIconLink | typeof Link
> &
  CSS & {
    url: string;
    text: string;
    emoji?: string;
    variant?: "default" | "icon";
  };

export type YoutubeLinkProps = ComponentProps<
  typeof StyledYoutubeSubscription
> &
  CSS & {
    type?: "link" | "icon" | "button";
  };

export type RssLinkProps = ComponentProps<typeof StyledRssSubscription> &
  CSS & {
    type?: "link" | "icon" | "button";
  };
