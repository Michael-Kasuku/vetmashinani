const CACHE_NAME = "vet-mashinani-cache-v1";
const urlsToCache = [
    '/',
    '/terms',
    '/privacy',
    '/assets/img/about.png',
    '/assets/img/hero.png',
    '/assets/img/vetmashinani.ico',
    '/assets/img/vetmashinani.png',
    '/assets/img/team/josphine.png',
    '/assets/img/team/kasuku.png',
    '/assets/img/team/lopez.png',
    '/assets/css/main.css',
    '/assets/js/main.js',
];

// Install the service worker and cache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }).catch(error => {
            console.error('Failed to cache assets on install:', error);
        })
    );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`Deleting old cache: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            self.clients.claim();
        })
    );
});

// Fetch assets from cache or the network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;  // Serve from cache
            }
            return fetch(event.request).then((networkResponse) => {
                if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200) {
                    const clonedResponse = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, clonedResponse);
                    });
                }
                return networkResponse;
            }).catch(error => {
                console.error('Network request failed, returning offline fallback if available.', error);
                // Optionally return a fallback page for offline access
                return caches.match('/');
            });
        })
    );
});
