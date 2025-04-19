import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonHeroSection from '../common/HeroSection';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['contact', 'common']);

  // Scroll to form section using multiple methods to ensure it works
  const scrollToForm = () => {
    // Try multiple approaches with a delay to ensure the element is fully loaded
    setTimeout(() => {
      // Method 1: Try to find by ID
      const formSection = document.getElementById('contactForm');
      
      // Method 2: Try to find by data attribute
      const formSectionByData = document.querySelector('[data-section="contact-form"]');
      
      // Method 3: Try to find by section with specific class combination
      const formSectionByClass = document.querySelector('section.py-16.md\\:py-24.relative.overflow-hidden.bg-gray-50');
      
      if (formSection) {
        // Preferred method - scroll to the element by ID
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.log('Scrolling to contact form by ID');
      } else if (formSectionByData) {
        // Fallback method 1 - scroll to the element by data attribute
        formSectionByData.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.log('Scrolling to contact form by data attribute');
      } else if (formSectionByClass) {
        // Fallback method 2 - scroll to the element by class
        formSectionByClass.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.log('Scrolling to contact form by class');
      } else {
        // Last resort - scroll to a position that's likely to show the form
        const scrollPosition = Math.max(
          document.body.scrollHeight, 
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight
        ) * 0.8; // Scroll to 80% of the page height
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
        console.log('Scrolling to approximate position');
      }
    }, 800); // 800ms delay to ensure everything is loaded
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
      ctaText="buttons.contactForm"
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
