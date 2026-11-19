const CACHE_VERSION = 'v2-' + Date.now();
const CACHE_NAME = 'amos-frank-portfolio-' + CACHE_VERSION;
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/amos-hero.avif',
  '/amos-hero.webp',
  '/amos-hero.jpg',
  '/manifest.json',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/fonts/Space-Grotesk-700.woff2',
  '/fonts/Outfit-400.woff2',
];

// Install — cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, cross-origin, robots.txt, and sitemap.xml
  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.pathname === '/robots.txt' ||
    url.pathname === '/sitemap.xml' ||
    url.pathname === '/sw.js'
  ) {
    return;
  }

  // Static assets (fonts, images, styles, scripts) — Stale-While-Revalidate
  if (
    request.destination === 'image' ||
    request.destination === 'font' ||
    request.destination === 'style' ||
    request.destination === 'script'
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => cached || new Response('', { status: 404, statusText: 'Offline' }));

        return cached || fetchPromise;
      })
    );
    return;
  }

  // Navigation / HTML pages — Network First, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request) || caches.match('/'))
  );
});
