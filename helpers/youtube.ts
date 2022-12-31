import { YOUTUBE_URL } from "../constants/youtube";
import { PlaylistPreview, VideoPreview } from "../types/youtube";
import { buildUrl } from "./url";

export const formatLatestResponse = (response: any): VideoPreview => {
  const { thumbnails, title, publishedAt, description } = response.snippet;
  const url = buildUrl(`${YOUTUBE_URL}/watch`, { v: response.id });

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

export const formatPlaylistsResponse = (response: any): PlaylistPreview[] => {
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
