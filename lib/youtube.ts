import { buildUrl } from "../helpers/url";
import { PlaylistPreview, VideoPreview } from "../types/youtube";

const YOUTUBE_URL = "https://www.youtube.com/";

const YOUTUBE_API_URL = "https://youtube.googleapis.com/youtube/v3";

const YOUTUBE_CHANNEL_ID = "UCCp_G-IprVFee-tBabTROsw";

export const getSubscriptionUrl = () => {
  return buildUrl(`${YOUTUBE_URL}/@ajamesdev`, { sub_confirmation: 1 });
};

export const getLatestVideo = async () => {
  const latestVideoUrl = buildUrl(`${YOUTUBE_API_URL}/search`, {
    part: "snippet",
    channelId: YOUTUBE_CHANNEL_ID,
    eventType: "completed",
    maxResults: 1,
    order: "date",
    type: "video",
    key: process.env.YOUTUBE_TOKEN,
  });

  const response = await fetch(latestVideoUrl);

  const data = await response.json();

  return data;
};

export const getLatestLiveStream = async () => {
  const latestLiveStreamUrl = buildUrl(`${YOUTUBE_API_URL}/search`, {
    part: "snippet",
    channelId: YOUTUBE_CHANNEL_ID,
    eventType: "live",
    maxResults: 1,
    order: "date",
    type: "video",
    key: process.env.YOUTUBE_TOKEN,
  });

  const response = await fetch(latestLiveStreamUrl);

  const data = await response.json();

  return data;
};

export const getPlaylists = async () => {
  const playlistsUrl = buildUrl(`${YOUTUBE_API_URL}/playlists`, {
    part: "snippet",
    channelId: YOUTUBE_CHANNEL_ID,
    maxResults: 5,
    key: process.env.YOUTUBE_TOKEN,
  });

  const response = await fetch(playlistsUrl);

  const data = await response.json();

  return data;
};

export const formatLatestResponse = (response: any): VideoPreview => {
  const latest = response.items[0];
  const { thumbnails, title, publishedAt, description } = latest.snippet;
  const url = buildUrl(`${YOUTUBE_URL}/watch`, { v: latest.id });

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
  const playlists = response.items.map((item) => {
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
