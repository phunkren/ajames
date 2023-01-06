import { buildUrl } from "../helpers/url";

export const YOUTUBE_API_URL = "https://youtube.googleapis.com/youtube/v3";

export const YOUTUBE_URL = "https://www.youtube.com";

export const YOUTUBE_CHANNEL_URL = `${YOUTUBE_URL}/@ajamesdev`;

export const YOUTUBE_SUBSCRIBE_URL = buildUrl(YOUTUBE_CHANNEL_URL, {
  sub_confirmation: 1,
});

export const YOUTUBE_CHANNEL_ID = "UCCp_G-IprVFee-tBabTROsw";

// Used to retrieve all videos in the channel.
// Identical to `YOUTUBE_CHANNEL_ID`, except with a `UU` prefix instead of `UC`.
export const YOUTUBE_CHANNEL_PLAYLIST_ID = "UUCp_G-IprVFee-tBabTROsw";

export const YOUTUBE_LIKED_VIDEOS_PLAYLIST_ID =
  "PL7_TxhdAmdDK57ehEHD5heYSmpi2IICvo";
