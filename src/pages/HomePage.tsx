import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BenefitsSection from '../components/home/BenefitsSection';
import TreatmentAreasSection from '../components/home/TreatmentAreasSection';
import HolisticConceptSection from '../components/home/HolisticConceptSection';
import TreatmentProcessSection from '../components/home/TreatmentProcessSection';
import BeforeAfterSection from '../components/home/BeforeAfterSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import ContactSection from '../components/layout/ContactSection';

const HomePage: React.FC = () => {
  // Empty refs and visibleSteps set to pass to TreatmentProcessSection
  // but without the scroll animations
  const emptyRefs = { current: [] };
  const emptyVisibleSteps = new Set<number>();

  return (
    <>
      <HeroSection />
      <TreatmentAreasSection />
      <TreatmentProcessSection stepRefs={emptyRefs} visibleSteps={emptyVisibleSteps} />
      <HolisticConceptSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <BenefitsSection />
      <FAQSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
