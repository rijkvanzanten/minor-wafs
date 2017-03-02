/* global self, caches, fetch */

const cacheName = 'asteroids-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/asteroids-apod.html',
  '/src/asteroids-app.html',
  '/src/asteroids-list.html'
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
    caches.match(event.request)
      .then(response => {
        if(response) {
          return response;
        }

        // Clone the request. Fetch streams can only be consumed once.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(cacheName)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
