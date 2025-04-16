import React from 'react';
import PatternCardsSection, { PatternData } from '../common/PatternCardsSection';

const PatternSection: React.FC = () => {
  // Fixed patterns with specific images
  const eyebrowPatterns: PatternData[] = [
    {
      title: "Kahle Augenbrauen",
      description: "Vollständig fehlende oder extrem dünne Augenbrauen, die eine komplette Rekonstruktion erfordern",
      grafts: "250-400",
      treatment: "1 Sitzung",
      image: "/images/Augenbrauen_kahl.webp"
    },
    {
      title: "Undichte Augenbrauen",
      description: "Lücken oder dünne Stellen in den Augenbrauen, die eine Verdichtung benötigen",
      grafts: "150-250",
      treatment: "1 Sitzung",
      image: "/images/Augenbrauen_undicht.webp"
    },
    {
      title: "Microblading-Alternative",
      description: "Natürliche und dauerhafte Alternative zu Microblading für definierte Augenbrauen",
      grafts: "200-300",
      treatment: "1 Sitzung",
      image: "/images/Augenbrauen_Microblading.webp"
    }
  ];

  return (
    <PatternCardsSection
      translationNamespace="eyebrowTransplantation"
      sectionTitleKey="patternSection.title"
      sectionDescriptionKey="patternSection.description"
      patterns={eyebrowPatterns}
      typicalGraftsKey="patternSection.typicalGrafts"
      treatmentKey="patternSection.treatment"
      imageAltTemplate="{title} - Augenbrauentransplantation Muster"
    />
  );
};

export default PatternSection;
