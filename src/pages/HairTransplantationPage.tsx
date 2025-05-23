import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { trackTreatmentView, TreatmentType } from '../utils/gtm';
import SEO from '../components/seo/SEO';
import HeroSection from '../components/hairTransplantation/HeroSection';
import BenefitsSection from '../components/hairTransplantation/BenefitsSection';
import TestimonialsSection from '../components/hairTransplantation/TestimonialsSection';
import MethodsSection from '../components/hairTransplantation/MethodsSection';
import HairLossPatternsSection from '../components/hairTransplantation/HairLossPatternsSection';
import ProcessSection from '../components/hairTransplantation/ProcessSection';
import DPISection from '../components/hairTransplantation/DPISection';
import CareSection from '../components/hairTransplantation/CareSection';
import FAQSection from '../components/hairTransplantation/FAQSection';
import ContactSection from '../components/layout/ContactSection';

// Section wrapper component for elegant, subtle styling
interface SectionWrapperProps {
  children: React.ReactNode;
  type: 'light' | 'medium' | 'accent' | 'pattern' | 'hero';
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, type, className = '' }) => {
  let bgClasses = '';
  let patternStyle = {};
  let borderStyle = {};
  
  switch (type) {
    case 'light':
      bgClasses = 'bg-white';
      break;
    case 'medium':
      bgClasses = 'bg-gray-50';
      borderStyle = {
        borderTop: '1px solid rgba(229, 231, 235, 0.5)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
      };
      break;
    case 'accent':
      bgClasses = 'bg-[#F8FAFC]';
      borderStyle = {
        borderTop: '1px solid rgba(123, 167, 194, 0.1)',
        borderBottom: '1px solid rgba(123, 167, 194, 0.1)'
      };
      break;
    case 'pattern':
      bgClasses = 'bg-gray-50';
      borderStyle = {
        borderTop: '1px solid rgba(229, 231, 235, 0.7)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.7)'
      };
      break;
    case 'hero':
      bgClasses = 'bg-gradient-to-b from-[#F8FAFC] to-white';
      break;
    default:
      bgClasses = 'bg-white';
  }

  return (
    <div className={`relative ${bgClasses} ${className}`} style={borderStyle}>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

const HairTransplantationPage: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');
  
  // Track treatment view for remarketing
  useEffect(() => {
    trackTreatmentView(
      TreatmentType.HAIR_TRANSPLANT,
      'Haartransplantation'
    );
  }, []);
  
  return (
    <>
      <SEO namespace="hairTransplantation" />
      <SectionWrapper type="hero">
        <HeroSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <BenefitsSection />
      </SectionWrapper>
      
      <SectionWrapper type="pattern">
        <MethodsSection />
      </SectionWrapper>
      
      <SectionWrapper type="medium">
        <HairLossPatternsSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <ProcessSection />
      </SectionWrapper>
      
      <SectionWrapper type="accent" className="py-4">
        <DPISection />
      </SectionWrapper>
      
      <SectionWrapper type="medium">
        <CareSection />
      </SectionWrapper>
      
      <SectionWrapper type="accent">
        <TestimonialsSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <FAQSection />
      </SectionWrapper>
      
      <SectionWrapper type="pattern">
        <ContactSection />
      </SectionWrapper>
    </>
  );
};

export default HairTransplantationPage;
