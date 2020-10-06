importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

console.log("ServiceWorker...");

const FALLBACK_HTML_URL = "./offline.html";

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
  "https://event-with-me.herokuapp.com/api/events/event/\b[w=.]*",
  new workbox.strategies.NetworkOnly({
    plugins: new workbox.backgroundSync.BackgroundSyncPlugin("deleteEvent"),
  }),
  "DELETE"
);

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "383676" },
  { url: "/\b[w=.]*/profile", revision: "383679" },
  { url: FALLBACK_HTML_URL, revision: "383699" },
]);

workbox.routing.registerRoute(
  /\.*$/,
  new workbox.strategies.CacheFirst({ cacheName: "static" })
);
workbox.routing.registerRoute(
  "https://event-with-me.netlify.app/\b[w=.]*/profile",
  new workbox.strategies.CacheFirst({ cacheName: "profile" })
);

const handlerCb = async ({ url, request, event, params }) => {
  const response = await fetch(request);
  const responseBody = await response.text();
  console.log(response);
  console.log(responseBody);
  return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
};

workbox.routing.registerRoute(
  handlerCb,
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 1,
    cacheName: "dynamic",
    callback: FALLBACK_HTML_URL,
  })
);

self.addEventListener("push", (event) => {
  const data = event.data.json();
  const { title } = data;

  const body = {
    body: data.body,
    icon: "./apple-icon-60x60-dunplab-manifest-19505.png",
  };

  event.waitUntil(self.registration.showNotification(title, body));
});

// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// if (process.env.NODE_ENV === "production") {
//   workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
// }
