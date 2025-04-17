import React from 'react';
import { useTranslation } from 'react-i18next';
import MethodsCardsSection, { Method } from '../common/MethodsCardsSection';

const MethodsSection: React.FC = () => {
  const { t } = useTranslation('beardTransplantation');

  // Get methods from translation
  const methods = t('methodsSection.methods', { returnObjects: true }) as Method[];



  // Get section labels from translation
  const sectionLabels = {
    benefits: t('methodsSection.sectionLabels.benefits'),
    process: t('methodsSection.sectionLabels.process')
  };

  // Define image mappings
  const imageMapping = {
    'saphir_fue.jpg': 'saphir_fue.webp',
    'dhi_fue.jpg': 'dhi_fue.webp'
  };

  return (
    <MethodsCardsSection
      title={t('methodsSection.title')}
      subtitle={t('methodsSection.subtitle')}
      methods={methods}
      translationNamespace="beardTransplantation"
      defaultImagePath="Barthaartransplantation_Einpflanzung.svg"
      altTextPrefix="Barthaartransplantation Methode"
      sectionLabels={sectionLabels}
      imageMapping={imageMapping}
      enableHyphenation={true}
    />
  );
};

export default MethodsSection;
