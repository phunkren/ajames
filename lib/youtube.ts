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

  const info = await youtube.channels.list({
    part: ["snippet", "statistics"],
    id: [YOUTUBE_CHANNEL_ID],
  });

  const channelInfo = info.data.items[0];

  const channelUploads = await youtube.playlistItems.list({
    part: ["snippet", "contentDetails"],
    playlistId: YOUTUBE_CHANNEL_PLAYLIST_ID,
    maxResults: 11,
  });

  const subscriptions = await youtube.subscriptions.list({
    part: ["snippet"],
    channelId: YOUTUBE_CHANNEL_ID,
    maxResults: 50,
  });

  const subscriptionsUploads = await Promise.all(
    subscriptions.data.items?.map(async ({ snippet }) => {
      // Identical to channel id, except with a `UU` prefix instead of `UC`.
      const playlistId = `UU${snippet.resourceId.channelId.slice(2)}`;

      try {
        const latestUploads = await youtube.playlistItems.list({
          part: ["snippet", "contentDetails"],
          playlistId,
          maxResults: 50,
        });

        const sortedUploads = latestUploads.data.items.sort((a, b) => {
          const dateA = new Date(a.snippet.publishedAt ?? 0);
          const dateB = new Date(b.snippet.publishedAt ?? 0);
          return dateB.getTime() - dateA.getTime();
        });

        return sortedUploads[0];
      } catch (error) {
        console.error(error);

        return null;
      }
    })
  );

  // Filter null values in the event the playlist id is not found
  // Return the first ten valid results.
  const filteredSubscriptionsUploads = subscriptionsUploads
    .filter((subscriptionsUpload) => subscriptionsUpload)
    .sort((a, b) => {
      const dateA = new Date(a.snippet.publishedAt ?? 0);
      const dateB = new Date(b.snippet.publishedAt ?? 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10);

  return {
    channelUploads,
    channelSubscriptions: filteredSubscriptionsUploads,
    channelInfo,
  };
}
