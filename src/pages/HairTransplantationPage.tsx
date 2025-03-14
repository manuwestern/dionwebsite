import React from 'react';
import HeroSection from '../components/hairTransplantation/HeroSection';
import MethodsSection from '../components/hairTransplantation/MethodsSection';
import ProcessSection from '../components/hairTransplantation/ProcessSection';
import FAQSection from '../components/hairTransplantation/FAQSection';
import ContactSection from '../components/layout/ContactSection';

const HairTransplantationPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <MethodsSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
    </>
  );
};

export default HairTransplantationPage;
