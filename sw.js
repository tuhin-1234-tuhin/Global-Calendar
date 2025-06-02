const CACHE_NAME = 'global-calendar-v1'; // Consider incrementing version if you make significant changes
const urlsToCache = [
    '/', // Caches the root, often serves index.html
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png',
    'icons/icon-maskable-192x192.png', // Make sure these paths are correct
    'icons/icon-maskable-512x512.png', // Make sure these paths are correct
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment-hijri/1.2.2/moment-hijri.js',
    'https://source.unsplash.com/random/800x1200?nature,abstract' // For glassmorphic theme background
];

// Install event: open cache and add app shell files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and caching app shell');
                // Add all URLs, but don't fail install if one of the external/optional ones fails
                // Especially for the Unsplash URL which might be rate-limited or change
                const promises = urlsToCache.map(urlToCache => {
                    return cache.add(urlToCache).catch(err => {
                        console.warn(`Failed to cache ${urlToCache}: ${err}`);
                    });
                });
                return Promise.all(promises);
            })
            .then(() => self.skipWaiting()) // Force activation of new service worker
    );
});

// Fetch event: serve cached content or fetch from network
self.addEventListener('fetch', event => {
    // For Unsplash images, try network first then cache to get fresh images if possible
    // but fall back to cache if offline.
    if (event.request.url.includes('source.unsplash.com')) {
        event.respondWith(
            fetch(event.request)
                .then(networkResponse => {
                    // Clone the response to cache it and also return it
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    return networkResponse;
                })
                .catch(() => {
                    // If network fails, try to get it from the cache
                    return caches.match(event.request);
                })
        );
        return;
    }

    // For other requests, use cache-first strategy
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Cache hit
                }
                // Not in cache, fetch from network
                return fetch(event.request).then(
                    networkResponse => {
                        // Optionally cache new requests dynamically
                        // Be careful with caching everything, especially third-party APIs
                        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
                             // Don't cache if it's not a GET request or if it's an opaque response (like from no-cors requests)
                            if (networkResponse.type === 'basic' || networkResponse.type === 'cors') {
                                const responseToCache = networkResponse.clone();
                                caches.open(CACHE_NAME)
                                    .then(cache => {
                                        cache.put(event.request, responseToCache);
                                    });
                            }
                        }
                        return networkResponse;
                    }
                );
            })
    );
});


// Activate event: clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Take control of uncontrolled clients
    );
});