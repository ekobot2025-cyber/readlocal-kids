// ReadLocal Kids - Self-Destructing Service Worker
// Automatically purges old 'readlocal-v1' cache and unregisters itself to prevent stale bundle lock-in.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => caches.delete(k)));
    }).then(() => {
      return self.registration.unregister();
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Network-only passthrough (never cache index.html or assets)
self.addEventListener("fetch", () => {
  // Let the browser handle fetches natively without blocking or caching
});
