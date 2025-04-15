# Single Page Application (SPA) Routing Guide

## Übersicht

Diese Dokumentation erklärt, wie das Routing in einer Single Page Application (SPA) wie der Dion Hair Clinic Website funktioniert und wie man mit häufigen Problemen umgeht.

## Das Problem mit 404-Fehlern in SPAs

In einer Single Page Application (SPA) wie dieser React-Anwendung wird das Routing clientseitig durchgeführt. Das bedeutet, dass der Browser nicht für jede neue Seite eine neue Anfrage an den Server sendet, sondern JavaScript verwendet, um die Ansicht zu ändern, ohne die Seite neu zu laden.

Dies führt zu einem reibungsloseren Benutzererlebnis, kann aber zu Problemen führen, wenn:

1. Ein Benutzer eine URL direkt in die Adressleiste eingibt (z.B. `https://example.com/haartransplantation`)
2. Ein Benutzer die Seite neu lädt, während er sich auf einer Unterseite befindet
3. Ein Benutzer ein Lesezeichen für eine Unterseite setzt und später darauf zugreift

In diesen Fällen sendet der Browser eine Anfrage an den Server für die spezifische Route (z.B. `/haartransplantation`), aber der Server kennt diese Route nicht, da es sich um eine clientseitige Route handelt. Der Server gibt dann einen 404-Fehler zurück.

## Lösungsansätze

### 1. Hash-Routing (Implementiert)

Die Website verwendet jetzt Hash-Routing, was bedeutet, dass URLs so aussehen:

```
https://example.com/#/haartransplantation
```

Der Teil nach dem Hash (`#`) wird nicht an den Server gesendet, sodass der Server immer nur die Hauptseite (`/`) zurückgibt, und dann übernimmt das clientseitige Routing.

**Vorteile:**
- Funktioniert ohne spezielle Serverkonfiguration
- Löst das Problem mit 404-Fehlern beim direkten Aufrufen von Unterseiten

**Nachteile:**
- URLs sehen weniger sauber aus (enthalten ein `#`)
- Kann SEO beeinträchtigen, da Suchmaschinen den Teil nach dem Hash möglicherweise ignorieren

### 2. Serverkonfiguration (Implementiert)

Wir haben mehrere Serverkonfigurationsdateien hinzugefügt, die alle Anfragen an die `index.html` weiterleiten:

- `.htaccess` für Apache-Server
- `web.config` für IIS-Server (Windows)
- `_redirects` für Netlify-Hosting
- `vercel.json` für Vercel-Hosting

Diese Konfigurationen sollten dafür sorgen, dass der Server bei jeder Anfrage die `index.html` zurückgibt, unabhängig von der angeforderten Route.

### 3. 404-Seite mit automatischer Weiterleitung (Implementiert)

Wir haben eine spezielle 404-Seite erstellt, die den Benutzer automatisch zur richtigen Seite weiterleitet. Wenn ein Benutzer beispielsweise direkt zu `/haartransplantation` navigiert und einen 404-Fehler erhält, leitet die 404-Seite den Benutzer automatisch zu `/#/haartransplantation` weiter.

## Tipps für Benutzer

Wenn Sie trotz dieser Maßnahmen auf 404-Fehler stoßen, können Sie folgende Schritte ausprobieren:

1. **Verwenden Sie die Hauptnavigation**: Navigieren Sie immer über die Hauptnavigation der Website, anstatt URLs direkt einzugeben oder Lesezeichen zu verwenden.

2. **Lesezeichen mit Hash**: Wenn Sie Lesezeichen setzen, stellen Sie sicher, dass die URL das Hash-Symbol (`#`) enthält, z.B. `https://example.com/#/haartransplantation`.

3. **Bei 404-Fehlern**: Wenn Sie auf einen 404-Fehler stoßen, werden Sie automatisch zur Startseite weitergeleitet. Von dort aus können Sie über die Navigation zur gewünschten Seite navigieren.

4. **Cache leeren**: Wenn Sie weiterhin Probleme haben, leeren Sie den Cache Ihres Browsers:
   - **Chrome**: Einstellungen > Datenschutz und Sicherheit > Browserdaten löschen
   - **Firefox**: Einstellungen > Datenschutz & Sicherheit > Cookies und Website-Daten löschen
   - **Safari**: Einstellungen > Safari > Verlauf und Website-Daten löschen
   - **Edge**: Einstellungen > Datenschutz, Suche und Dienste > Browserdaten löschen

## Für Entwickler

Wenn Sie an dieser Website arbeiten, beachten Sie folgende Punkte:

1. **Hash-Routing**: Die Anwendung verwendet `HashRouter` anstelle von `BrowserRouter`. Achten Sie darauf, dass alle Links und Redirects entsprechend funktionieren.

2. **Serverkonfiguration**: Wenn Sie die Website auf einem neuen Server deployen, stellen Sie sicher, dass die entsprechende Serverkonfiguration vorhanden ist und korrekt funktioniert.

3. **404-Seite**: Die 404-Seite enthält JavaScript, das den Benutzer automatisch zur richtigen Seite weiterleitet. Stellen Sie sicher, dass diese Seite korrekt konfiguriert ist.

4. **Service Worker**: Der Service Worker ist so konfiguriert, dass er alle Anfragen an die `index.html` weiterleitet, wenn der Benutzer offline ist oder eine Route nicht im Cache ist.

## Fazit

Das Routing in einer Single Page Application kann komplex sein, aber mit den implementierten Maßnahmen sollten die meisten Probleme behoben sein. Wenn Sie weiterhin Probleme haben, wenden Sie sich an das Entwicklerteam.
