/* eslint-disable no-undef */
if (workbox) {
  console.log(`Workbox is loaded 🎉`);
} else {
  console.log(`Workbox didn't load `);
}
// eslint-disable-next-line
workbox.precaching.precacheAndRoute(self.__precacheManifest);
// eslint-disable-next-line
self.addEventListener("install", (event) =>
  event.waitUntil(self.skipWaiting())
);
// eslint-disable-next-line
self.addEventListener("activate", (event) =>
  event.waitUntil(self.clients.claim())
);
// app-shell
workbox.routing.registerRoute("/", new workbox.strategies.NetworkFirst());

const bgSyncPlugin = new workbox.backgroundSync.Plugin("todoQueue", {
  maxRetentionTime: 24 * 60,
});

workbox.routing.registerRoute(
  "http://localhost:5000/api/events",
  console.log("hier"),
  new workbox.strategies.NetworkFirst({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);
