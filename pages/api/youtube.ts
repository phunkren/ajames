import { google } from "googleapis";
import { YOUTUBE_CHANNEL_ID } from "../../constants/youtube";

let googleAuth;

export async function getYoutubeData() {
  googleAuth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
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

  const getLatestLivestream = youtube.search.list({
    part: ["snippet"],
    fields:
      "items(id(videoId), snippet(thumbnails(high), title, publishedAt, description))",
    channelId: YOUTUBE_CHANNEL_ID,
    eventType: "live",
    maxResults: 1,
    order: "date",
    type: ["video"],
  });

  const d = await getLatestLivestream;

  console.log({ d });

  const getLatestVideo = youtube.search.list({
    part: ["snippet"],
    fields:
      "items(id(videoId), snippet(thumbnails(high), title, publishedAt, description))",
    channelId: YOUTUBE_CHANNEL_ID,
    eventType: "completed",
    maxResults: 1,
    order: "date",
    type: ["video"],
  });

  const getPlaylists = youtube.playlists.list({
    part: ["snippet"],
    fields: "items(id, snippet(thumbnails(high), title, description))",
    channelId: YOUTUBE_CHANNEL_ID,
    maxResults: 5,
  });

  const [latestLivestreamRes, latestVideoRes, playlistsRes] = await Promise.all(
    [getLatestLivestream, getLatestVideo, getPlaylists]
  );

  const latestLivestream = latestLivestreamRes.data.items[0];
  const latestVideo = latestVideoRes.data.items[0];
  const playlists = playlistsRes.data.items;

  return {
    latestLivestream,
    latestVideo,
    playlists,
  };
}

export default async (_, res) => {
  const { latestLivestream, latestVideo, playlists } = await getYoutubeData();

  return res.status(200).json({
    latestLivestream,
    latestVideo,
    playlists,
  });
};
