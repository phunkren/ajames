import { AnchorHTMLAttributes, forwardRef, Ref } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
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

export const Link = forwardRef(
  (
    { href, nextLinkProps, ...props }: LinkProps,
    ref: Ref<HTMLAnchorElement>
  ) => {
    return (
      <NextLink href={href} passHref legacyBehavior {...nextLinkProps}>
        <StyledLink ref={ref} {...props} />
      </NextLink>
    );
  }
);

// 'Notion to Markdown' converts embeds to links
// Render embeds as iframes, and links with the custom Link component
export function MarkdownLink({ node, ...props }) {
  const isEmbedLink = node.children[0].value === "embed";

  if (isEmbedLink) {
    return <iframe src={props.href} width="100%" height="500px"></iframe>;
  }

  return <Link href={props.href} variant="secondary" {...props} />;
}
