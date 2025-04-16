import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonHeroSection from '../common/HeroSection';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['contact', 'common']);

  // Scroll to form section
  const scrollToForm = () => {
    const formSection = document.getElementById('contactForm');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CommonHeroSection
      title={t('heroSection.title')}
      subtitle={t('heroSection.subtitle')}
      welcomeText={t('heroSection.welcomeText')}
      imageSrc="/images/Model_Kontakt.webp"
      imageAltMobile="Kontakt zur Dion Hair Clinic - Beratung und Terminvereinbarung"
      imageAltDesktop="Kontakt zur Dion Hair Clinic - Beratung und Terminvereinbarung"
      translationNamespace="contact"
      ctaText="formSection.title"
      ctaOnClick={scrollToForm}
      enableHyphenation={true}
      minHeightMobile="70vh"
      minHeightDesktop="70vh"
      rightColumnWidth="40%"
      leftColumnWidth="60%"
    />
  );
};

export default HeroSection;
