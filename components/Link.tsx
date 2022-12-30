import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { UrlObject } from "url";
import { darkTheme, lightTheme, styled } from "../stitches.config";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string | UrlObject;
  nextLinkProps?: Omit<NextLinkProps, "href">;
  variant?: "primary" | "secondary";
};

const StyledLink = styled("a", {
  fontWeight: 500,
  letterSpacing: 0.2,

  variants: {
    variant: {
      primary: {
        [`${lightTheme.selector} &`]: {
          color: "$blue11",
        },

        [`${darkTheme.selector} &`]: {
          color: "$blue10",
        },
      },
      secondary: {
        textDecoration: "none",

        [`${lightTheme.selector} &`]: {
          color: "$gray11",
        },

        [`${darkTheme.selector} &`]: {
          color: "$white",
        },
      },
    },
  },
});

export function Link({ href, nextLinkProps, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref legacyBehavior {...nextLinkProps}>
      <StyledLink {...props} />
    </NextLink>
  );
}
