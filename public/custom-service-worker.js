importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

console.log("XD bin drin");

const backgroundSyncAdd = new workbox.backgroundSync.BackgroundSyncPlugin(
  "addEvent"
);

const backgroundSyncNotify = new workbox.backgroundSync.BackgroundSyncPlugin(
  "notifyEvent"
);

workbox.routing.registerRoute(
  "https://event-with-me.herokuapp.com/api/events",
  new workbox.strategies.NetworkOnly({
    plugins: [backgroundSyncAdd],
  }),
  "POST"
);

workbox.routing.registerRoute(
  "https://event-with-me.herokuapp.com/api/events/notify",
  new workbox.strategies.NetworkOnly({
    plugins: [backgroundSyncNotify],
  }),
  "POST"
);

workbox.routing.registerRoute(
  /\.*$/,
  new workbox.strategies.CacheFirst({ cacheName: "static" })
);
workbox.routing.registerRoute(
  "/",
  new workbox.strategies.CacheFirst({ cacheName: "static" })
);

const handlerCb = async ({ url, request, event, params }) => {
  const response = await fetch(request);
  const responseBody = await response.text();
  return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
};

workbox.routing.registerRoute(
  handlerCb,
  new workbox.strategies.NetworkFirst({
    cacheName: "dynamic",
  })
);

self.addEventListener("push", (event) => {
  const data = event.data.json();
  const { title } = data;

  const body = {
    body: data.body,
  };

  event.waitUntil(self.registration.showNotification(title, body));
});

console.log("gemacht");

// if (process.env.NODE_ENV === "production") {
//   workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
// }
