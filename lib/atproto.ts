import { AtpAgent } from "@atproto/api";
import { ATPROTO_FOLLOW_FEED_URI, ExtendedPostView } from "../util/atproto";

const agent = new AtpAgent({
  service: "https://bsky.social",
});

export async function getAtProtoData() {
  await agent.login({
    identifier: process.env.BLUESKY_IDENTIFIER,
    password: process.env.BLUESKY_PASSWORD,
  });

  const [profileResponse, authorFeedResponse, followingFeedResponse] =
    await Promise.all([
      agent.getProfile({
        actor: process.env.BLUESKY_IDENTIFIER,
      }),
      agent.getAuthorFeed({
        actor: process.env.BLUESKY_IDENTIFIER,
        filter: "posts_no_replies",
        limit: 1,
      }),
      agent.app.bsky.feed.getFeed({
        feed: ATPROTO_FOLLOW_FEED_URI,
        limit: 9,
      }),
    ]);

  const myProfile = profileResponse.data;

  const pinnedPostResponse = await agent.getPosts({
    uris: [myProfile.pinnedPost.uri],
  });

  return {
    myProfile,
    myPinnedPost: pinnedPostResponse.data.posts[0] as ExtendedPostView,
    myFeed: authorFeedResponse.data.feed,
    myFollowingFeed: followingFeedResponse.data.feed,
  };
}
