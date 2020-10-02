importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(
  "pwa-ewm",
  {
    maxRetentionTime: 24 * 60,
  }
);

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([]);
workbox.routing.registerRoute(/\.*$/, new workbox.strategies.CacheFirst());

// workbox.routing.registerRoute(
//   ({ url }) => url.origin === "https://hacker-news.firebaseio.com",
//   new workbox.strategies.StaleWhileRevalidate()
// );

const handlerCb = async ({ url, request, event, params }) => {
  const response = await fetch(request);
  const responseBody = await response.text();
  return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
};

workbox.routing.registerRoute(
  handlerCb,
  new workbox.strategies.CacheFirst({
    cacheName: "currencies",
    // plugins: [
    //   new workbox.expiration.Plugin({
    //     maxAgeSeconds: 10 * 60, // 10 minutes
    //   }),
    // ],
  })
);

// workbox.routing.registerRoute(
//   "http://localhost:5000/api/events",
//   new workbox.strategies.NetworkFirst(),
//   "GET"
// );

workbox.routing.registerRoute(
  handlerCb,
  new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);

self.addEventListener("push", (event) => {
  const title = "Get Started With Workbox";
  const options = {
    body: event.data.text(),
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
