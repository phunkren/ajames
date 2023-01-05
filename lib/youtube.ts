import { google } from "googleapis";
import { GOOGLE_SERVICE_ACCOUNT } from "../constants/google";
import { YOUTUBE_CHANNEL_ID, YOUTUBE_PLAYLIST_ID } from "../constants/youtube";

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

  const getLatestVideo = youtube.playlistItems.list({
    part: ["snippet"],
    playlistId: YOUTUBE_PLAYLIST_ID,
    maxResults: 1,
  });

  const getPlaylists = youtube.playlists.list({
    part: ["snippet"],
    fields:
      "items(id, snippet(thumbnails(high), title, description, publishedAt))",
    channelId: YOUTUBE_CHANNEL_ID,
    maxResults: 5,
  });

  const [latestVideoRes, playlistsRes] = await Promise.all([
    getLatestVideo,
    getPlaylists,
  ]);

  const getPlayListVideos = playlistsRes.data.items.map((item) =>
    youtube.playlistItems.list({
      part: ["snippet"],
      playlistId: item.id,
      maxResults: 5,
    })
  );

  const videosRes = await Promise.all(getPlayListVideos);

  const latestVideo = latestVideoRes.data.items[0];
  const playlists = playlistsRes.data.items;
  const videos = videosRes.map((video) => video.data.items);

  return {
    latestVideo,
    playlists,
    videos,
  };
}
