# Bildoptimierung für SEO

Dieses Verzeichnis enthält Skripte zur Optimierung der Bilder auf der Website für bessere SEO und Performance.

## Skripte

### 1. optimize-images.js

Dieses Skript optimiert alle Bilder im `public/images` Verzeichnis und konvertiert sie in das WebP-Format für bessere Kompression und Ladezeiten.

#### Funktionen:

- Konvertiert JPG, JPEG und PNG Bilder in WebP
- Optimiert die Originaldateien für bessere Kompression
- Behält die Originaldateien bei, um Kompatibilität mit älteren Browsern zu gewährleisten
- Generiert detaillierte Berichte über die Größeneinsparungen

#### Verwendung:

```bash
node scripts/optimize-images.js
```

Die optimierten Bilder werden im Verzeichnis `public/images/optimized` gespeichert.

### 2. add-image-seo-attributes.js

Dieses Skript fügt SEO-Attribute zu allen Bildern in den React-Komponenten hinzu und implementiert WebP-Unterstützung mit Fallback für ältere Browser.

#### Funktionen:

- Fügt wichtige SEO-Attribute zu allen `<img>`-Tags hinzu:
  - `loading="lazy"` für Lazy Loading
  - `decoding="async"` für asynchrone Dekodierung
  - `fetchpriority="auto"` für optimierte Ladereihenfolge
  - `alt="..."` mit automatisch generierten Alt-Texten, falls nicht vorhanden
- Ersetzt `<img>`-Tags durch `<picture>`-Tags mit WebP-Unterstützung und Fallback
- Unterstützt auch Next.js `<Image>`-Komponenten

#### Verwendung:

```bash
node scripts/add-image-seo-attributes.js
```

## Hinweis zu ES Modules

Beide Skripte verwenden ES Module Syntax, da das Projekt in der `package.json` mit `"type": "module"` konfiguriert ist. Daher werden `import` und `export` anstelle von `require` und `module.exports` verwendet.

## Workflow zur Bildoptimierung

Für die beste SEO und Performance sollten Sie den folgenden Workflow verwenden:

1. Führen Sie zuerst das Skript `optimize-images.js` aus, um alle Bilder zu optimieren und in WebP zu konvertieren:

   ```bash
   node scripts/optimize-images.js
   ```

2. Führen Sie dann das Skript `add-image-seo-attributes.js` aus, um SEO-Attribute zu allen Bildern hinzuzufügen und WebP-Unterstützung zu implementieren:

   ```bash
   node scripts/add-image-seo-attributes.js
   ```

3. Überprüfen Sie die Änderungen und testen Sie die Website, um sicherzustellen, dass alle Bilder korrekt angezeigt werden.

## Vorteile der Bildoptimierung

- **Bessere Ladezeiten**: WebP-Bilder sind in der Regel 25-35% kleiner als JPEG oder PNG bei gleicher visueller Qualität.
- **Bessere SEO**: Schnellere Ladezeiten und korrekte Bildattribute verbessern das Ranking in Suchmaschinen.
- **Bessere Nutzererfahrung**: Lazy Loading verhindert, dass Bilder die Seitenladung blockieren.
- **Bessere Zugänglichkeit**: Alt-Texte machen die Website für Screenreader und bei Bildladefehler besser zugänglich.
- **Bessere Kompatibilität**: Fallback-Mechanismen stellen sicher, dass die Bilder in allen Browsern korrekt angezeigt werden.

## Tipps für weitere Optimierungen

- Verwenden Sie aussagekräftige Dateinamen für Bilder, die relevante Keywords enthalten.
- Fügen Sie manuelle Alt-Texte hinzu, die den Bildinhalt genau beschreiben und relevante Keywords enthalten.
- Komprimieren Sie große Bilder vor dem Hochladen auf die Website.
- Verwenden Sie responsive Bilder mit verschiedenen Größen für verschiedene Bildschirmgrößen.
- Fügen Sie strukturierte Daten (Schema.org) für wichtige Bilder hinzu.
