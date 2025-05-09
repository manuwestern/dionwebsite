import React, { useRef, useEffect } from 'react';
import SEO from '../components/seo/SEO';
import StructuredData from '../components/seo/StructuredData';
import BookingOptionsSection from '../components/appointment/BookingOptionsSection';
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

const AppointmentBookingPage: React.FC = () => {
  const { t } = useTranslation(['appointment', 'common']);
  
  // Create refs for potential scroll animations
  const pageRef = useRef<HTMLDivElement>(null);

  // Hide the floating appointment button on this page
  useEffect(() => {
    // Get the appointment button
    const appointmentButton = document.getElementById('appointment-button');
    
    // Hide the button if it exists
    if (appointmentButton) {
      appointmentButton.style.display = 'none';
    }
    
    // Show the button again when the component unmounts
    return () => {
      if (appointmentButton) {
        appointmentButton.style.display = 'flex';
      }
    };
  }, []);

  return (
    <div ref={pageRef} className="relative">
      <SEO namespace="appointment" />
      <StructuredData 
        type="WebPage"
        data={{
          type: "WebPage",
          name: t('meta.title', { ns: 'appointment' }),
          description: t('meta.description', { ns: 'appointment' }),
          url: "https://www.dionhairclinic.com/termin-buchen"
        }}
      />
      
      {/* Main Content */}
      <SectionWrapper type="medium">
        <BookingOptionsSection />
      </SectionWrapper>
      
      {/* Subtle page overlay for depth effect */}
      <div className="pointer-events-none fixed inset-0 z-30 opacity-30 bg-radial-gradient"></div>
    </div>
  );
};

export default AppointmentBookingPage;
