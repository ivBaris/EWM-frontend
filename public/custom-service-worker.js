importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

console.log("ServiceWorker...");

const FALLBACK_HTML_URL = "./offline.html";

workbox.precaching.precacheAndRoute([
  { url: "/", revision: "383676" },
  { url: FALLBACK_HTML_URL, revision: "383699" },
]);

workbox.routing.registerRoute(
  /\.*$/,
  new workbox.strategies.CacheFirst({ cacheName: "static" })
);

const handlerCb = async ({ request }) => {
  const response = await fetch(request);
  const responseBody = await response.text();
  return new Response(`${responseBody}`);
};

workbox.routing.registerRoute(
  handlerCb,
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 2,
    cacheName: "dynamic",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
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

const queue = new workbox.backgroundSync.Queue("fetchEvents");

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    const promiseChain = fetch(event.request.clone()).catch((err) => {
      return queue.pushRequest({ request: event.request });
    });

    event.waitUntil(promiseChain);
  }
});
