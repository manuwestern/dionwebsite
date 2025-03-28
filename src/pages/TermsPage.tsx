import React, { useState, useEffect } from 'react';
import TermsContent from '../components/terms/TermsContent';

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

const TermsPage: React.FC = () => {
  // State for page loading animation
  const [isLoading, setIsLoading] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(false);
  
  // Handle initial page load animation
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Slight delay before showing content for smooth transition
      setTimeout(() => {
        setIsPageVisible(true);
      }, 100);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
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
        <TermsContent />
      </SectionWrapper>
    </div>
  );
};

export default TermsPage;
