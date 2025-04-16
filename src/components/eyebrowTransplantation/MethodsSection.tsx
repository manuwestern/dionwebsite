import React from 'react';
import { useTranslation } from 'react-i18next';
import MethodsCardsSection, { Method } from '../common/MethodsCardsSection';

const MethodsSection: React.FC = () => {
  const { t } = useTranslation('eyebrowTransplantation');

  // Get methods from translation
  const methods = t('methodsSection.methods', { returnObjects: true }) as Method[];

  // Get additional info from translation
  const additionalInfo = {
    personalConsultation: {
      title: t('methodsSection.additionalInfo.personalConsultation.title'),
      description: t('methodsSection.additionalInfo.personalConsultation.description')
    },
    combinedTechniques: {
      title: t('methodsSection.additionalInfo.combinedTechniques.title'),
      description: t('methodsSection.additionalInfo.combinedTechniques.description')
    }
  };

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
      translationNamespace="eyebrowTransplantation"
      defaultImagePath="Augenbrauentransplantation_Einpflanzung.svg"
      altTextPrefix="Augenbrauentransplantation Methode"
      additionalInfo={additionalInfo}
      sectionLabels={sectionLabels}
      imageMapping={imageMapping}
      enableHyphenation={false}
    />
  );
};

export default MethodsSection;
