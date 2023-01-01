import { google } from "googleapis";
import {
  YOUTUBE_CHANNEL_ID,
  YOUTUBE_PLAYLIST_ID,
} from "../../constants/youtube";

export async function getYoutubeData() {
  const googleAuth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join(
        "\n"
      ),
    },
    scopes: [
      "https://www.googleapis.com/auth/youtube",
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/youtube.force-ssl",
    ],
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
    fields: "items(id, snippet(thumbnails(high), title, description))",
    channelId: YOUTUBE_CHANNEL_ID,
    maxResults: 5,
  });

  const [latestVideoRes, playlistsRes] = await Promise.all([
    getLatestVideo,
    getPlaylists,
  ]);

  const latestVideo = latestVideoRes.data.items[0];
  const playlists = playlistsRes.data.items;

  return {
    latestVideo,
    playlists,
  };
}

export default async (_, res) => {
  const { latestVideo, playlists } = await getYoutubeData();

  return res.status(200).json({
    latestVideo,
    playlists,
  });
};
