import React, { useRef, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import SEO from '../components/seo/SEO';
import StructuredData from '../components/seo/StructuredData';
import HeroSection from '../components/contact/HeroSection';
import ContactInfoSection from '../components/contact/ContactInfoSection';
import ContactFormSection from '../components/contact/ContactFormSection';
import MapSection from '../components/contact/MapSection';
import ConsultationOptionsSection from '../components/contact/ConsultationOptionsSection';
import { useTranslation } from 'react-i18next';

// Section wrapper component for elegant, subtle styling
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

const ContactPage: React.FC = () => {
  const { t } = useTranslation(['contact', 'common']);
  // State for page loading animation
  const [isLoading, setIsLoading] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  // State for scroll position tracking (only used for scroll-to-top button)
  const [, setScrollY] = useState(0);
  
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
      <SEO namespace="contact" />
      <StructuredData 
        type="WebPage"
        data={{
          type: "ContactPage",
          name: t('meta.title', { ns: 'contact' }),
          description: t('meta.description', { ns: 'contact' }),
          url: "https://dionhairclinic.de/kontakt"
        }}
      />
      <StructuredData 
        type="LocalBusiness"
        data={{
          name: "Dion Hair Clinic",
          description: t('meta.description', { ns: 'contact' }),
          address: {
            streetAddress: "Schürenweg 61",
            addressLocality: "Mönchengladbach",
            postalCode: "41063",
            addressCountry: "DE"
          },
          telephone: "+49 2161 5678900",
          email: "info@dionhairclinic.de",
          url: "https://dionhairclinic.de",
          image: "/images/Dion_Model_Benefits.webp",
          logo: "/images/DionHairClinic_Logo.svg",
          openingHours: ["Mo-Fr 09:00-18:00"]
        }}
      />
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="relative">
            {/* Logo with glow effect */}
            <div className="absolute -inset-10 bg-gradient-to-r from-[#7BA7C2]/20 to-white rounded-full blur-2xl animate-pulse-slow"></div>
            <img 
              src="/images/DionHairClinic_Logo.svg" 
              alt="Dion Hair Clinic Logo" 
              className="h-20 relative z-10 animate-pulse" 
              width="200"
              height="80"
            />
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <SectionWrapper type="hero">
        <HeroSection />
      </SectionWrapper>
      
      <SectionWrapper type="medium">
        <ConsultationOptionsSection />
      </SectionWrapper>

      <SectionWrapper type="light">
        <ContactInfoSection />
      </SectionWrapper>
      
      <SectionWrapper type="accent">
        <ContactFormSection />
      </SectionWrapper>
      
      <SectionWrapper type="medium">
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
        className="pointer-events-none fixed inset-0 z-30 opacity-30 bg-radial-gradient"
      ></div>
    </div>
  );
};

export default ContactPage;
