import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/seo/SEO';
import HeroSection from '../components/knowledge/HeroSection';
import HairLossCausesSection from '../components/knowledge/HairLossCausesSection';
import HairCareSection from '../components/knowledge/HairCareSection';
import TransplantCareSection from '../components/knowledge/TransplantCareSection';
import HairFactsSection from '../components/knowledge/HairFactsSection';
import NutritionSection from '../components/knowledge/NutritionSection';
import CTASection from '../components/knowledge/CTASection';
import ContactSection from '../components/layout/ContactSection';

// Section wrapper component for elegant subtle styling
interface SectionWrapperProps {
  children: React.ReactNode;
  type: 'light' | 'medium' | 'accent' | 'pattern' | 'hero';
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, type, className = '' }) => {
  let sectionClasses = '';

  switch (type) {
    case 'light':
      sectionClasses = 'bg-white';
      break;
    case 'medium':
      sectionClasses = 'bg-gray-50 border-t border-b border-gray-200/50';
      break;
    case 'accent':
      sectionClasses = 'bg-[#F8FAFC] border-t border-b border-[#7BA7C2]/10';
      break;
    case 'pattern':
      sectionClasses = 'bg-gray-50 border-t border-b border-gray-200/70';
      break;
    case 'hero':
      sectionClasses = 'bg-gradient-to-b from-[#F8FAFC] to-white';
      break;
    default:
      sectionClasses = 'bg-white';
  }

  return (
    <div className={`relative ${sectionClasses} ${className}`}>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

const KnowledgePage: React.FC = () => {
  // Using translation but not directly in this component
  useTranslation('knowledge');

  return (
    <>
      <SEO namespace="knowledge" />

      <SectionWrapper type="hero">
        <HeroSection />
      </SectionWrapper>

      <SectionWrapper type="light">
        <HairLossCausesSection />
      </SectionWrapper>

      <SectionWrapper type="medium">
        <HairCareSection />
      </SectionWrapper>

      <SectionWrapper type="light">
        <TransplantCareSection />
      </SectionWrapper>

      <SectionWrapper type="medium">
        <HairFactsSection />
      </SectionWrapper>

      <SectionWrapper type="light">
        <NutritionSection />
      </SectionWrapper>

      <SectionWrapper type="pattern">
        <ContactSection />
      </SectionWrapper>
    </>
  );
};

export default KnowledgePage;
