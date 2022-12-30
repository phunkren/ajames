import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";
import { darkTheme, lightTheme, styled } from "../stitches.config";

type LinkProps = NextLinkProps & {
  children: ReactNode;
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

export function Link({ href, children, variant, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref legacyBehavior {...props}>
      <StyledLink variant={variant}>{children}</StyledLink>
    </NextLink>
  );
}
