module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com", // Notion
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com", // YouTube
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
