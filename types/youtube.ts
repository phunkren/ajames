import { DetailedHTMLProps, ImgHTMLAttributes } from "react";

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
