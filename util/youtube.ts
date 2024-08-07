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
  playlistId: string;
  videoId: string;
  videoOwnerChannelTitle: string;
};

export type PlaylistPreview = {
  id: string;
  title: string;
  description: string;
  thumbnail: Thumbnail;
  url: string;
  publishedAt: string;
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

export const YOUTUBE_CHANNEL_TITLE = "AJAMES.DEV";

export const YOUTUBE_SHARE_TEXT = "Check out AJAMES.DEV on YouTube!";

export const YOUTUBE_SUBSCRIBE_URL = buildUrl(YOUTUBE_CHANNEL_URL, {
  sub_confirmation: 1,
});

export const YOUTUBE_CHANNEL_ID = "UCCp_G-IprVFee-tBabTROsw";

// Used to retrieve all videos in the channel.
// Identical to `YOUTUBE_CHANNEL_ID`, except with a `UU` prefix instead of `UC`.
export const YOUTUBE_CHANNEL_PLAYLIST_ID = "UUCp_G-IprVFee-tBabTROsw";

export const YOUTUBE_LIKED_VIDEOS_PLAYLIST_ID =
  "PL7_TxhdAmdDL7M26zUGU4nYpKm22h3CyY";

export const formatPlaylistVideo = (
  response: youtube_v3.Schema$PlaylistItem
): VideoPreview => {
  const {
    thumbnails,
    title,
    description,
    resourceId,
    playlistId,
    publishedAt,
    videoOwnerChannelTitle,
  } = response.snippet;

  const publishDate = response.contentDetails?.videoPublishedAt ?? publishedAt;

  const url = buildUrl(`${YOUTUBE_URL}/watch`, {
    v: resourceId.videoId,
    list: playlistId,
  });

  const thumbnail = {
    src: thumbnails?.high.url,
    width: thumbnails?.high.width,
    height: thumbnails?.high.height,
    alt: title,
  };

  return {
    videoId: resourceId.videoId,
    thumbnail,
    title,
    publishedAt: publishDate,
    description,
    url,
    playlistId,
    videoOwnerChannelTitle,
  };
};

export const formatPlaylist = (
  response: youtube_v3.Schema$Playlist[]
): PlaylistPreview[] => {
  const playlists = response.map((item) => {
    const { thumbnails, title, description, publishedAt } = item.snippet;
    const url = buildUrl(`${YOUTUBE_URL}/playlist`, { list: item.id });

    const thumbnail = {
      src: thumbnails?.high.url,
      width: thumbnails?.high.width,
      height: thumbnails?.high.height,
      alt: title,
    };

    return {
      id: item.id,
      title,
      description,
      thumbnail,
      url,
      publishedAt,
    };
  });

  return playlists;
};

export const formatPlaylistVideos = (
  response: youtube_v3.Schema$PlaylistItem[][]
): PlaylistVideosPreview => {
  // Returns an array of arrays.
  // Outer array - Collection
  // Inner array(s) - Playlist
  // Inner Array Objects - Playlist videos
  const playlistCollection = response
    .map((playlist) => {
      if (!playlist.length) return;

      return playlist.map((playlistVideo) =>
        formatPlaylistVideo(playlistVideo)
      );
    })
    .filter(Boolean);

  // Formats the collection to assign the playist id as a key for the playlist videos.
  // Outer object - Collection
  // [playlistId]: VideoPreview[]
  const formattedPlaylistVideos: Record<string, VideoPreview[]> = keyBy(
    playlistCollection,
    (collection: VideoPreview[]) => collection[0]?.playlistId
  );

  return formattedPlaylistVideos;
};

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

// Ensure Liked Videos appears at the bottom
export const sortPlaylists = (
  playlists: PlaylistPreview[]
): PlaylistPreview[] => {
  const likedVideosPlaylist = playlists.find(
    (playlist) => playlist.id === YOUTUBE_LIKED_VIDEOS_PLAYLIST_ID
  );

  const otherPlaylists = playlists
    .slice(0, 3)
    .filter((pl) => pl.id !== YOUTUBE_LIKED_VIDEOS_PLAYLIST_ID);

  return [...otherPlaylists, likedVideosPlaylist];
};
