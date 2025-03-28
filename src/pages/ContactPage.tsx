import React, { useRef, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import HeroSection from '../components/contact/HeroSection';
import ContactInfoSection from '../components/contact/ContactInfoSection';
import ContactFormSection from '../components/contact/ContactFormSection';
import MapSection from '../components/contact/MapSection';
import { useTranslation } from 'react-i18next';

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

const ContactPage: React.FC = () => {
  const { t } = useTranslation(['contact', 'common']);
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
      
      {/* Main Content */}
      <SectionWrapper type="hero">
        <HeroSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <ContactInfoSection />
      </SectionWrapper>
      
      <SectionWrapper type="medium">
        <ContactFormSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <MapSection />
      </SectionWrapper>
      
      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 z-40 w-12 h-12 rounded-full bg-[#7BA7C2] text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#6A96B1] hover:scale-110 active:scale-95 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Zum Seitenanfang scrollen"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
      
      {/* Subtle page overlay for depth effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 opacity-30"
        style={{
          background: `radial-gradient(circle at ${scrollY * 0.05}% ${scrollY * 0.02}%, rgba(123, 167, 194, 0.1) 0%, rgba(255, 255, 255, 0) 60%)`,
        }}
      ></div>
    </div>
  );
};

export default ContactPage;
