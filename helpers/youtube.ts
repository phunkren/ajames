import { youtube_v3 } from "googleapis";
import { YOUTUBE_URL } from "../constants/youtube";
import { PlaylistPreview, VideoPreview } from "../types/youtube";
import { buildUrl } from "./url";

export const formatPlaylistItem = (
  response: youtube_v3.Schema$PlaylistItem
): VideoPreview => {
  const { thumbnails, title, publishedAt, description, resourceId } =
    response.snippet;

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
  };
};

export const formatPlaylist = (
  response: youtube_v3.Schema$Playlist[]
): PlaylistPreview[] => {
  const playlists = response.map((item) => {
    const { thumbnails, title, description } = item.snippet;
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
    };
  });

  return playlists;
};
