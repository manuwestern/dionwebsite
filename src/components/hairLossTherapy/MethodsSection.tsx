import React from 'react';
import { useTranslation } from 'react-i18next';
import MethodsCardsSection, { Method } from '../common/MethodsCardsSection';

const MethodsSection: React.FC = () => {
  const { t } = useTranslation('hairLossTherapy');

  // Get methods from translation
  const methods = t('methodsSection.methods', { returnObjects: true }) as Method[];

 
  // Get section labels from translation
  const sectionLabels = {
    benefits: t('methodsSection.sectionLabels.benefits'),
    process: t('methodsSection.sectionLabels.process')
  };

  return (
    <MethodsCardsSection
      title={t('methodsSection.title')}
      subtitle={t('methodsSection.subtitle')}
      methods={methods}
      translationNamespace="hairLossTherapy"
      defaultImagePath="mesotherapie.webp"
      altTextPrefix="Haarausfalltherapie Methode"
      sectionLabels={sectionLabels}
      enableHyphenation={true}
    />
  );
};

export default MethodsSection;
