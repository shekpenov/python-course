const CACHE_NAME = 'python-course-v6';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/style.css',
  '/js/app.js',
  '/js/pyodide-runner.js',
  '/js/progress.js',
  '/icons/icon.svg',
  '/data/numbers.txt',
  '/data/students.txt',
  '/data/words.txt',
  '/modules/topic-basics.js',
  '/modules/topic-7321.js',
  '/modules/topic-7332.js',
  '/modules/topic-7333.js',
  '/modules/topic-7331.js',
  '/modules/topic-8332.js',
  '/modules/topic-8333.js',
  '/modules/topic-8321.js',
  '/modules/topic-9321.js',
  '/modules/topic-9331a.js',
  '/modules/topic-9331b.js',
  '/modules/topic-9332.js',
  '/modules/topic-10511.js',
  '/modules/topic-10512.js',
  '/modules/topic-10513.js'
];

const CDN_CACHE_NAME = 'python-course-cdn-v6';
const CDN_ORIGINS = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdn.jsdelivr.net'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== CDN_CACHE_NAME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (CDN_ORIGINS.some(o => url.hostname.includes(o))) {
    event.respondWith(staleWhileRevalidate(event.request, CDN_CACHE_NAME));
    return;
  }

  if (url.hostname === self.location.hostname || url.protocol === 'file:') {
    event.respondWith(cacheFirst(event.request, CACHE_NAME));
  }
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return new Response('Офлайн-режим: ресурс недоступен', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || fetchPromise;
}
