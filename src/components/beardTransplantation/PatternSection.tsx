import React from 'react';
import PatternCardsSection, { PatternData } from '../common/PatternCardsSection';

const PatternSection: React.FC = () => {
  // Function to get image based on index
  const getPatternImage = (_pattern: PatternData, index: number): string => {
    const images = [
      "/images/Bart_komplett.webp",
      "/images/Bart_undicht.webp", 
      "/images/Bart_Kontur.webp",
      "/images/Bart_Lücken.webp"
    ];
    return images[index] || images[0];
  };

  // Custom card heights for this specific page
  const minCardHeight = "350px";  // Card height
  const descriptionMaxHeight = "160px"; // Description area height

  return (
    <PatternCardsSection
      translationNamespace="beardTransplantation"
      sectionTitleKey="patternSection.title"
      sectionDescriptionKey="patternSection.description"
      patternsTranslationKey="patternSection.patterns"
      typicalGraftsKey="patternSection.typicalGrafts"
      treatmentKey="patternSection.treatment"
      getPatternImage={getPatternImage}
      imageAltTemplate="{title} - Barthaartransplantation Muster"
      // Pass custom card heights
      minCardHeight={minCardHeight}
      descriptionMaxHeight={descriptionMaxHeight}
    />
  );
};

export default PatternSection;
