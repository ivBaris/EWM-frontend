importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

console.log("ServiceWorker...");

const FALLBACK_HTML_URL = "./offline.html";

// const backgroundSyncAdd = new workbox.backgroundSync.BackgroundSyncPlugin(
//   "addEvent"
// );

// const backgroundSyncNotify = new workbox.backgroundSync.BackgroundSyncPlugin(
//   "notifyEvent"
// );

// workbox.routing.registerRoute(
//   "http://localhost:5000/api/events",
//   new workbox.strategies.NetworkOnly({
//     plugins: [backgroundSyncAdd],
//   }),
//   "POST"
// );

// workbox.routing.registerRoute(
//   "https://event-with-me.herokuapp.com/api/events/notify",
//   new workbox.strategies.NetworkOnly({
//     plugins: [backgroundSyncNotify],
//   }),
//   "POST"
// );

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "383676" },
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

const handlerCb = async ({ request }) => {
  const response = await fetch(request);
  const responseBody = await response.text();
  return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
};

workbox.routing.registerRoute(
  handlerCb,
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 1,
    cacheName: "dynamic",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

// self.addEventListener("push", (event) => {
//   const data = event.data.json();
//   const { title } = data;

//   const body = {
//     body: data.body,
//     icon: "./apple-icon-60x60-dunplab-manifest-19505.png",
//   };

//   event.waitUntil(self.registration.showNotification(title, body));
// });

const queue = new workbox.backgroundSync.Queue("myQueueName");

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    const promiseChain = fetch(event.request.clone()).catch((err) => {
      return queue.pushRequest({ request: event.request });
    });

    event.waitUntil(promiseChain);
  }
});
