const CACHE_NAME = "my-cache";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.ico",
  "/logo.svg",
  "/workbox-v6.4.1/workbox-sw.js",
  "/workbox-v6.4.1/workbox-routing.js",
  "/workbox-v6.4.1/workbox-precaching.js",
  "/workbox-v6.4.1/workbox-core.js",
  "/workbox-v6.4.1/workbox-strategies.js",
  "/workbox-v6.4.1/workbox-cacheable-response.js",
  "/workbox-v6.4.1/workbox-background-sync.js",
  "/workbox-v6.4.1/workbox-expiration.js",
  "/workbox-v6.4.1/workbox-broadcast-update.js",
  "/workbox-v6.4.1/workbox-window.js",
  "/workbox-v6.4.1/file-manifest.js",
  "/workbox-v6.4.1/media-manifest.js",
  "/workbox-v6.4.1/workbox-navigation-preload.js",
  "/workbox-v6.4.1/offline-ga.js",
  "/workbox-v6.4.1/offline-analytics.js",
  "/_next/static/",
  "/static/",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
