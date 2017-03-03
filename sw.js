/* global self, caches, fetch, Response, Headers */

const cacheName = 'asteroids-cache-v1';
const urlsToCache = [
  '',
  'index.html',
  'src/asteroids-apod.html',
  'src/asteroids-app.html',
  'src/asteroids-list.html',
  'src/asteroids-detail.html',
  'src/asteroids-route.html',
  'src/asteroids-single.html'
];

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Cache responses
self.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(cached => {
        const networked = fetch(event.request)
          .then(fetchedFromNetwork, unableToResolve)
          .catch(unableToResolve);

        return cached || networked;

        function fetchedFromNetwork(response) {
          const cacheCopy = response.clone();
          caches
            .open(cacheName)
            .then(cache => cache.put(event.request, cacheCopy));

          return response;
        }

        function unableToResolve() {
          return new Response('<h1>Service Unavailable</h1>', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          });
        }
      })
  );
});
