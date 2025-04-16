import React from 'react';
import PatternCardsSection from '../common/PatternCardsSection';

const HairLossPatternsSection: React.FC = () => {
  // Map pattern titles to images
  const patternImageMapping = {
    "Norwood 1-2": "/images/norwood_scale_1.webp",
    "Norwood 3": "/images/norwood_scale_3.webp",
    "Norwood 4": "/images/norwood_scale_4.webp",
    "Norwood 5-6": "/images/norwood_scale_5.webp",
    "Norwood 7": "/images/norwood_scale_7.webp",
    "Frauen": "/images/frau_lichter_scheitel.webp",
    "Women": "/images/frau_lichter_scheitel.webp"
  };

  return (
    <PatternCardsSection
      translationNamespace="hairTransplantation"
      sectionTitleKey="hairLossPatternsSection.title"
      sectionDescriptionKey="hairLossPatternsSection.description"
      patternsTranslationKey="hairLossPatternsSection.patterns"
      typicalGraftsKey="hairLossPatternsSection.typicalGrafts"
      treatmentKey="hairLossPatternsSection.treatment"
      patternImageMapping={patternImageMapping}
      imageAltTemplate="{title} - Haarausfall Muster bei Haartransplantation"
    />
  );
};

export default HairLossPatternsSection;
