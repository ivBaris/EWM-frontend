importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

console.log("XD bin drin");

const backgroundSync = new workbox.backgroundSync.BackgroundSyncPlugin(
  "addEvent"
);

workbox.routing.registerRoute(
  ({ url }) =>
    url.pathname === "https://event-with-me.herokuapp.com/api/events",
  new workbox.strategies.NetworkOnly({ plugins: [backgroundSync] }),
  "POST"
);

workbox.routing.registerRoute(
  /\.*$/,
  new workbox.strategies.StaleWhileRevalidate({ cacheName: "static" })
);
workbox.routing.registerRoute(
  "/",
  new workbox.strategies.StaleWhileRevalidate({ cacheName: "static" })
);

const handlerCb = async ({ url, request, event, params }) => {
  const response = await fetch(request);
  const responseBody = await response.text();
  return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
};

workbox.routing.registerRoute(
  handlerCb,
  new workbox.strategies.CacheFirst({
    cacheName: "dynamic",
  })
);

if (process.env.NODE_ENV === "production") {
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
}
