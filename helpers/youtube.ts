import { youtube_v3 } from "googleapis";
import keyBy from "lodash.keyby";
import {
  YOUTUBE_LIKED_VIDEOS_PLAYLIST_ID,
  YOUTUBE_URL,
} from "../constants/youtube";
import {
  ChannelInfoPreview,
  PlaylistPreview,
  PlaylistVideosPreview,
  VideoPreview,
} from "../types/youtube";
import { buildUrl } from "./url";

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
