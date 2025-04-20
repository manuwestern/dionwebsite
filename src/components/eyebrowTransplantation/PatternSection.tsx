import React from 'react';
import { useTranslation } from 'react-i18next';
import PatternCardsSection, { PatternData } from '../common/PatternCardsSection';

const PatternSection: React.FC = () => {
  const { t } = useTranslation('eyebrowTransplantation');
  
  // Pattern keys from translation file
  const patternKeys = ['kahleAugenbrauen', 'undichteAugenbrauen', 'microbladingAlternative'];
  
  // Map pattern keys to pattern data with images
  const eyebrowPatterns: PatternData[] = patternKeys.map(key => {
    const imageMap: Record<string, string> = {
      kahleAugenbrauen: "/images/Augenbrauen_kahl.webp",
      undichteAugenbrauen: "/images/Augenbrauen_undicht.webp",
      microbladingAlternative: "/images/Augenbrauen_Microblading.webp"
    };
    
    return {
      title: t(`patternSection.patterns.${key}.title`),
      description: t(`patternSection.patterns.${key}.description`),
      grafts: t(`patternSection.patterns.${key}.grafts`),
      treatment: t(`patternSection.patterns.${key}.treatment`),
      image: imageMap[key]
    };
  });

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
