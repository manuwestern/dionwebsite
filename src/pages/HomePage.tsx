import React, { useRef, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import HeroSection from '../components/home/HeroSection';
import BenefitsSection from '../components/home/BenefitsSection';
import TreatmentAreasSection from '../components/home/TreatmentAreasSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import PainlessTreatmentSection from '../components/home/PainlessTreatmentSection';
import AppSection from '../components/home/AppSection';
import FAQSection from '../components/home/FAQSection';
import ContactSection from '../components/layout/ContactSection';
import HairAnalysisPopup from '../components/home/HairAnalysisPopup';

// Section wrapper component for elegant, subtle styling
interface SectionWrapperProps {
  children: React.ReactNode;
  type: 'light' | 'medium' | 'accent' | 'pattern' | 'hero';
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, type, className = '' }) => {
  let bgClasses = '';
  let borderClasses = '';
  
  switch (type) {
    case 'light':
      bgClasses = 'bg-white';
      break;
    case 'medium':
      bgClasses = 'bg-gray-50';
      borderClasses = 'border-t border-b border-gray-200/50';
      break;
    case 'accent':
      bgClasses = 'bg-[#F8FAFC]';
      borderClasses = 'border-t border-b border-[#7BA7C2]/10';
      break;
    case 'pattern':
      bgClasses = 'bg-gray-50';
      borderClasses = 'border-t border-b border-gray-200/70';
      break;
    case 'hero':
      bgClasses = 'bg-gradient-to-b from-[#F8FAFC] to-white';
      break;
    default:
      bgClasses = 'bg-white';
  }

  return (
    <div className={`relative ${bgClasses} ${borderClasses} ${className}`}>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  // Create refs for potential scroll animations
  const pageRef = useRef<HTMLDivElement>(null);

  // Handle scroll events for various effects
  useEffect(() => {
    const handleScroll = () => {
      // Keep the event listener for future use if needed
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={pageRef} className="relative">
      <SEO namespace="home" />
      
      {/* Main Content - Ordered sections with TreatmentAreas before Benefits */}
      <SectionWrapper type="hero">
        <HeroSection />
      </SectionWrapper>
      
      <SectionWrapper type="accent">
        <TreatmentAreasSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <BenefitsSection />
      </SectionWrapper>
      
      <SectionWrapper type="accent">
        <PainlessTreatmentSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <AppSection />
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
      
      {/* Subtle page overlay for depth effect */}
      <div className="pointer-events-none fixed inset-0 z-30 opacity-30 bg-radial-gradient"></div>
      
      {/* KI Hair Analysis Popup - Temporarily disabled */}
      {/* <HairAnalysisPopup delay={5000} /> */}
    </div>
  );
};

export default HomePage;
