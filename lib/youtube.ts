const YOUTUBE_API_URL = "https://youtube.googleapis.com/youtube/v3";

const YOUTUBE_CHANNEL_ID = "UCCp_G-IprVFee-tBabTROsw";

export const getLatestVideo = async () => {
  const response = await fetch(
    `${YOUTUBE_API_URL}/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=completed&maxResults=1&order=date&type=video&key=${process.env.YOUTUBE_TOKEN}`
  );

  const data = await response.json();

  return data;
};

export const getLatestLiveStream = async () => {
  const response = await fetch(
    `${YOUTUBE_API_URL}/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=live&maxResults=1&order=date&type=video&key=${process.env.YOUTUBE_TOKEN}`
  );

  const data = await response.json();

  return data;
};

export const getPlaylists = async () => {
  const response = await fetch(
    `${YOUTUBE_API_URL}/playlists?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=5&key=${process.env.YOUTUBE_TOKEN}`
  );

  const data = await response.json();

  return data;
};
