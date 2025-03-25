import React from 'react';
import HeroSection from '../components/hairTransplantation/HeroSection';
import MethodsSection from '../components/hairTransplantation/MethodsSection';
import HairLossPatternsSection from '../components/hairTransplantation/HairLossPatternsSection';
import ProcessSection from '../components/hairTransplantation/ProcessSection';
import BenefitsSection from '../components/hairTransplantation/BenefitsSection';
import FAQSection from '../components/hairTransplantation/FAQSection';
import ContactSection from '../components/layout/ContactSection';

const HairTransplantationPage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <MethodsSection />
      <HairLossPatternsSection />
      <ProcessSection />
      <BenefitsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
};

export default HairTransplantationPage;
