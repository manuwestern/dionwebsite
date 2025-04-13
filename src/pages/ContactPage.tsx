import React, { useRef } from 'react';
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
  
  // Create refs for potential scroll animations
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={pageRef} className="relative">
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
      
      {/* Subtle page overlay for depth effect */}
      <div className="pointer-events-none fixed inset-0 z-30 opacity-30 bg-radial-gradient"></div>
    </div>
  );
};

export default ContactPage;
