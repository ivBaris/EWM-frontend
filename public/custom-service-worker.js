importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

// workbox.core.skipWaiting();
// workbox.core.clientsClaim();

const bgSyncPlugin = new workbox.backgroundSync.Plugin("todoQueue", {
  maxRetentionTime: 24 * 60,
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
workbox.precaching.precacheAndRoute([]);
workbox.routing.registerRoute(/\.*$/, new workbox.strategies.CacheFirst());

const handlerCb = async ({ url, request, event, params }) => {
  const response = await fetch(request);
  const responseBody = await response.text();
  return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
};

workbox.routing.registerRoute(
  handlerCb,
  new workbox.strategies.CacheFirst({
    cacheName: "currencies",
  })
);

workbox.routing.registerRoute(
  "https://event-with-me.herokuapp.com/api/events",
  workbox.strategies.networkFirst({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);
