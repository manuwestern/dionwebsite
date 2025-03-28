import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation('layout');

  // Close treatments dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (treatmentsRef.current && !treatmentsRef.current.contains(event.target as Node)) {
        setIsTreatmentsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [treatmentsRef]);

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 py-6 relative md:bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center md:py-2">
        <Link to="/" className="hidden md:flex items-center">
          <img src="/images/DionHairClinic_Logo.svg" alt="Dion Hair Clinic" className="h-[80px]" />
        </Link>
        <button 
          className="block md:hidden absolute top-6 right-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="hidden md:flex gap-8 text-base font-light">
          <Link to="/" className="hover:text-gray-600">{t('navigation.home')}</Link>
          
          {/* Treatments Dropdown */}
          <div className="relative" ref={treatmentsRef}>
            <button 
              className="flex items-center hover:text-gray-600"
              onClick={() => setIsTreatmentsOpen(!isTreatmentsOpen)}
            >
              {t('navigation.treatments')}
              <ChevronDown size={16} className="ml-1" />
            </button>
            
            {isTreatmentsOpen && (
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 z-50 min-w-[200px]">
                <div className="flex flex-col gap-3 text-base font-light">
                  <Link 
                    to="/haartransplantation" 
                    className="hover:text-gray-600"
                    onClick={() => setIsTreatmentsOpen(false)}
                  >
                    {t('footer.services.hairTransplant')}
                  </Link>
                  <Link 
                    to="/barthaartransplantation" 
                    className="hover:text-gray-600"
                    onClick={() => setIsTreatmentsOpen(false)}
                  >
                    {t('footer.services.beardTransplant')}
                  </Link>
                  <Link 
                    to="/augenbrauentransplantation" 
                    className="hover:text-gray-600"
                    onClick={() => setIsTreatmentsOpen(false)}
                  >
                    {t('footer.services.eyebrowTransplant')}
                  </Link>
                  <Link 
                    to="/haarausfalltherapie" 
                    className="hover:text-gray-600"
                    onClick={() => setIsTreatmentsOpen(false)}
                  >
                    {t('footer.services.hairLossTherapy')}
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link to="#" className="hover:text-gray-600">{t('navigation.information')}</Link>
          <Link to="/klinik" className="hover:text-gray-600">{t('navigation.clinic')}</Link>
          <Link to="/kontakt" className="hover:text-gray-600">{t('navigation.contact')}</Link>
          <Link to="#" className="text-red-600 hover:text-red-700">{t('navigation.priceCalculator')}</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 md:hidden z-50">
          <div className="flex flex-col gap-4 text-base font-light">
            <Link to="/" className="hover:text-gray-600">{t('navigation.home')}</Link>
            
            {/* Mobile Treatments Submenu */}
            <div>
              <button 
                className="flex items-center hover:text-gray-600 w-full text-left"
                onClick={() => setIsTreatmentsOpen(!isTreatmentsOpen)}
              >
                {t('navigation.treatments')}
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {isTreatmentsOpen && (
                <div className="pl-4 mt-2 flex flex-col gap-2 text-base">
                  <Link 
                    to="/haartransplantation" 
                    className="hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('footer.services.hairTransplant')}
                  </Link>
                  <Link 
                    to="/barthaartransplantation" 
                    className="hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('footer.services.beardTransplant')}
                  </Link>
                  <Link 
                    to="/augenbrauentransplantation" 
                    className="hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('footer.services.eyebrowTransplant')}
                  </Link>
                  <Link 
                    to="/haarausfalltherapie" 
                    className="hover:text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('footer.services.hairLossTherapy')}
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="#" className="hover:text-gray-600">{t('navigation.information')}</Link>
            <Link to="/klinik" className="hover:text-gray-600">{t('navigation.clinic')}</Link>
            <Link to="/kontakt" className="hover:text-gray-600">{t('navigation.contact')}</Link>
            <Link to="#" className="text-red-600 hover:text-red-700">{t('navigation.priceCalculator')}</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
