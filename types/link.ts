import { AnchorHTMLAttributes } from "react";
import { LinkProps as NextLinkProps } from "next/link";
import { UrlObject } from "url";

export type LinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  href: string | UrlObject;
  nextLinkProps?: Omit<NextLinkProps, "href">;
  variant?: "primary" | "secondary" | "tertiary";
};
