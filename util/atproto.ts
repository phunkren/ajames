import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import {
  FeedViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export type AspectRatio = {
  width: number;
  height: number;
};

export type Image = {
  thumb: string;
  alt: string;
  aspectRatio: AspectRatio;
};

export type Video = {
  playlist: string;
  thumbnail: string;
  aspectRatio: AspectRatio;
};

export type Repost = {};

export type ExternalLink = {
  uri: string;
  thumb: string;
  title: string;
  description: string;
};

export type Embed = Video & {
  images?: Image[];
  external?: ExternalLink;
};

export type AtprotoProfileViewSimple = Pick<
  ProfileViewDetailed,
  "handle" | "followersCount" | "postsCount"
>;

export type PostRecord = {
  embed?: Embed;
  createdAt: string;
  text: string;
};

export type ExtendedPostView = PostView & { embed?: Embed; record: PostRecord };

export type ExtendedFeedViewPost = FeedViewPost & {
  post: ExtendedPostView;
};

export const ATPROTO_FOLLOW_FEED =
  "https://bsky.app/profile/why.bsky.team/feed/bestoffollows";

export const ATPROTO_FOLLOW_FEED_URI =
  "at://did:plc:vpkhqolt662uhesyj6nxm7ys/app.bsky.feed.generator/bestoffollows";

export function formatAtprotoProfile({
  handle,
  followersCount,
  postsCount,
}: ProfileViewDetailed) {
  const profileViewSimple: AtprotoProfileViewSimple = {
    handle,
    followersCount,
    postsCount,
  };

  return profileViewSimple;
}

export function formatAtprotoPinnedPost(pinnedPost: ExtendedPostView) {
  const { embed, record, ...pinnedPostWithoutEmbed } = pinnedPost;
  const { embed: recordEmbed, ...recordWithoutEmbed } = record;

  return {
    ...pinnedPostWithoutEmbed,
    embed: embed ? JSON.parse(JSON.stringify(embed)) : null,
    record: {
      embed: recordEmbed ? JSON.parse(JSON.stringify(recordEmbed)) : null,
      ...recordWithoutEmbed,
    },
  };
}

export function getInitials(input: string): string {
  return input
    .split(/[\s-]+/)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function sortPostsByDate(posts: ExtendedPostView[], order = "asc") {
  return posts.sort((a, b) => {
    const dateA = new Date(a.record.createdAt);
    const dateB = new Date(b.record.createdAt);

    if (order === "asc") {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });
}

// This prevents serialization errors on embed media.
function serializeEmbedFromPosts(feed: ExtendedPostView[]) {
  return feed.map((item) => {
    const { embed, record, ...itemWithoutEmbed } = item;
    const { embed: recordEmbed, ...recordWithoutEmbed } = record;

    return {
      ...itemWithoutEmbed,
      embed: embed ? JSON.parse(JSON.stringify(embed)) : null,
      record: {
        embed: recordEmbed ? JSON.parse(JSON.stringify(recordEmbed)) : null,
        ...recordWithoutEmbed,
      },
    };
  });
}

export function formatAtprotoFeed(
  myFeed: FeedViewPost[],
  followingFeed: FeedViewPost[]
) {
  const curatedTextPosts = [
    ...myFeed,
    ...followingFeed,
  ] as ExtendedFeedViewPost[];

  const filteredPosts = curatedTextPosts
    .filter((textPost) => textPost.post.record.text)
    .map((filteredTextPost) => filteredTextPost.post);

  const serializedEmbedPosts = serializeEmbedFromPosts(filteredPosts);

  const sortedTextPosts = sortPostsByDate(serializedEmbedPosts);

  return sortedTextPosts;
}
