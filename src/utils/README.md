# Farbsystem und Theming

Dieses Dokument erklärt, wie das Farbsystem und Theming in der Anwendung funktioniert.

## Übersicht

Das Farbsystem besteht aus drei Hauptkomponenten:

1. **colors.ts**: Definiert die Farbpalette und Themes
2. **typography.ts**: Definiert Typografie-Stile, die das Farbsystem verwenden
3. **buttons.ts**: Definiert Button-Stile, die das Farbsystem verwenden

## Verwendung des Farbsystems

### In Komponenten

Um das Farbsystem in einer Komponente zu verwenden, importieren Sie die benötigten Elemente:

```tsx
import { activeTheme, palette, tailwindClasses } from '../utils/colors';
import { textStyle, textColor, gradientUnderline } from '../utils/typography';
import { buttonStyle } from '../utils/buttons';

const MyComponent: React.FC = () => {
  return (
    <div className={`bg-[${activeTheme.backgroundLight}]`}>
      {/* Verwendung von Tailwind-Klassen */}
      <h1 className={tailwindClasses.text.primary}>Überschrift</h1>
      
      {/* Verwendung von vordefinierten Stilen */}
      <p className={textStyle.bodyText}>Text mit vordefiniertem Stil</p>
      
      {/* Verwendung von Button-Stilen */}
      <button className={buttonStyle.primary}>
        <span className="relative">Button Text</span>
      </button>
      
      {/* Direkter Zugriff auf Theme-Farben */}
      <div style={{ backgroundColor: activeTheme.accent }}>
        Akzentfarbe
      </div>
    </div>
  );
};
```

### Tailwind-Klassen vs. dynamische Farben

Das Farbsystem bietet zwei Möglichkeiten, Farben zu verwenden:

1. **Tailwind-Klassen**: Einfach zu verwenden, aber statisch
   ```tsx
   <div className={tailwindClasses.bg.primary}>...</div>
   ```

2. **Dynamische Farben**: Ändern sich, wenn das Theme geändert wird
   ```tsx
   <div className={`bg-[${activeTheme.primary}]`}>...</div>
   ```

Für die meisten Fälle sollten Sie die vordefinierten Stile in `textStyle`, `buttonStyle` usw. verwenden, da diese bereits die richtigen Farben enthalten.

## Themes ändern

Um das aktive Theme zu ändern, können Sie den folgenden Code verwenden:

```tsx
import { grayTheme, blueTheme } from '../utils/colors';

// Ändern Sie das aktive Theme
const ThemeSwitcher: React.FC = () => {
  const switchToGrayTheme = () => {
    // Hier müsste eine Funktion implementiert werden, die das Theme ändert
    // und die Anwendung neu rendert
    console.log('Wechsel zu Grau-Theme');
  };
  
  const switchToBlueTheme = () => {
    // Hier müsste eine Funktion implementiert werden, die das Theme ändert
    // und die Anwendung neu rendert
    console.log('Wechsel zu Blau-Theme');
  };
  
  return (
    <div>
      <button onClick={switchToGrayTheme}>Grau-Theme</button>
      <button onClick={switchToBlueTheme}>Blau-Theme</button>
    </div>
  );
};
```

## Eigene Themes erstellen

Um ein eigenes Theme zu erstellen, können Sie das folgende Muster verwenden:

```tsx
import { ColorTheme, palette } from '../utils/colors';

// Neues Theme erstellen
export const customTheme: ColorTheme = {
  // Primäre Farben
  primary: palette.blue400,
  primaryLight: palette.blue300,
  primaryDark: palette.blue500,
  
  // Weitere Farben...
  // Siehe colors.ts für die vollständige Liste der Eigenschaften
};
```

## Empfehlungen

1. **Verwenden Sie vordefinierte Stile**: Nutzen Sie die vordefinierten Stile in `textStyle`, `buttonStyle` usw., wann immer möglich.
2. **Konsistenz**: Verwenden Sie die gleichen Farben für ähnliche Elemente in der gesamten Anwendung.
3. **Zugänglichkeit**: Achten Sie auf ausreichenden Kontrast zwischen Text und Hintergrund.
4. **Responsive Design**: Die Farben sollten auf allen Bildschirmgrößen gut aussehen.

## Beispiel: Komponente mit Theme-Unterstützung

```tsx
import React from 'react';
import { activeTheme, tailwindClasses } from '../utils/colors';
import { textStyle } from '../utils/typography';
import { buttonStyle, buttonRippleClass } from '../utils/buttons';

const ThemedCard: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <div className={`p-6 rounded-xl shadow-md bg-[${activeTheme.cardBackground}]`}>
      <h2 className={textStyle.cardTitle}>{title}</h2>
      <div className={`h-px ${activeTheme.gradientDivider} my-4`}></div>
      <p className={textStyle.bodyText}>{content}</p>
      <div className="mt-6">
        <button className={buttonStyle.primary}>
          <span className={buttonRippleClass}></span>
          <span className="relative">Mehr erfahren</span>
        </button>
      </div>
    </div>
  );
};

export default ThemedCard;
```

## Weitere Entwicklung

Das Farbsystem kann in Zukunft erweitert werden, um weitere Funktionen zu unterstützen:

1. **Dunkles Theme**: Ein dunkles Theme könnte hinzugefügt werden.
2. **Benutzerdefinierte Themes**: Benutzer könnten ihre eigenen Themes erstellen.
3. **Theme-Persistenz**: Das ausgewählte Theme könnte im localStorage gespeichert werden.
4. **Automatisches Theming**: Das Theme könnte basierend auf den Systemeinstellungen automatisch gewählt werden.
