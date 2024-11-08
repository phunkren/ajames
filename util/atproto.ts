import {
  ProfileViewBasic,
  ProfileViewDetailed,
} from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import {
  FeedViewPost,
  PostView,
} from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export type Author = {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
  associated: Record<string, unknown>;
  viewer: Record<string, unknown>;
  labels: Record<string, unknown>[];
  createdAt: string;
};

export type ViewRecord = {
  uri: string;
  cid: string;
  author: ProfileViewBasic;
  value: RecordValue;
  labels: Record<string, string>[];
  replyCount: number;
  repostCount: number;
  likeCount: number;
  quoteCount: number;
  embeds: Embed;
  indexedAt: string;
  createdAt: string;
  text: string;
};

export type ViewNotFound = {
  uri: string;
  notFound: boolean;
};

export type ViewBlocked = {
  uri: string;
  blocked: boolean;
  author: Record<string, unknown>;
};

export type AspectRatio = {
  width: number;
  height: number;
};

export type Image = {
  thumb: string;
  fullsize: string;
  alt: string;
  aspectRatio: AspectRatio;
};

export type Video = {
  cid: string;
  playlist: string;
  thumbnail: string;
  alt: string;
  aspectRatio: AspectRatio;
};

export type ExternalLink = {
  uri: string;
  title: string;
  thumb: string;
  description: string;
};

export type Embed = Video & {
  $type: string;
  video?: Video;
  images?: Image[];
  media?: {
    images: Image[];
    external: ExternalLink;
  };
  record?: {
    cid?: string;
    uri?: string;
    author?: ProfileViewBasic;
    record?: ViewRecord;
    replyCount?: number;
    repostCount?: number;
    likeCount?: number;
    value?: RecordValue;
    embeds: Embed[];
  };
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

export type RecordValue = {
  text: string;
};

export type ExtendedPostView = PostView & {
  embed?: Embed;
  record: PostRecord;
};

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

export function formatAtprotoLink({
  uri,
  author,
}: {
  uri: string;
  author: ProfileViewBasic;
}) {
  const postIdMatch = uri.match(/\/([^/]+)$/);

  if (!postIdMatch || !author.handle) {
    return null;
  }

  const postId = postIdMatch[1];
  return `https://bsky.app/profile/${author.handle}/post/${postId}`;
}
