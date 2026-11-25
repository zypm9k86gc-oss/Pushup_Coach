const CACHE = "super-paul-v45";
const CORE = [
  "./push-config.js?v=45",
  "./styles.css?v=45",
  "./app.js?v=45",
  "./manifest.webmanifest?v=45",
  "./icon-192.png?v=45",
  "./favicon-32.png?v=45",
  "./super-paul-icon.svg?v=45",
  "./stretch-calf.svg?v=45",
  "./stretch-quadriceps.svg?v=45",
  "./stretch-hamstring.svg?v=45",
  "./stretch-hip-flexor.svg?v=45",
  "./stretch-glute.svg?v=45",
  "./trainingsplan.json"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const req = event.request;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req, { cache: "no-store" })
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put("./", copy));
          return response;
        })
        .catch(() => caches.match("./").then(r => r || caches.match("./index.html")))
    );
    return;
  }

  const url = new URL(req.url);
  if (req.destination === "image" && url.hostname === "images.pexels.com") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      try {
        const response = await fetch(req);
        if (response && (response.ok || response.type === "opaque")) {
          await cache.put(req, response.clone());
        }
        return response;
      } catch (error) {
        if (cached) return cached;
        throw error;
      }
    })());
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req, { cache: "no-store" })
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then(cache => cache.put(req, copy));
          }
          return response;
        })
        .catch(() => caches.match(req))
    );
  }
});
