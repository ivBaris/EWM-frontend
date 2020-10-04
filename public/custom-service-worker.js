importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

console.log("XD bin drin");

// const backgroundSync =

self.addEventListener("fetch", (event) => {
  if (event.request.method === "POST") {
    // workbox.routing.registerRoute(
    //   "https://event-with-me.herokuapp.com/api/events",

    //   new workbox.strategies.NetworkOnly({
    //     plugins: [backgroundSync],
    //   }),
    //   console.log(
    //     new workbox.strategies.NetworkOnly({
    //       plugins: [backgroundSync],
    //     })
    //   ),
    //   console.log("hier die url "),
    //   "POST"
    // );
    new workbox.backgroundSync.BackgroundSyncPlugin("addEvent");
  } else {
    console.log("Will nicht");
  }
});

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

// if (process.env.NODE_ENV === "production") {
// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
// }
