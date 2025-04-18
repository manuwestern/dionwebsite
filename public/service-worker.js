// Service Worker für Dion Hair Clinic
const CACHE_NAME = 'dion-hair-clinic-v1';

// Assets, die beim Installieren des Service Workers gecacht werden sollen
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/DionHairClinic_Logo.svg',
  '/fonts/montserrat/montserrat-regular.woff2',
  '/fonts/montserrat/montserrat-medium.woff2',
  '/fonts/montserrat/montserrat-bold.woff2',
  '/fonts/montserrat/montserrat-semibold.woff2',
  '/fonts/montserrat/montserrat-light.woff2'
];

// Installieren des Service Workers
self.addEventListener('install', event => {
  console.log('Service Worker wird installiert');
  
  // Cache-Speicher öffnen und Dateien hinzufügen
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache geöffnet');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        // Sofortige Aktivierung des Service Workers ohne auf Reload zu warten
        return self.skipWaiting();
      })
  );
});

// Aktivieren des Service Workers
self.addEventListener('activate', event => {
  console.log('Service Worker wird aktiviert');
  
  // Alte Caches löschen
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log('Alter Cache wird gelöscht:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Service Worker übernimmt sofort die Kontrolle über alle Clients
      return self.clients.claim();
    })
  );
});

// Netzwerkanfragen abfangen
self.addEventListener('fetch', event => {
  // Nur GET-Anfragen behandeln
  if (event.request.method !== 'GET') return;
  
  // Anfragen an externe Domains ignorieren
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  
  // API-Anfragen immer ans Netzwerk weiterleiten
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(event.request));
    return;
  }
  
  // HTML-Seiten immer ans Netzwerk weiterleiten, mit Fallback auf den Cache
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(networkFirst(event.request));
    return;
  }
  
  // Für alle anderen Ressourcen: Cache-First-Strategie
  event.respondWith(cacheFirst(event.request));
});

// Cache-First-Strategie: Zuerst im Cache suchen, dann im Netzwerk
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Nur gültige Antworten cachen
    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Bei Netzwerkfehlern: Offline-Fallback anzeigen
    console.error('Fetch fehlgeschlagen:', error);
    
    // Wenn es sich um ein Bild handelt, Platzhalter-Bild zurückgeben
    if (request.destination === 'image') {
      return caches.match('/images/DionHairClinic_Logo.svg');
    }
    
    // Für andere Ressourcen: Offline-Seite anzeigen
    return caches.match('/offline.html');
  }
}

// Network-First-Strategie: Zuerst im Netzwerk suchen, dann im Cache
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Nur gültige Antworten cachen
    if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Fetch fehlgeschlagen:', error);
    
    // Bei Netzwerkfehlern: Aus dem Cache bedienen
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Wenn nichts im Cache ist: Offline-Seite anzeigen
    return caches.match('/offline.html');
  }
}

// Push-Benachrichtigungen empfangen
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  
  const options = {
    body: data.body || 'Neue Nachricht von Dion Hair Clinic',
    icon: '/images/DionHairClinic_Logo.svg',
    badge: '/images/notification-badge.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Dion Hair Clinic', options)
  );
});

// Auf Klick auf Benachrichtigung reagieren
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // Wenn bereits ein Fenster geöffnet ist, fokussieren
      for (const client of clientList) {
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Ansonsten neues Fenster öffnen
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
