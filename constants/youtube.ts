import { buildUrl } from "../helpers/url";

export const YOUTUBE_URL = "https://www.youtube.com";

export const YOUTUBE_SUBSCRIBE_URL = buildUrl(`${YOUTUBE_URL}/@ajamesdev`, {
  sub_confirmation: 1,
});

export const YOUTUBE_API_URL = "https://youtube.googleapis.com/youtube/v3";

export const YOUTUBE_CHANNEL_ID = "UCCp_G-IprVFee-tBabTROsw";
