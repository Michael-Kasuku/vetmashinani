const CACHE_NAME = "vet-mashinani-cache";
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
    '/assets/js/main.ts',
    '/src/App.tsx'
];

// Install the service worker and cache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch assets from cache or the network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;  // Serve from cache
            } else {
                return fetch(event.request);  // Fetch from network
            }
        })
    );
});
