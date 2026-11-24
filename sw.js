const CACHE = "super-paul-v41";
const CORE = [
  "./push-config.js?v=41",
  "./styles.css?v=41",
  "./app.js?v=41",
  "./manifest.webmanifest?v=41",
  "./icon-192.png?v=41",
  "./favicon-32.png?v=41",
  "./super-paul-icon.svg?v=41",
  "./stretch-calf.svg?v=41",
  "./stretch-quadriceps.svg?v=41",
  "./stretch-hamstring.svg?v=41",
  "./stretch-hip-flexor.svg?v=41",
  "./stretch-glute.svg?v=41",
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
