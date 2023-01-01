export const GOOGLE_SERVICE_ACCOUNT = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT, "base64").toString()
);
