import { youtube_v3 } from "googleapis";
import keyBy from "lodash.keyby";
import { buildUrl } from "../util/url";
import {
  ChannelInfoPreview,
  PlaylistPreview,
  PlaylistVideosPreview,
  VideoPreview,
} from "../types/youtube";

export const YOUTUBE_API_URL = "https://youtube.googleapis.com/youtube/v3";

export const YOUTUBE_URL = "https://www.youtube.com";

export const YOUTUBE_CHANNEL_URL = `${YOUTUBE_URL}/@ajamesdev`;

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
  "PL7_TxhdAmdDK57ehEHD5heYSmpi2IICvo";

export const formatPlaylistVideo = (
  response: youtube_v3.Schema$PlaylistItem
): VideoPreview => {
  const {
    thumbnails,
    title,
    publishedAt,
    description,
    resourceId,
    playlistId,
  } = response.snippet;

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
    publishedAt,
    description,
    url,
    playlistId,
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

  const likeVideosPlaylist = playlists.find(
    ({ id }) => id === YOUTUBE_LIKED_VIDEOS_PLAYLIST_ID
  );

  const filteredPlaylists = playlists.filter(
    ({ id }) => id !== YOUTUBE_LIKED_VIDEOS_PLAYLIST_ID
  );

  // Ensure the 'Liked Videos' playlist always appears at the end
  const reorderedPlaylists = filteredPlaylists.concat(likeVideosPlaylist);

  return reorderedPlaylists;
};

export const formatPlaylistVideos = (
  response: youtube_v3.Schema$PlaylistItem[][]
): PlaylistVideosPreview => {
  // Returns an array of arrays.
  // Outer array - Collection
  // Inner array(s) - Playlist
  // Inner Array Objects - Playlist videos
  const playlistCollection = response.map((playlist) => {
    return playlist.map((playlistVideo) => formatPlaylistVideo(playlistVideo));
  });

  // Formats the collection to assign the playist id as a key for the playlist videos.
  // Outer object - Collection
  // [playlistId]: VideoPreview[]
  const formattedPlaylistVideos: Record<string, VideoPreview[]> = keyBy(
    playlistCollection,
    (collection: VideoPreview[]) => collection[0].playlistId
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
