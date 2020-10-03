import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, NetworkOnly } from "workbox-strategies";
import { BackgroundSyncPlugin } from "workbox-background-sync";
import process from "process";

/* eslint-disable no-undef */
if (workbox) {
  console.log(`Workbox is loaded 🎉`);
} else {
  console.log(`Workbox didn't load `);
}

// eslint-disable-next-line
self.addEventListener("install", (event) =>
  event.waitUntil(self.skipWaiting())
);
// eslint-disable-next-line
self.addEventListener("activate", (event) =>
  event.waitUntil(self.clients.claim())
);

precacheAndRoute([]);
registerRoute(/\.*$/, new workbox.strategies.CacheFirst());

const handlerCb = async ({ url, request, event, params }) => {
  const response = await fetch(request);
  const responseBody = await response.text();
  return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
};

registerRoute(
  handlerCb,
  new CacheFirst({
    cacheName: "currencies",
  })
);

// app-shell
registerRoute("/", new workbox.strategies.NetworkFirst());

const backgroundSync = new BackgroundSyncPlugin("addEvent");

registerRoute(
  "https://event-with-me.herokuapp.com/api/events",
  console.log("hier"),
  new NetworkOnly({ plugins: [backgroundSync] }),
  "POST"
);

if (process.env.NODE_ENV === "production") {
  precacheAndRoute(self.__WB_MANIFEST);
}
