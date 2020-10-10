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

const handlerCb = async ({ request }) => {
  const response = await fetch(request);
  const responseBody = await response.text();
  return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
};

// workbox.routing.registerRoute(
//   handlerCb,
//   new workbox.strategies.NetworkFirst({
//     networkTimeoutSeconds: 1,
//     cacheName: "dynamic",
//   })
// );

// var networkFirst = workbox.strategies.networkFirst({
//   networkTimeoutSeconds: 1,
//   cacheName: "dynamic",
// });

// workbox.routing.registerRoute(handlerCb, ({ event }) => {
//   return networkFirst
//     .handle({ event })
//     .then((response) => {
//       return response || caches.match(FALLBACK_HTML_URL);
//     })
//     .catch(() => caches.match(FALLBACK_HTML_URL));
// });

var networkFirst = workbox.strategies.networkFirst({
  cacheName: "cache-pages",
});

// const customHandler = async (args) => {
//   try {
//     const response = await networkFirst.handle(args);
//     return response || (await caches.match(FALLBACK_HTML_URL));
//   } catch (error) {
//     return await caches.match(FALLBACK_HTML_URL);
//   }
// };

const CACHE_NAME = "offline-html";

self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(FALLBACK_HTML_URL))
  );
});

workbox.navigationPreload.enable();

const networkFirst = new workbox.strategies.networkFirst({
  cacheName: "cache-pages",
});

const navigationHandler = async (params) => {
  try {
    // Attempt a network request.
    return await networkFirst.handle(params);
  } catch (error) {
    // If it fails, return the cached HTML.
    return caches.match(FALLBACK_HTML_URL, {
      cacheName: CACHE_NAME,
    });
  }
};

// workbox.routing.registerRoute(handlerCb, customHandler);

self.addEventListener("push", (event) => {
  const data = event.data.json();
  const { title } = data;

  const body = {
    body: data.body,
    icon: "./apple-icon-60x60-dunplab-manifest-19505.png",
  };

  event.waitUntil(self.registration.showNotification(title, body));
});

const queue = new workbox.backgroundSync.Queue("myQueueName");

self.addEventListener("fetch", (event) => {
  const promiseChain = fetch(event.request.clone()).catch((err) => {
    return queue.pushRequest({ request: event.request });
  });

  event.waitUntil(promiseChain);
});
