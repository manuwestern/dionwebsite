/**
 * Service Worker für Dion Hair Clinic
 * 
 * Dieser Service Worker bietet:
 * - Caching statischer Assets (Bilder, CSS, JS, Fonts)
 * - Offline-Funktionalität für wichtige Seiten
 * - Verbessertes Caching für wiederkehrende Besucher
 */

// Cache-Namen
const STATIC_CACHE_NAME = 'dion-static-v1';
const IMAGES_CACHE_NAME = 'dion-images-v1';
const FONTS_CACHE_NAME = 'dion-fonts-v1';
const PAGES_CACHE_NAME = 'dion-pages-v1';

// Assets, die beim Installieren des Service Workers gecacht werden sollen
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/main.tsx',
  '/images/DionHairClinic_Logo.svg',
  '/fonts/montserrat/montserrat-regular.woff2',
  '/fonts/montserrat/montserrat-medium.woff2',
  '/fonts/montserrat/montserrat-bold.woff2'
];

// Wichtige Seiten, die für Offline-Zugriff gecacht werden sollen
const IMPORTANT_PAGES = [
  '/',
  '/haartransplantation',
  '/barthaartransplantation',
  '/augenbrauentransplantation',
  '/haarausfall-therapie',
  '/klinik',
  '/preise',
  '/kontakt'
];

// Installationsphase - Cache statische Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      // Cache statische Assets
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache wichtige Seiten
      caches.open(PAGES_CACHE_NAME).then((cache) => {
        return cache.addAll(IMPORTANT_PAGES);
      })
    ])
    .then(() => {
      // Skip waiting, damit der Service Worker sofort aktiviert wird
      return self.skipWaiting();
    })
  );
});

// Aktivierungsphase - Alte Caches löschen
self.addEventListener('activate', (event) => {
  const currentCaches = [
    STATIC_CACHE_NAME,
    IMAGES_CACHE_NAME,
    FONTS_CACHE_NAME,
    PAGES_CACHE_NAME
  ];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            // Lösche alte Caches
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      // Übernimm die Kontrolle über alle Clients
      return self.clients.claim();
    })
  );
});

// Fetch-Event - Netzwerkanfragen abfangen und cachen
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Ignoriere nicht-GET-Anfragen und Anfragen an externe Domains
  if (
    event.request.method !== 'GET' ||
    !url.origin.includes(self.location.origin)
  ) {
    return;
  }
  
  // Strategie für Bilder: Cache, dann Netzwerk (mit Cache-Update)
  if (url.pathname.match(/\.(jpe?g|png|gif|svg|webp)$/)) {
    event.respondWith(handleImageRequest(event.request));
    return;
  }
  
  // Strategie für Schriftarten: Cache, dann Netzwerk (mit Cache-Update)
  if (url.pathname.match(/\.(woff2?|ttf|otf|eot)$/)) {
    event.respondWith(handleFontRequest(event.request));
    return;
  }
  
  // Strategie für HTML-Seiten: Netzwerk, dann Cache
  if (url.pathname.endsWith('/') || url.pathname.match(/\.(html?)$/)) {
    event.respondWith(handlePageRequest(event.request));
    return;
  }
  
  // Strategie für alle anderen Assets: Stale-While-Revalidate
  event.respondWith(handleStaticRequest(event.request));
});

/**
 * Behandelt Anfragen für Bilder
 * Strategie: Cache, dann Netzwerk (mit Cache-Update)
 */
async function handleImageRequest(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Aktualisiere den Cache im Hintergrund
    updateCache(request, IMAGES_CACHE_NAME);
    return cachedResponse;
  }
  
  // Wenn nicht im Cache, hole vom Netzwerk und cache
  return fetchAndCache(request, IMAGES_CACHE_NAME);
}

/**
 * Behandelt Anfragen für Schriftarten
 * Strategie: Cache, dann Netzwerk (mit Cache-Update)
 */
async function handleFontRequest(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Wenn nicht im Cache, hole vom Netzwerk und cache
  return fetchAndCache(request, FONTS_CACHE_NAME);
}

/**
 * Behandelt Anfragen für HTML-Seiten
 * Strategie: Netzwerk, dann Cache
 */
async function handlePageRequest(request) {
  try {
    // Versuche zuerst, die Seite vom Netzwerk zu holen
    const networkResponse = await fetch(request);
    
    // Cache die Seite für Offline-Zugriff
    const cache = await caches.open(PAGES_CACHE_NAME);
    cache.put(request, networkResponse.clone());
    
    return networkResponse;
  } catch (error) {
    // Bei Netzwerkfehler, versuche aus dem Cache zu laden
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Wenn die Seite nicht im Cache ist, zeige die Offline-Seite
    return caches.match('/offline.html') || new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/html'
      })
    });
  }
}

/**
 * Behandelt Anfragen für statische Assets (JS, CSS, etc.)
 * Strategie: Stale-While-Revalidate
 */
async function handleStaticRequest(request) {
  // Prüfe zuerst den Cache
  const cachedResponse = await caches.match(request);
  
  // Starte eine Netzwerkanfrage, unabhängig vom Cache-Status
  const fetchPromise = fetchAndCache(request, STATIC_CACHE_NAME)
    .catch(() => {
      // Ignoriere Netzwerkfehler, da wir möglicherweise bereits eine Cache-Antwort haben
    });
  
  // Wenn wir eine Cache-Antwort haben, gib sie zurück und aktualisiere den Cache im Hintergrund
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Wenn keine Cache-Antwort, warte auf die Netzwerkanfrage
  return fetchPromise;
}

/**
 * Hilfsfunktion: Hole eine Ressource vom Netzwerk und cache sie
 */
async function fetchAndCache(request, cacheName) {
  const response = await fetch(request);
  
  // Nur erfolgreiche Antworten cachen
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  
  return response;
}

/**
 * Hilfsfunktion: Aktualisiere den Cache im Hintergrund
 */
async function updateCache(request, cacheName) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response);
    }
  } catch (error) {
    // Ignoriere Netzwerkfehler bei der Cache-Aktualisierung
  }
}
