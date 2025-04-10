import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/seo/SEO';
import HeroSection from '../components/prices/HeroSection';
import PriceOverviewSection from '../components/prices/PriceOverviewSection';
import FAQSection from '../components/prices/FAQSection';
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

const PricesPage: React.FC = () => {
  const { t } = useTranslation('prices');
  
  return (
    <>
      <SEO namespace="prices" />
      <SectionWrapper type="hero">
        <HeroSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <PriceOverviewSection />
      </SectionWrapper>
      
      <SectionWrapper type="medium">
        <FAQSection />
      </SectionWrapper>
      
      <SectionWrapper type="pattern">
        <ContactSection />
      </SectionWrapper>
    </>
  );
};

export default PricesPage;
