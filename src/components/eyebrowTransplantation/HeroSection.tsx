import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonHeroSection from '../common/HeroSection';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['eyebrowTransplantation', 'common']);

  return (
    <CommonHeroSection
      title={t('heroSection.title')}
      subtitle={t('heroSection.subtitle')}
      welcomeText={t('heroSection.welcomeText')}
      imageSrc="/images/Augenbrauen_Model.webp"
      imageAltMobile="Dr. Dion - Führender Experte für Augenbrauentransplantation"
      imageAltDesktop="Augenbrauentransplantation Experte - Modernste Techniken für natürliche Ergebnisse"
      translationNamespace="eyebrowTransplantation"
      stats={[
        { value: '98%', label: 'stats.satisfiedPatients' },
        { value: '5.000+', label: 'stats.successfulTreatments' },
        { value: '15+', label: 'stats.yearsExperience' }
      ]}
      ctaLink="/kontakt"
      ctaText="buttons.consultation"
      enableHyphenation={false}
    />
  );
};

export default HeroSection;
