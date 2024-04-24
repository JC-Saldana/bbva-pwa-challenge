/**
 * The name of the cache.
 * @type {string}
 */
const CACHE_NAME = "version-1";

/**
 * URLs to cache.
 * @type {Array<string>}
 */
const urlsToCache = ["index.html", "offline.html"];

/**
 * Reference to the global scope.
 * @type {ServiceWorkerGlobalScope}
 */
const self = this;

/**
 * Event listener for the 'install' event.
 * @param {ExtendableEvent} e - The install event object.
 */
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
  );
});

/**
 * Event listener for the 'fetch' event.
 * @param {FetchEvent} e - The fetch event object.
 */
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not found in cache - fetch from network
        return fetch(e.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== "basic") {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched response
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(e.request, responseToCache);
              });

            return response;
          })
          .catch(() => caches.match("offline.html")); // Offline fallback
      })
  );
});

/**
 * Event listener for the 'activate' event.
 * @param {ExtendableEvent} e - The activate event object.
 */
self.addEventListener("activate", e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
        return null;
      })
    ))
  );
});
