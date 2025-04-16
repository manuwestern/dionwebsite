import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonHeroSection from '../common/HeroSection';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['beardTransplantation', 'common']);

  return (
    <CommonHeroSection
      title={t('heroSection.title')}
      subtitle={t('heroSection.subtitle')}
      welcomeText={t('heroSection.welcomeText')}
      imageSrc="/images/Model_Bart.webp"
      imageAltMobile="Dr. Dion - Führender Experte für Barthaartransplantation"
      imageAltDesktop="Barthaartransplantation Experte - Modernste Techniken für natürliche Ergebnisse"
      translationNamespace="beardTransplantation"
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
