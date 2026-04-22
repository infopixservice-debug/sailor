// Service worker — The Great Expedition Codex
// Strategy: network-first for HTML (freshness), cache-first for assets (speed).
// v2 (2026-04-22): full sailor avatar coverage + post-message update flow.

const CACHE_VERSION = 'sailing-codex-v2';

const SAILOR_AVATARS = [
  'Ambitious', 'Born in the Sea', 'Calculating', 'Confident', 'Curious',
  'Diligent', 'Dreaming of a Full Haul', 'Enamored', 'Experienced', 'Honest',
  'Innocent', 'Powerful', 'Quick', 'Quick-Witted', 'Realistic',
  'Smart', 'Strong', 'Tenacious', 'Tough', 'Treasure Seeking'
].map((n) => '/assets/sailors/' + encodeURIComponent(n) + '.webp');

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/bg.webp',
  '/assets/bg.jpg',
  '/assets/mappa.webp',
  '/assets/mappa.jpg',
  '/assets/Corsair.webp',
  '/assets/Corsair.png',
  '/assets/og-preview.jpg',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/icon-512-maskable.png',
  '/assets/favicon.png',
  ...SAILOR_AVATARS
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      // Best-effort prefetch; ignore individual failures
      return Promise.allSettled(STATIC_ASSETS.map((u) => cache.add(u).catch(() => null)));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Allow page to trigger immediate activation after update detected
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Network-first for HTML — updates land on refresh
  const isHTML = req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html');
  if (isHTML) {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match('/index.html')))
    );
    return;
  }

  // Cache-first for assets
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy));
        }
        return res;
      });
    })
  );
});
