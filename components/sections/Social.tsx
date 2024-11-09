import { css } from "../../stitches.config";
import { TextBody, TextTitle1, TextTitle2 } from "../Text";
import Masonry from "react-masonry-css";
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
import { SocialCard } from "../Card";
import {
  AtprotoProfileViewSimple,
  ExtendedPostView,
  formatAtprotoLink,
} from "../../util/atproto";

export type Props = {
  pinnedPost: ExtendedPostView;
  feed: ExtendedPostView[];
  info: AtprotoProfileViewSimple;
};

const bg = css({
  position: "relative",

  "&::before": {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: "50%",
    transform: "skewY(-2deg)",
    transformOrigin: "left top",
    zIndex: "$0",
  },
});

const masonryGrid = css({
  display: "flex",
  marginLeft: "-$10",
  width: "auto",
});

const masonryGridColumn = css({
  paddingLeft: "$10",
  backgroundClip: "padding-box",

  "& > article": {
    marginBottom: "$10",
  },
});

const masonryGridBreakpoints = {
  default: 3,
  720: 2,
  480: 1,
};

export const SOCIAL_ID = "social";

export const Social = ({ feed, info, pinnedPost }: Props) => {
  return (
    <Box as="section" direction="vertical" spacingHorizontal={7} className={bg}>
      <Box direction="vertical" container="l" css={{ zIndex: "$1" }}>
        <Box direction="vertical">
          <Box direction="vertical">
            <Box direction="vertical" justifyContent="space-between">
              <Box direction="vertical">
                <Box
                  id={SOCIAL_ID}
                  justifyContent="space-between"
                  alignItems="baseline"
                  spacingTop={{ "@initial": 11, "@bp2": 12 }}
                  spacingBottom={{ "@initial": 4, "@bp2": 10 }}
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

              <Box spacingTop={10}>
                <Divider />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box direction="vertical">
          {pinnedPost ? (
            <Box direction="vertical">
              <Box
                justifyContent={{
                  "@initial": "space-between",
                  "@bp2": "flex-start",
                }}
                alignItems="baseline"
                gap={10}
                spacingTop={{ "@initial": 10, "@bp2": 11 }}
                spacingBottom={{ "@initial": 8, "@bp2": 10 }}
              >
                <TextTitle2 as="h3">Featured</TextTitle2>
              </Box>

              <Box
                gap={{ "@initial": 0, "@bp3": 11 }}
                direction={{ "@initial": "vertical", "@bp3": "horizontal" }}
              >
                <Box
                  direction="vertical"
                  spacingBottom={{ "@initial": 8, "@bp3": 0 }}
                >
                  <SocialCard
                    css={{ width: "fit-content" }}
                    id={pinnedPost.cid}
                    author={pinnedPost.author}
                    embed={pinnedPost.embed}
                    replies={pinnedPost.replyCount}
                    reposts={pinnedPost.repostCount}
                    likes={pinnedPost.likeCount}
                    text={pinnedPost.record.text}
                    url={formatAtprotoLink({
                      uri: pinnedPost.uri,
                      author: pinnedPost.author,
                    })}
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
                  spacingTop={{ "@initial": 10, "@bp2": 11 }}
                  spacingBottom={2}
                >
                  <TextTitle2 as="h3">My Feed</TextTitle2>
                </Box>

                <Box spacingBottom={{ "@initial": 8, "@bp2": 10 }}>
                  <TextBody
                    color="secondary"
                    css={{
                      maxWidth: "none",
                      "@bp3": { maxWidth: "66%" },
                    }}
                  >
                    The latest posts from my account and others that I follow on
                    Bluesky
                  </TextBody>
                </Box>

                <Masonry
                  breakpointCols={masonryGridBreakpoints}
                  className={masonryGrid().toString()}
                  columnClassName={masonryGridColumn().toString()}
                >
                  {feed.map((post) => {
                    return (
                      <SocialCard
                        key={post.cid}
                        id={post.cid}
                        author={post.author}
                        replies={post.replyCount}
                        reposts={post.repostCount}
                        embed={post.embed}
                        likes={post.likeCount}
                        text={post.record.text}
                        url={formatAtprotoLink({
                          uri: post.uri,
                          author: post.author,
                        })}
                        compact
                      />
                    );
                  })}
                </Masonry>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
