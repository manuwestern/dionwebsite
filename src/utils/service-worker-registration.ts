/**
 * Service Worker Registration
 * 
 * Diese Datei enthält die Logik zur Registrierung des Service Workers
 * und zur Benachrichtigung des Benutzers über Updates.
 */

// Prüfe, ob Service Worker unterstützt werden
const isServiceWorkerSupported = 'serviceWorker' in navigator;

/**
 * Registriert den Service Worker
 */
export function registerServiceWorker() {
  if (!isServiceWorkerSupported) {
    console.log('Service Worker werden von diesem Browser nicht unterstützt.');
    return;
  }
  
  // Registriere den Service Worker erst nach dem Laden der Seite,
  // um die Erstladezeit nicht zu beeinträchtigen
  window.addEventListener('load', () => {
    const swUrl = '/service-worker.js';
    
    registerValidSW(swUrl);
    
    // Überprüfe regelmäßig auf Updates
    setInterval(() => {
      checkForUpdates(swUrl);
    }, 60 * 60 * 1000); // Überprüfe stündlich
  });
}

/**
 * Registriert den Service Worker und behandelt Updates
 */
function registerValidSW(swUrl: string) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      // Erfolgreiche Registrierung
      console.log('Service Worker erfolgreich registriert:', registration);
      
      // Event-Handler für Updates
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;
        
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Ein neuer Service Worker wurde installiert
              console.log('Neuer Service Worker verfügbar. Seite neu laden, um Updates zu aktivieren.');
              showUpdateNotification();
            } else {
              // Erster Service Worker wurde installiert
              console.log('Service Worker installiert. Inhalte werden für Offline-Nutzung gecacht.');
              showOfflineReadyNotification();
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Fehler bei der Registrierung des Service Workers:', error);
    });
}

/**
 * Überprüft, ob ein Update für den Service Worker verfügbar ist
 */
function checkForUpdates(swUrl: string) {
  // Überprüfe, ob der Service Worker aktualisiert werden kann
  navigator.serviceWorker.getRegistration(swUrl).then((registration) => {
    if (registration) {
      registration.update().catch((error) => {
        console.error('Fehler beim Überprüfen auf Updates:', error);
      });
    }
  });
}

/**
 * Zeigt eine Benachrichtigung an, wenn ein Update verfügbar ist
 */
function showUpdateNotification() {
  // Implementiere hier eine Benachrichtigung für den Benutzer
  // z.B. mit einem Toast oder einem Banner
  
  // Beispiel für eine einfache Benachrichtigung
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Dion Hair Clinic', {
      body: 'Ein Update ist verfügbar. Bitte laden Sie die Seite neu, um die neuesten Funktionen zu erhalten.',
      icon: '/images/DionHairClinic_Logo.svg'
    });
  } else {
    // Fallback für Browser ohne Notification API oder ohne Berechtigung
    const updateBanner = document.createElement('div');
    updateBanner.style.position = 'fixed';
    updateBanner.style.bottom = '0';
    updateBanner.style.left = '0';
    updateBanner.style.right = '0';
    updateBanner.style.backgroundColor = '#7BA7C2';
    updateBanner.style.color = 'white';
    updateBanner.style.padding = '1rem';
    updateBanner.style.textAlign = 'center';
    updateBanner.style.zIndex = '9999';
    
    updateBanner.innerHTML = `
      <p style="margin: 0; display: flex; justify-content: space-between; align-items: center;">
        <span>Ein Update ist verfügbar. Bitte laden Sie die Seite neu, um die neuesten Funktionen zu erhalten.</span>
        <button style="background: white; color: #7BA7C2; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-left: 1rem;">
          Jetzt aktualisieren
        </button>
        <button style="background: none; border: none; color: white; cursor: pointer; font-size: 1.5rem; margin-left: 1rem;">
          &times;
        </button>
      </p>
    `;
    
    document.body.appendChild(updateBanner);
    
    // Event-Handler für die Schaltflächen
    const updateButton = updateBanner.querySelector('button:first-of-type');
    const closeButton = updateBanner.querySelector('button:last-of-type');
    
    if (updateButton) {
      updateButton.addEventListener('click', () => {
        window.location.reload();
      });
    }
    
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        updateBanner.remove();
      });
    }
  }
}

/**
 * Zeigt eine Benachrichtigung an, wenn die Offline-Funktionalität bereit ist
 */
function showOfflineReadyNotification() {
  // Implementiere hier eine Benachrichtigung für den Benutzer
  // z.B. mit einem Toast oder einem Banner
  
  // Beispiel für eine einfache Benachrichtigung
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('Dion Hair Clinic', {
      body: 'Die Website ist jetzt für die Offline-Nutzung verfügbar.',
      icon: '/images/DionHairClinic_Logo.svg'
    });
  }
  // Für diesen Fall keine Banner-Benachrichtigung, da es für den Benutzer nicht so wichtig ist
}

/**
 * Deregistriert den Service Worker und löscht alle Caches
 */
export function unregisterServiceWorker() {
  if (!isServiceWorkerSupported) return;
  
  navigator.serviceWorker.ready
    .then((registration) => {
      registration.unregister();
    })
    .then(() => {
      // Lösche alle Caches
      return caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          })
        );
      });
    })
    .catch((error) => {
      console.error('Fehler beim Deregistrieren des Service Workers:', error);
    });
}
