import React, { useRef } from 'react';
import SEO from '../components/seo/SEO';
import StructuredData from '../components/seo/StructuredData';
import HeroSection from '../components/clinic/HeroSection';
import TeamSection from '../components/clinic/TeamSection';
import TechnologySection from '../components/clinic/TechnologySection';
import QualitySection from '../components/clinic/QualitySection';
import ContactSection from '../components/layout/ContactSection';
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

const ClinicPage: React.FC = () => {
  const { t } = useTranslation(['clinic', 'common']);
  
  // Create refs for potential scroll animations
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={pageRef} className="relative">
      <SEO namespace="clinic" />
      <StructuredData 
        type="LocalBusiness"
        data={{
          name: "Dion Hair Clinic",
          description: t('meta.description', { ns: 'clinic' }),
          image: "/images/Dion_Model_Benefits.webp",
          logo: "/images/DionHairClinic_Logo.svg"
        }}
      />
      <StructuredData 
        type="WebPage"
        data={{
          type: "AboutPage",
          name: t('meta.title', { ns: 'clinic' }),
          description: t('meta.description', { ns: 'clinic' }),
          url: "https://dionhairclinic.de/klinik"
        }}
      />
      <StructuredData 
        type="FAQPage"
        data={{
          questions: (t('faqSection.faqs', { returnObjects: true }) as any[]).map((faq) => ({
            question: faq.question,
            answer: faq.answer
          }))
        }}
      />
      <StructuredData 
        type="AggregateRating"
        data={{
          ratingValue: 5,
          reviewCount: 4
        }}
      />
      
      {/* Main Content */}
      <SectionWrapper type="hero">
        <HeroSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <TeamSection />
      </SectionWrapper>
      
      <SectionWrapper type="accent">
        <TechnologySection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <QualitySection />
      </SectionWrapper>
      
      <SectionWrapper type="pattern">
        <ContactSection />
      </SectionWrapper>
      
      {/* Subtle page overlay for depth effect */}
      <div className="pointer-events-none fixed inset-0 z-30 opacity-30 bg-radial-gradient"></div>
    </div>
  );
};

export default ClinicPage;
