import React from 'react';
import HeroSection from '../components/hairTransplantation/HeroSection';
import BenefitsSection from '../components/hairTransplantation/BenefitsSection';
import TestimonialsSection from '../components/hairTransplantation/TestimonialsSection';
import MethodsSection from '../components/hairTransplantation/MethodsSection';
import HairLossPatternsSection from '../components/hairTransplantation/HairLossPatternsSection';
import ProcessSection from '../components/hairTransplantation/ProcessSection';
import FAQSection from '../components/hairTransplantation/FAQSection';
import ContactSection from '../components/layout/ContactSection';

// Section wrapper component for consistent styling
interface SectionWrapperProps {
  children: React.ReactNode;
  type: 'light' | 'medium' | 'gradient' | 'pattern' | 'hero';
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, type, className = '' }) => {
  let bgClasses = '';
  let patternStyle = {};
  
  switch (type) {
    case 'light':
      bgClasses = 'bg-white';
      break;
    case 'medium':
      bgClasses = 'bg-gray-50';
      break;
    case 'gradient':
      bgClasses = 'bg-gradient-to-b from-gray-50 to-white';
      break;
    case 'pattern':
      bgClasses = 'bg-white';
      patternStyle = {
        backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
        backgroundSize: '200px',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        opacity: 0.05
      };
      break;
    case 'hero':
      bgClasses = 'bg-gradient-to-b from-gray-50 to-white';
      break;
    default:
      bgClasses = 'bg-white';
  }

  return (
    <div className={`relative ${bgClasses} ${className}`}>
      {type === 'pattern' && (
        <div 
          className="absolute inset-0 z-0" 
          style={patternStyle}
        ></div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const HairTransplantationPage: React.FC = () => {
  return (
    <>
      <SectionWrapper type="hero">
        <HeroSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <BenefitsSection />
      </SectionWrapper>
      
      <SectionWrapper type="gradient">
        <TestimonialsSection />
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
      
      <SectionWrapper type="gradient">
        <FAQSection />
      </SectionWrapper>
      
      <SectionWrapper type="pattern">
        <ContactSection />
      </SectionWrapper>
    </>
  );
};

export default HairTransplantationPage;
