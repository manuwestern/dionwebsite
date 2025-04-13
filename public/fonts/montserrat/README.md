# Montserrat Schriftart - Lokale Hosting-Anleitung

Diese Anleitung erklärt, wie Sie die Montserrat-Schriftart herunterladen und lokal in diesem Projekt hosten können, um die Ladezeit und Performance der Website zu verbessern.

## Warum lokales Hosting von Schriftarten?

Das lokale Hosting von Schriftarten bietet mehrere Vorteile:

1. **Verbesserte Ladezeit**: Keine zusätzlichen HTTP-Anfragen an externe Server
2. **Bessere Performance**: Reduzierte Netzwerklatenz
3. **Höhere Zuverlässigkeit**: Keine Abhängigkeit von externen Diensten
4. **Bessere Privatsphäre**: Keine Datenübertragung an Drittanbieter
5. **Bessere Kontrolle**: Vollständige Kontrolle über das Caching und die Auslieferung

## Benötigte Schriftdateien

Für dieses Projekt werden die folgenden Montserrat-Schriftdateien im WOFF2-Format benötigt:

- `montserrat-light.woff2` (300)
- `montserrat-regular.woff2` (400)
- `montserrat-medium.woff2` (500)
- `montserrat-semibold.woff2` (600)
- `montserrat-bold.woff2` (700)

## Anleitung zum Herunterladen der Schriftarten

### Option 1: Herunterladen von Google Fonts

1. Besuchen Sie [Google Fonts - Montserrat](https://fonts.google.com/specimen/Montserrat)
2. Wählen Sie die benötigten Schriftgewichte: 300, 400, 500, 600, 700
3. Klicken Sie auf "Download family"
4. Entpacken Sie die heruntergeladene ZIP-Datei
5. Konvertieren Sie die TTF-Dateien in WOFF2 mit einem Online-Konverter wie [Font Squirrel](https://www.fontsquirrel.com/tools/webfont-generator) oder [Transfonter](https://transfonter.org/)
6. Platzieren Sie die konvertierten Dateien in diesem Verzeichnis (`public/fonts/montserrat/`)

### Option 2: Verwendung von Font Squirrel

1. Besuchen Sie [Font Squirrel - Montserrat](https://www.fontsquirrel.com/fonts/montserrat)
2. Laden Sie die benötigten Schriftgewichte herunter
3. Verwenden Sie den [Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator), um WOFF2-Dateien zu erstellen
4. Platzieren Sie die generierten Dateien in diesem Verzeichnis

### Option 3: Verwendung von Transfonter

1. Besuchen Sie [Transfonter](https://transfonter.org/)
2. Laden Sie die TTF-Dateien von Montserrat hoch
3. Wählen Sie das Format WOFF2
4. Klicken Sie auf "Convert"
5. Laden Sie das Paket herunter und extrahieren Sie die Dateien in dieses Verzeichnis

## Überprüfung der Implementierung

Nach dem Platzieren der Schriftdateien in diesem Verzeichnis sollte die Website die Schriftarten lokal laden. Sie können dies überprüfen, indem Sie:

1. Die Website in einem Browser öffnen
2. Die Entwicklertools öffnen (F12 oder Rechtsklick > Untersuchen)
3. Zum Netzwerk-Tab navigieren
4. Die Seite neu laden
5. Nach Anfragen an die Schriftdateien suchen (sie sollten von Ihrem lokalen Server kommen, nicht von fonts.googleapis.com)

## Fehlerbehebung

Wenn die Schriftarten nicht korrekt geladen werden:

1. Stellen Sie sicher, dass die Dateinamen exakt mit den in der CSS-Datei (`fonts.css`) angegebenen Namen übereinstimmen
2. Überprüfen Sie, ob die Dateien im richtigen Verzeichnis platziert sind
3. Stellen Sie sicher, dass der Webserver Zugriff auf die Schriftdateien hat und sie mit dem richtigen MIME-Typ ausliefert
