import { youtube_v3 } from "googleapis";
import keyBy from "lodash.keyby";
import { buildUrl } from "../util/url";

type Thumbnail = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type VideoPreview = {
  thumbnail: Thumbnail;
  title: string;
  publishedAt: string;
  description: string;
  url: string;
  id: string;
  videoOwnerChannelTitle: string;
};

export type PlaylistPreview = {
  id: string;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  url: string;
  publishedAt: string;
  videoOwnerChannelTitle: string;
};

export type PlaylistVideosPreview = Record<string, VideoPreview[]>;

export type ChannelInfoPreview = {
  title: string;
  description: string;
  thumbnail: Thumbnail;
  customUrl: string;
  viewCount: string;
  subscriberCount: string;
  videoCount: string;
};

export const INVENTORY_URL = "https://ajames.dev/inventory";

export const INVENTORY_SHARE_TEXT =
  "Check out Andrew James' professional setup";

export const YOUTUBE_API_URL = "https://youtube.googleapis.com/youtube/v3";

export const YOUTUBE_URL = "https://www.youtube.com";

export const YOUTUBE_CHANNEL_URL = `${YOUTUBE_URL}/@ajamesdev`;

export const YOUTUBE_THUMBNAIL_URL = "https://i.imgur.com/9UxwUv5.png";

export const YOUTUBE_CHANNEL_TITLE = "ajames dev";

export const YOUTUBE_SHARE_TEXT = "I'm watching ajames.dev on YouTube!";

export const YOUTUBE_SUBSCRIBE_URL = buildUrl(YOUTUBE_CHANNEL_URL, {
  sub_confirmation: 1,
});

export const YOUTUBE_CHANNEL_ID = "UCCp_G-IprVFee-tBabTROsw";

// Used to retrieve all videos in the channel.
// Identical to `YOUTUBE_CHANNEL_ID`, except with a `UU` prefix instead of `UC`.
export const YOUTUBE_CHANNEL_PLAYLIST_ID = "UUCp_G-IprVFee-tBabTROsw";

export const YOUTUBE_LIKED_VIDEOS_PLAYLIST_ID =
  "PL7_TxhdAmdDL7M26zUGU4nYpKm22h3CyY";

export const formatVideo = (
  response: youtube_v3.Schema$PlaylistItem
): PlaylistPreview => {
  const {
    thumbnails,
    title,
    description,
    resourceId,
    publishedAt,
    videoOwnerChannelTitle,
  } = response.snippet;

  const publishDate = response.contentDetails?.videoPublishedAt ?? publishedAt;

  const url = buildUrl(`${YOUTUBE_URL}/watch`, {
    v: resourceId.videoId,
  });

  const thumbnail = {
    src: thumbnails?.high.url,
    width: thumbnails?.high.width,
    height: thumbnails?.high.height,
    alt: title,
  };

  return {
    id: resourceId.videoId,
    thumbnail,
    title,
    publishedAt: publishDate,
    description,
    url,
    videoOwnerChannelTitle,
  };
};

export const formatVideos = (playlistItems: youtube_v3.Schema$PlaylistItem[]) =>
  playlistItems.map((playlistItem) => formatVideo(playlistItem));

export const formatChannelInfo = (
  info: youtube_v3.Schema$Channel
): ChannelInfoPreview => {
  const { snippet, statistics } = info;
  const { title, description, customUrl, thumbnails } = snippet;
  const { viewCount, subscriberCount, videoCount } = statistics;

  const thumbnail = {
    src: thumbnails?.high.url,
    width: thumbnails?.high.width,
    height: thumbnails?.high.height,
    alt: "",
  };

  return {
    title,
    description,
    thumbnail,
    customUrl,
    viewCount,
    subscriberCount,
    videoCount,
  };
};
