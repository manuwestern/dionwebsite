# Common Components

Diese Verzeichnisstruktur enthält wiederverwendbare Komponenten, die in verschiedenen Teilen der Anwendung verwendet werden können.

## Ordnerstruktur

- **elements/** - Einzelne UI-Komponenten, die in verschiedenen Sections verwendet werden können
  - CollapsibleBenefitCard.tsx - Eine aufklappbare Benefit-Karte für mobile Geräte
  - ErrorBoundary.tsx - Fehlerbehandlungskomponente
  - OptimizedImage.tsx - Optimierte Bildkomponente mit Lazy-Loading
  - StaticBenefitCard.tsx - Eine statische Benefit-Karte ohne aufklappbare Funktionalität
  - BaseCard.tsx, ImageCard.tsx, ProcessStepCard.tsx, etc. - Verschiedene Kartentypen

- **Wiederverwendbare Abschnitte** - Direkt im common-Ordner
  - AppFeatureSection.tsx - Abschnitt für App-Features
  - BenefitsSectionComponent.tsx - Abschnitt für Benefits mit aufklappbaren Karten
  - FAQAccordionSection.tsx - FAQ-Abschnitt mit Akkordeon
  - DPISection.tsx - Abschnitt für Dion Painless Injection (DPI)
  - HeroSection.tsx - Hero-Abschnitt für Seiten
  - MethodsCardsSection.tsx - Abschnitt für Methoden-Karten
  - PatternCardsSection.tsx - Abschnitt für Muster-Karten
  - ProcessStepsSection.tsx - Abschnitt für Prozessschritte
  - TestimonialsSectionComponent.tsx - Abschnitt für Testimonials

## Verwendung

Die Komponenten sind so konzipiert, dass sie wiederverwendbar und anpassbar sind. Sie können in verschiedenen Teilen der Anwendung verwendet werden, indem sie importiert und mit den entsprechenden Props konfiguriert werden.

### Beispiel für die Verwendung einer Section-Komponente:

```tsx
import BenefitsSection from '../common/BenefitsSection';

const MyPage: React.FC = () => {
  return (
    <div>
      <BenefitsSection
        translationNamespace="myNamespace"
        showCTA={true}
        ctaLink="/kontakt"
      />
    </div>
  );
};
```

### Beispiel für die Verwendung einer Komponente:

```tsx
import CollapsibleBenefitCard from '../common/elements/CollapsibleBenefitCard';

const MyComponent: React.FC = () => {
  const [hoverCard, setHoverCard] = useState<number | null>(null);

  return (
    <CollapsibleBenefitCard
      title="Titel"
      description="Beschreibung"
      icon={<Icon />}
      index={0}
      hoverCard={hoverCard}
      setHoverCard={setHoverCard}
    />
  );
};
