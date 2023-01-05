import { youtube_v3 } from "googleapis";
import keyBy from "lodash.keyby";
import { YOUTUBE_URL } from "../constants/youtube";
import { PlaylistPreview, VideoPreview } from "../types/youtube";
import { buildUrl } from "./url";

export function sortVideos(videos: youtube_v3.Schema$PlaylistItem[]) {
  return videos.sort((a, b) => {
    let dateA = new Date(a.snippet.publishedAt).getTime();
    let dateB = new Date(b.snippet.publishedAt).getTime();

    return dateB - dateA;
  });
}

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

  const url = buildUrl(`${YOUTUBE_URL}/watch`, { v: resourceId.videoId });

  const thumbnail = {
    src: thumbnails?.high.url,
    width: thumbnails?.high.width,
    height: thumbnails?.high.height,
    alt: title,
  };

  return {
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

  return playlists;
};

export const formatPlaylistVideos = (
  response: youtube_v3.Schema$PlaylistItem[][]
) => {
  // Returns an array of arrays.
  // Outer array - Collection
  // Inner array(s) - Playlist
  // Inner Array Objects - Playlist videos
  const playlistCollection = response.map((playlist) => {
    const sortedPlaylist = sortVideos(playlist);
    return sortedPlaylist.map((playlistVideo) =>
      formatPlaylistVideo(playlistVideo)
    );
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
