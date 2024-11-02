// @ts-check
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const PAGE_REDIRECTS = [
  {
    source: "/rss",
    destination: "/rss.xml",
    permanent: true,
  },
  {
    source: "/writing",
    destination: "/#writing",
    permanent: true,
  },
  {
    source: "/learning",
    destination: "/#learning",
    permanent: true,
  },
  {
    source: "/social",
    destination: "/#social",
    permanent: true,
  },
];

const SOCIAL_REDIRECTS = [
  {
    source: "/bluesky",
    destination: "https://bsky.app/profile/ajames.dev",
    permanent: true,
  },
  {
    source: "/x",
    destination: "https://x.com/phunkren",
    permanent: true,
  },
  {
    source: "/github",
    destination: "https://github.com/phunkren",
    permanent: true,
  },
  {
    source: "/youtube",
    destination: "https://www.youtube.com/@ajamesdev?sub_confirmation=1",
    permanent: true,
  },
  {
    source: "/linkedin",
    destination: "https://linkedin.com/in/ajamesdev/",
    permanent: true,
  },
  {
    source: "/twitch",
    destination: "https://twitch.tv/phunkren/about",
    permanent: true,
  },
  {
    source: "/steam",
    destination: "https://steamcommunity.com/id/phunkren/",
    permanent: true,
  },
  {
    source: "/monzo",
    destination: "https://monzo.me/ajames",
    permanent: true,
  },
  {
    source: "/coffee",
    destination: "https://www.buymeacoffee.com/phunkren",
    permanent: true,
  },
  {
    source: "/instagram",
    destination: "https://www.instagram.com/phunkren/",
    permanent: true,
  },
];

const LEARNING_REDIRECTS = [
  {
    source: "/ajames-dev",
    destination:
      "https://youtube.com/playlist?list=PL7_TxhdAmdDLK4PPC4CekozyAQEodzJ_O",
    permanent: true,
  },
  {
    source: "/epic-react",
    destination:
      "https://youtube.com/playlist?list=PL7_TxhdAmdDJAsqFmJ3A8V2jqf4Oo02kJ",
    permanent: true,
  },
  {
    source: "/liked-videos",
    destination:
      "https://youtube.com/playlist?list=PL7_TxhdAmdDL7M26zUGU4nYpKm22h3CyY",
    permanent: true,
  },
];

const PROJECT_REDIRECTS = [
  {
    source: "/budget-template",
    destination:
      "https://docs.google.com/spreadsheets/d/1O2hXrd9bYa4u2sFC1vqd0O2WE-CMh4_AbIi5c1WlPF4/edit?usp=share_link",
    permanent: true,
  },
  {
    source: "/renovation-template",
    destination:
      "https://docs.google.com/spreadsheets/d/1Nh-Z3ptfvYAk_QiPxnhruzT3acVhioUwHvd7dGm9e5Q/edit?usp=share_link",
    permanent: true,
  },
  {
    source: "/find-phunk",
    destination: "https://findphunk.vercel.app/",
    permanent: true,
  },
  {
    source: "/pc",
    destination: "https://pcpartpicker.com/user/funkrenegade/saved/7dVgwP",
    permanent: true,
  },
];

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com", // YouTube
      },
      {
        protocol: "https",
        hostname: "i.imgur.com", // Imgur
      },
      {
        protocol: "https",
        hostname: "www.notion.so", // Notion
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com", // Amazon (Images)
      },
    ],
  },
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    PRODUCTION: process.env.NODE_ENV === "production",
  },
  async redirects() {
    return [
      ...SOCIAL_REDIRECTS,
      ...PAGE_REDIRECTS,
      ...LEARNING_REDIRECTS,
      ...PROJECT_REDIRECTS,
    ];
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

module.exports = withBundleAnalyzer(nextConfig);
