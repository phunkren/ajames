import { google } from "googleapis";
import {
  YOUTUBE_CHANNEL_ID,
  YOUTUBE_CHANNEL_PLAYLIST_ID,
} from "../util/youtube";

const GOOGLE_SERVICE_ACCOUNT = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT, "base64").toString()
);

export async function getYoutubeData() {
  const googleAuth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SERVICE_ACCOUNT.client_email,
      private_key: GOOGLE_SERVICE_ACCOUNT.private_key,
    },
    scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
  });

  const youtube = google.youtube({
    auth: googleAuth,
    version: "v3",
  });

  const getChannelInfo = youtube.channels.list({
    part: ["snippet", "statistics"],
    id: [YOUTUBE_CHANNEL_ID],
  });

  const getLatestVideo = youtube.playlistItems.list({
    part: ["snippet"],
    playlistId: YOUTUBE_CHANNEL_PLAYLIST_ID,
    maxResults: 1,
  });

  const getPlaylists = youtube.playlists.list({
    part: ["snippet"],
    fields:
      "items(id, snippet(thumbnails(high), title, description, publishedAt))",
    channelId: YOUTUBE_CHANNEL_ID,
    maxResults: 5,
  });

  const [latestVideoRes, playlistsRes, channelInfoRes] = await Promise.all([
    getLatestVideo,
    getPlaylists,
    getChannelInfo,
  ]);

  const getPlayListVideos = playlistsRes.data.items.map((item) =>
    youtube.playlistItems.list({
      part: ["snippet", "contentDetails"],
      playlistId: item.id,
      maxResults: 12,
    })
  );

  const videosRes = await Promise.all(getPlayListVideos);

  const latestVideo = latestVideoRes.data.items[0];
  const playlists = playlistsRes.data.items;
  const channelInfo = channelInfoRes.data.items[0];
  const videos = videosRes.map((video) => video.data.items);

  return {
    channelInfo,
    latestVideo,
    playlists,
    videos,
  };
}
