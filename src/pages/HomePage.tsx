import React, { useRef, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import BenefitsSection from '../components/home/BenefitsSection';
import TreatmentAreasSection from '../components/home/TreatmentAreasSection';
import TestimonialsSection from '../components/hairTransplantation/TestimonialsSection';
import PainlessTreatmentSection from '../components/home/PainlessTreatmentSection';
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

const HomePage: React.FC = () => {
  // State for page loading animation
  const [isLoading, setIsLoading] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Create refs for potential scroll animations
  const pageRef = useRef<HTMLDivElement>(null);

  // Handle initial page load animation
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Slight delay before showing content for smooth transition
      setTimeout(() => {
        setIsPageVisible(true);
      }, 100);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events for various effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Show scroll-to-top button after scrolling down 500px
      setShowScrollTop(currentScrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      ref={pageRef}
      className={`relative transition-opacity duration-1000 ease-out ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="relative">
            {/* Logo with glow effect */}
            <div className="absolute -inset-10 bg-gradient-to-r from-[#7BA7C2]/20 to-white rounded-full blur-2xl animate-pulse-slow"></div>
            <img 
              src="/images/DionHairClinic_Logo.svg" 
              alt="Dion Hair Clinic" 
              className="h-20 relative z-10 animate-pulse" 
            />
          </div>
        </div>
      )}
      
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
        <TestimonialsSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <PainlessTreatmentSection />
      </SectionWrapper>
      
      <SectionWrapper type="accent">
        <FAQSection />
      </SectionWrapper>
      
      <SectionWrapper type="pattern">
        <ContactSection />
      </SectionWrapper>
      
      {/* Scroll to Top Button removed as requested */}
      
      {/* Subtle page overlay for depth effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 opacity-30"
        style={{
          background: `radial-gradient(circle at ${scrollY * 0.05}% ${scrollY * 0.02}%, rgba(123, 167, 194, 0.1) 0%, rgba(255, 255, 255, 0) 60%)`,
        }}
      ></div>
      
      {/* KI Hair Analysis Popup */}
      <HairAnalysisPopup delay={5000} />
    </div>
  );
};

export default HomePage;
