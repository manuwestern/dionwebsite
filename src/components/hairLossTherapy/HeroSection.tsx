import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonHeroSection from '../common/HeroSection';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['hairLossTherapy', 'common']);

  return (
    <CommonHeroSection
      title={t('heroSection.title')}
      subtitle={t('heroSection.subtitle')}
      welcomeText={t('heroSection.welcomeText')}
      imageSrc="/images/Haarausfall_Model.webp"
      imageAltMobile="Haarausfalltherapie - Ganzheitliche Ansätze für gesundes Haarwachstum"
      imageAltDesktop="Haarausfalltherapie - Ganzheitliche Ansätze für gesundes Haarwachstum"
      translationNamespace="hairLossTherapy"
      stats={[
        { value: '98%', label: 'stats.satisfiedPatients' },
        { value: '5.000+', label: 'stats.successfulTreatments' },
        { value: '15+', label: 'stats.yearsExperience' }
      ]}
      ctaLink="/kontakt"
      ctaText="buttons.consultation"
      enableHyphenation={true}
    />
  );
};

export default HeroSection;
