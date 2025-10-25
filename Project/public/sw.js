const CACHE_NAME = 'uni-connect-smart-v2';
const PRE_CACHE_NAME = 'uni-connect-precache-v2';

const urlsToPreCache = [
  '/',
  '/login',
  '/register',
  '/offline.html',
  '/manifest.json',
];

const noCacheRoutes = [
  '/dashboard',
  '/admin',
  '/departments',
  '/events',
  '/docs',
  '/settings',
  '/api/'
];

self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(PRE_CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Pre-caching static pages');
        return cache.addAll(urlsToPreCache);
      })
      .then(() => self.skipWaiting())
      .catch(error => {
        console.error('Pre-caching failed:', error);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  const cacheWhitelist = [PRE_CACHE_NAME, CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith('/api/') ||
    event.request.method !== 'GET' ||
    url.protocol !== 'http:' && url.protocol !== 'https:') {
    return fetch(event.request);
  }

  const shouldNotCache = noCacheRoutes.some(route =>
    url.pathname.startsWith(route)
  );

  if (shouldNotCache) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          return new Response('Network error', { status: 408 });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(networkResponse => {
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch(error => {
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            throw error;
          });
      })
  );
});