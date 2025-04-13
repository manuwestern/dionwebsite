import React from 'react';
import ImprintContent from '../components/imprint/ImprintContent';

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

const ImprintPage: React.FC = () => {
  return (
    <div className="relative">
      {/* Main Content */}
      <SectionWrapper type="hero">
        <ImprintContent />
      </SectionWrapper>
    </div>
  );
};

export default ImprintPage;
