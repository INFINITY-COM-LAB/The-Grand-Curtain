// Service Worker for The Grand Curtain - Offline Support & Asset Caching

const CACHE_VERSION = "v1.0.0";
const CACHE_NAME = `grand-curtain-${CACHE_VERSION}`;
const RUNTIME_CACHE = `grand-curtain-runtime-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
];

const RUNTIME_URLS = [
  "/api/",
];

const cacheStrategies = {
  networkFirst: async (request: Request): Promise<Response> => {
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await caches.match(request);
      if (cached) return cached;
      throw error;
    }
  },

  cacheFirst: async (request: Request): Promise<Response> => {
    const cached = await caches.match(request);
    if (cached) return cached;
    
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      return new Response("Offline - Asset not cached", { status: 503 });
    }
  },

  staleWhileRevalidate: async (request: Request): Promise<Response> => {
    const cached = await caches.match(request);
    const fetchPromise = fetch(request).then((response) => {
      if (response.ok) {
        const cache = caches.open(RUNTIME_CACHE);
        cache.then((c) => c.put(request, response.clone()));
      }
      return response;
    });
    return cached || fetchPromise;
  },
};

self.addEventListener("install", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        PRECACHE_ASSETS.map((asset) =>
          fetch(asset)
            .then((response) => {
              if (response.ok) {
                return cache.put(asset, response);
              }
            })
            .catch(() => {
              console.warn(`Failed to precache: ${asset}`);
            })
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") {
    return;
  }

  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  let strategy = cacheStrategies.cacheFirst;

  if (RUNTIME_URLS.some((pattern) => url.pathname.startsWith(pattern))) {
    strategy = cacheStrategies.networkFirst;
  }

  event.respondWith(
    strategy(request).catch(() => {
      return new Response(
        "Offline - This resource is not available",
        {
          status: 503,
          statusText: "Service Unavailable",
          headers: new Headers({
            "Content-Type": "text/plain",
          }),
        }
      );
    })
  );
});

export {};
