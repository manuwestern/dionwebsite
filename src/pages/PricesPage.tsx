import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, AlertCircle } from 'lucide-react';
import SEO from '../components/seo/SEO';
import HeroSection from '../components/prices/HeroSection';
import PriceOverviewSection from '../components/prices/PriceOverviewSection';
import FAQSection from '../components/prices/FAQSection';
import { textStyle, fontSize, fontWeight, textColor } from '../utils/typography';

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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal after a short delay when page loads
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <SEO namespace="prices" />
      
      {/* Price Validity Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseModal}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Schließen"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-[#7BA7C2]" />
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className={`${fontSize.h3} ${fontWeight.semibold} ${textColor.dark} mb-4`}>
                Wichtiger Hinweis zu unseren Preisen
              </h3>
              <p className={`${fontSize.base} ${textColor.medium} mb-6 leading-relaxed`}>
                Die aktuell angezeigten Preise sind noch bis zum <span className="font-semibold text-[#7BA7C2]">12. Januar 2026</span> gültig.
              </p>
              <p className={`${fontSize.base} ${textColor.medium} mb-8 leading-relaxed`}>
                Ab diesem Datum erfolgt eine Preisanpassung für das Jahr 2026. Sichern Sie sich jetzt noch die aktuellen Konditionen!
              </p>
              
              {/* Action button */}
              <button
                onClick={handleCloseModal}
                className="w-full bg-gradient-to-r from-[#7BA7C2] to-[#6B96B1] text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Verstanden
              </button>
            </div>
          </div>
        </div>
      )}

      <SectionWrapper type="hero">
        <HeroSection />
      </SectionWrapper>
      
      <SectionWrapper type="light">
        <PriceOverviewSection />
      </SectionWrapper>
      
      <SectionWrapper type="medium">
        <FAQSection />
      </SectionWrapper>
    </>
  );
};

export default PricesPage;
