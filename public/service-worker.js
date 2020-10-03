importScripts("/precache-manifest.8672820fc8c8b15cae2108fb21b524a5.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, NetworkOnly } from "workbox-strategies";
import { BackgroundSyncPlugin } from "workbox-background-sync";
import process from "process";

const backgroundSync = new BackgroundSyncPlugin("addEvent");

registerRoute(
  "https://event-with-me.herokuapp.com/api/events",
  new NetworkOnly({ plugins: [backgroundSync] }),
  "POST"
);

registerRoute(/\.*$/, new StaleWhileRevalidate({ cacheName: "static" }));
registerRoute("/", new StaleWhileRevalidate({ cacheName: "static" }));

const handlerCb = async ({ url, request, event, params }) => {
  const response = await fetch(request);
  const responseBody = await response.text();
  return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
};

registerRoute(
  handlerCb,
  new CacheFirst({
    cacheName: "dynamic",
  })
);

if (process.env.NODE_ENV === "production") {
  precacheAndRoute(self.__WB_MANIFEST);
}
