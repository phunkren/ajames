import { css, styled } from "../../stitches.config";
import { TextAux, TextBody, TextTitle1, TextTitle2 } from "../Text";
import { Box } from "../Box";
import {
  AtprotoHandle,
  FollowerCount,
  Frontmatter,
  PostCount,
} from "../Frontmatter";

import { Divider } from "../Divider";
import { ShareButton } from "../Button";
import { YOUTUBE_CHANNEL_URL } from "../../util/youtube";
import { SOCIAL } from "../../util/data";
import { ActionButtons } from "../Layout";
import { BlueskyFollowLink, BlueskyShareLink, Link } from "../Link";
import { PlayIcon } from "@radix-ui/react-icons";
import { ICON_SIZE } from "../../util/images";
import { SocialCard } from "../Card";
import {
  ATPROTO_FOLLOW_FEED,
  AtprotoProfileViewSimple,
  ExtendedPostView,
} from "../../util/atproto";
import useMasonry from "../../hooks/useMasonry";

export type Props = {
  pinnedPost: ExtendedPostView;
  feed: ExtendedPostView[];
  info: AtprotoProfileViewSimple;
};

const bg = css({
  position: "relative",
  background: `$slate1`,

  "&::before": {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: "50%",
    backgroundColor: `$slate1`,
    transform: "skewY(-2deg)",
    transformOrigin: "left top",
    zIndex: "$0",
  },
});

const StyledMasonryContainer = styled(Box, {
  gridTemplateColumns: "repeat(3, 1fr)",
});

export const SOCIAL_ID = "social";

export const Social = ({ feed, info, pinnedPost }: Props) => {
  const masonryContainer = useMasonry();

  return (
    <Box
      as="section"
      display={{ print: "none", "@initial": "flex" }}
      direction="vertical"
      spacingTop={{ "@initial": 11, "@bp2": 10, "@bp3": 11 }}
      spacingHorizontal={7}
      className={bg}
    >
      <Box
        direction="vertical"
        gap={12}
        container="l"
        spacingBottom={{ "@print": 0, "@initial": 10, "@bp2": 11 }}
        css={{ zIndex: "$1" }}
      >
        <Box direction="vertical">
          <Box direction="vertical">
            <Box direction="vertical" justifyContent="space-between" gap={10}>
              <Box direction="vertical">
                <Box
                  id={SOCIAL_ID}
                  justifyContent="space-between"
                  alignItems="center"
                  spacingTop={12}
                >
                  <TextTitle1 as="h2">Social</TextTitle1>

                  <Box
                    position="relative"
                    css={{
                      display: "none",
                      "@bp2": { display: "flex", left: "-$1" },
                    }}
                  >
                    <BlueskyFollowLink type="button" />
                  </Box>

                  <BlueskyFollowLink
                    type="icon"
                    css={{
                      display: "flex",
                      "@bp2": {
                        display: "none",
                      },
                    }}
                  />
                </Box>
              </Box>

              <Box alignItems="flex-end" justifyContent="space-between">
                <Frontmatter>
                  <AtprotoHandle icon />
                  <FollowerCount total={info.followersCount} icon />
                  <PostCount total={info.postsCount} icon />
                </Frontmatter>

                <ActionButtons css={{ width: "auto" }}>
                  <BlueskyShareLink
                    url={YOUTUBE_CHANNEL_URL}
                    text="txt"
                    variant="icon"
                  />

                  <ShareButton
                    url={SOCIAL.bluesky.url}
                    text={"TODO: Rich text"}
                    variant="icon"
                  />
                </ActionButtons>
              </Box>

              <Box>
                <Divider />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box direction="vertical" gap={12}>
          {pinnedPost ? (
            <Box direction="vertical">
              <Box
                justifyContent={{
                  "@initial": "space-between",
                  "@bp2": "flex-start",
                }}
                gap={10}
                alignItems="baseline"
                spacingBottom={8}
              >
                <TextTitle2 as="h3">Featured</TextTitle2>

                <Link href="#" variant="tertiary">
                  <PlayIcon
                    width={ICON_SIZE.m}
                    height={ICON_SIZE.m}
                    aria-hidden
                  />
                  <TextAux>View post</TextAux>
                </Link>
              </Box>

              <Box
                gap={{ "@initial": 0, "@bp3": 11 }}
                direction={{ "@initial": "vertical", "@bp3": "horizontal" }}
              >
                <Box
                  direction="vertical"
                  spacingBottom={{ "@initial": 8, "@bp3": 0 }}
                  css={{
                    "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: "45%" },
                  }}
                >
                  <SocialCard
                    id={pinnedPost.cid}
                    author={pinnedPost.author}
                    images={pinnedPost.embed?.images}
                    replies={pinnedPost.replyCount}
                    reposts={pinnedPost.repostCount}
                    likes={pinnedPost.likeCount}
                    text={pinnedPost.record.text}
                    url={pinnedPost.uri}
                  />
                </Box>
              </Box>
            </Box>
          ) : null}

          <Box direction="vertical" gap={12}>
            <Box direction="vertical">
              <Box direction="vertical">
                <Box
                  gap={10}
                  justifyContent={{
                    "@initial": "space-between",
                    "@bp2": "flex-start",
                  }}
                  alignItems="baseline"
                  spacingVertical={2}
                >
                  <Link href="#" variant="secondary">
                    <TextTitle2 as="h3">My Feed</TextTitle2>
                  </Link>

                  <Link href={ATPROTO_FOLLOW_FEED} variant="tertiary">
                    <PlayIcon
                      width={ICON_SIZE.m}
                      height={ICON_SIZE.m}
                      aria-hidden
                    />
                    <TextAux>View all</TextAux>
                  </Link>
                </Box>

                <TextBody
                  color="secondary"
                  css={{
                    textAlign: "justify",
                    maxWidth: "none",
                    "@bp3": { maxWidth: "66%" },
                  }}
                >
                  The latest posts from myself and accounts that I follow on
                  Bluesky
                </TextBody>

                <StyledMasonryContainer
                  ref={masonryContainer}
                  display="grid"
                  alignItems="start"
                  spacingVertical={10}
                  gap={7}
                >
                  {feed.map((post) => {
                    const video =
                      post.embed?.playlist &&
                      post.embed?.thumbnail &&
                      post.embed?.aspectRatio
                        ? {
                            src: post.embed.playlist,
                            img: post.embed.thumbnail,
                            aspectRatio: post.embed.aspectRatio,
                          }
                        : null;

                    return (
                      <SocialCard
                        id={post.cid}
                        author={post.author}
                        replies={post.replyCount}
                        reposts={post.repostCount}
                        images={post.embed?.images}
                        video={video}
                        link={post.embed?.external}
                        likes={post.likeCount}
                        text={post.record.text}
                        url={post.uri}
                        compact
                      />
                    );
                  })}
                </StyledMasonryContainer>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
