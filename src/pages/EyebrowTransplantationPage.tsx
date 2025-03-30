import React from 'react';
import HeroSection from '../components/eyebrowTransplantation/HeroSection';
import BenefitsSection from '../components/eyebrowTransplantation/BenefitsSection';
import TestimonialsSection from '../components/eyebrowTransplantation/TestimonialsSection';
import MethodsSection from '../components/eyebrowTransplantation/MethodsSection';
import PatternSection from '../components/eyebrowTransplantation/PatternSection';
import ProcessSection from '../components/eyebrowTransplantation/ProcessSection';
import DPISection from '../components/eyebrowTransplantation/DPISection';
import CareSection from '../components/eyebrowTransplantation/CareSection';
import FAQSection from '../components/eyebrowTransplantation/FAQSection';
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

const EyebrowTransplantationPage: React.FC = () => {
  return (
    <>
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
        <PatternSection />
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

export default EyebrowTransplantationPage;
