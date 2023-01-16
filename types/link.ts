import { AnchorHTMLAttributes } from "react";
import { LinkProps as NextLinkProps } from "next/link";
import { UrlObject } from "url";
import { CSS } from "../stitches.config";

export type LinkProps = CSS &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string | UrlObject;
    nextLinkProps?: Omit<NextLinkProps, "href">;
    variant?: "primary" | "secondary";
  };
