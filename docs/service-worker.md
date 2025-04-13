# Service Worker für Dion Hair Clinic

Diese Dokumentation erklärt die Implementierung des Service Workers für die Dion Hair Clinic Website, der für verbesserte Performance, Offline-Funktionalität und eine bessere Benutzererfahrung sorgt.

## Überblick

Der Service Worker ist ein Skript, das im Hintergrund läuft und verschiedene Funktionen bietet:

1. **Caching statischer Assets**: Bilder, CSS, JavaScript und Schriftarten werden lokal gespeichert
2. **Offline-Funktionalität**: Wichtige Seiten sind auch ohne Internetverbindung verfügbar
3. **Verbesserte Ladezeiten**: Durch intelligentes Caching werden wiederkehrende Besuche beschleunigt
4. **Update-Benachrichtigungen**: Benutzer werden informiert, wenn neue Inhalte verfügbar sind

## Implementierte Dateien

- `public/service-worker.js`: Der eigentliche Service Worker mit Caching-Strategien
- `public/offline.html`: Eine Offline-Seite, die angezeigt wird, wenn keine Internetverbindung besteht
- `src/utils/service-worker-registration.ts`: Hilfsfunktionen zur Registrierung und Verwaltung des Service Workers

## Caching-Strategien

Der Service Worker verwendet verschiedene Caching-Strategien für unterschiedliche Ressourcentypen:

### 1. Bilder (Cache, dann Netzwerk mit Cache-Update)

```javascript
// Strategie für Bilder
if (url.pathname.match(/\.(jpe?g|png|gif|svg|webp)$/)) {
  event.respondWith(handleImageRequest(event.request));
  return;
}
```

- Bilder werden zuerst aus dem Cache geladen (schnelle Anzeige)
- Im Hintergrund wird geprüft, ob eine neuere Version verfügbar ist
- Der Cache wird aktualisiert, wenn eine neuere Version gefunden wird

### 2. Schriftarten (Cache, dann Netzwerk)

```javascript
// Strategie für Schriftarten
if (url.pathname.match(/\.(woff2?|ttf|otf|eot)$/)) {
  event.respondWith(handleFontRequest(event.request));
  return;
}
```

- Schriftarten werden dauerhaft gecacht, da sie sich selten ändern
- Wenn sie nicht im Cache sind, werden sie vom Netzwerk geladen und gecacht

### 3. HTML-Seiten (Netzwerk, dann Cache)

```javascript
// Strategie für HTML-Seiten
if (url.pathname.endsWith('/') || url.pathname.match(/\.(html?)$/)) {
  event.respondWith(handlePageRequest(event.request));
  return;
}
```

- Seiten werden immer zuerst vom Netzwerk geladen (aktuelle Inhalte)
- Bei Netzwerkfehlern wird auf die gecachte Version zurückgegriffen
- Wenn keine gecachte Version verfügbar ist, wird die Offline-Seite angezeigt

### 4. Andere Assets (Stale-While-Revalidate)

```javascript
// Strategie für alle anderen Assets
event.respondWith(handleStaticRequest(event.request));
```

- Assets werden aus dem Cache geladen, während im Hintergrund aktualisiert wird
- Kombiniert schnelle Anzeige mit aktuellen Inhalten

## Offline-Funktionalität

Der Service Worker cached wichtige Seiten beim Installieren:

```javascript
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
```

Wenn eine Seite offline nicht verfügbar ist, wird die `offline.html` angezeigt, die:

- Den Benutzer informiert, dass keine Internetverbindung besteht
- Eine Schaltfläche zur Startseite bietet
- Automatisch aktualisiert, wenn die Verbindung wiederhergestellt wird

## Update-Mechanismus

Der Service Worker prüft regelmäßig auf Updates:

```javascript
// Überprüfe regelmäßig auf Updates
setInterval(() => {
  checkForUpdates(swUrl);
}, 60 * 60 * 1000); // Überprüfe stündlich
```

Wenn ein Update verfügbar ist:
1. Der neue Service Worker wird im Hintergrund installiert
2. Der Benutzer wird benachrichtigt (Notification oder Banner)
3. Nach Bestätigung wird die Seite neu geladen, um den neuen Service Worker zu aktivieren

## Aktivierung

Der Service Worker wird nur in der Produktionsumgebung aktiviert:

```typescript
// In main.tsx
if (process.env.NODE_ENV !== 'production') {
  // Only enable in development mode for now
  console.log('Performance monitoring enabled in development mode');
  initPerformanceMonitoring();
} else {
  // Register service worker only in production mode
  registerServiceWorker();
}
```

Dies verhindert Probleme während der Entwicklung, wie z.B. veraltete Caches.

## Vorteile für SEO und Performance

1. **Verbesserte Core Web Vitals**:
   - Schnellere Ladezeiten (LCP - Largest Contentful Paint)
   - Reduzierte Layout-Verschiebungen (CLS - Cumulative Layout Shift)
   - Bessere Interaktivität (FID - First Input Delay)

2. **Höhere Benutzerzufriedenheit**:
   - Schnellere Seitenwechsel für wiederkehrende Besucher
   - Funktionalität auch bei instabiler Internetverbindung
   - Nahtlose Updates ohne Unterbrechung

3. **Bessere SEO-Rankings**:
   - Google berücksichtigt Seitengeschwindigkeit und Core Web Vitals
   - Progressive Web App (PWA) Funktionalität wird positiv bewertet

## Wartung und Aktualisierung

Bei größeren Änderungen an der Website sollte die Version des Service Workers aktualisiert werden:

```javascript
// Cache-Namen
const STATIC_CACHE_NAME = 'dion-static-v1'; // Versionsnummer erhöhen
const IMAGES_CACHE_NAME = 'dion-images-v1';
const FONTS_CACHE_NAME = 'dion-fonts-v1';
const PAGES_CACHE_NAME = 'dion-pages-v1';
```

Dies erzwingt ein Update des Service Workers und stellt sicher, dass alle Benutzer die neueste Version erhalten.

## Fehlerbehebung

Wenn Probleme mit dem Service Worker auftreten:

1. In Chrome: `chrome://serviceworker-internals/` öffnen
2. Den Service Worker für die Website finden und "Unregister" klicken
3. Die Seite neu laden

Alternativ kann der Service Worker programmatisch deregistriert werden:

```typescript
import { unregisterServiceWorker } from './utils/service-worker-registration';

// Service Worker deregistrieren
unregisterServiceWorker();
```

## Weiterentwicklung

Mögliche zukünftige Erweiterungen:

1. **Push-Benachrichtigungen**: Für wichtige Updates oder Angebote
2. **Background Sync**: Für Formulare, die offline ausgefüllt werden
3. **Periodic Background Sync**: Für regelmäßige Inhalts-Updates im Hintergrund
4. **Content Prefetching**: Vorhersage und Vorladen von Inhalten, die der Benutzer wahrscheinlich als nächstes besuchen wird
