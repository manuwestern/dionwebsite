import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonHeroSection from '../common/HeroSection';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['knowledge', 'common']);

  return (
    <CommonHeroSection
      title={t('hero.title')}
      subtitle={t('hero.subtitle')}
      welcomeText={t('hero.welcomeText')}
      imageSrc="/images/Model_Wissen.webp"
      imageAltMobile="Wissenswertes über Haare und Haarpflege"
      imageAltDesktop="Wissenswertes über Haare und Haarpflege"
      translationNamespace="knowledge"
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
