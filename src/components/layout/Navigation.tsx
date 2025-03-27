import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import { useTheme } from '../../utils/ThemeProvider';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['layout', 'common']);
  const location = useLocation();
  const { activeTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsTreatmentsOpen(false);
  }, [location.pathname]);

  // Check if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`sticky top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 shadow-md bg-white/95 backdrop-blur-sm' 
          : 'py-4 bg-gray-50/80'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 relative">
        <div className="flex justify-between items-center">
          {/* Logo with subtle animation */}
          <Link 
            to="/" 
            className="flex items-center group"
            aria-label="Dion Hair Clinic Home"
          >
            <div className={`relative transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
              <div className="absolute -inset-3 bg-gradient-to-r from-gray-200/50 to-white/80 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src="/images/DionHairClinic_Logo.svg" 
                alt="Dion Hair Clinic" 
                className={`relative z-10 transition-all duration-300 ${isScrolled ? 'h-[60px]' : 'h-[80px]'}`}
              />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="block md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative">
              <span className={`absolute block w-5 h-0.5 bg-gray-600 transform transition-all duration-300 ${
                isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}></span>
              <span className={`absolute block w-5 h-0.5 bg-gray-600 transform transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute block w-5 h-0.5 bg-gray-600 transform transition-all duration-300 ${
                isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}></span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex gap-1 items-center">
              {/* Home Link */}
              <NavLink 
                to="/" 
                label={t('navigation.home')} 
                isActive={isActive('/')}
              />
              
              {/* Treatments Dropdown */}
              <div className="relative" ref={treatmentsRef}>
                <button 
                  className={`relative px-4 py-2 rounded-full group transition-all duration-300 ${
                    isTreatmentsOpen || isActive('/haartransplantation') || isActive('/barthaartransplantation') || isActive('/augenbrauentransplantation')
                      ? `${fontWeight.medium} bg-gray-200`
                      : `${fontWeight.light} hover:bg-gray-100`
                  }`}
                  style={{ 
                    color: isTreatmentsOpen || isActive('/haartransplantation') || isActive('/barthaartransplantation') || isActive('/augenbrauentransplantation')
                      ? activeTheme.textPrimary
                      : activeTheme.textSecondary
                  }}
                  onClick={() => setIsTreatmentsOpen(!isTreatmentsOpen)}
                  aria-haspopup="true"
                >
                  <div className="flex items-center gap-1">
                    <span>{t('navigation.treatments')}</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isTreatmentsOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/95 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden transition-all duration-300 origin-top z-50 ${
                    isTreatmentsOpen 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                  style={{ width: '240px' }}
                >
                  <div className="p-2">
                    {/* Dropdown Links */}
                    <DropdownLink 
                      to="/haartransplantation" 
                      label={t('footer.services.hairTransplant')} 
                      isActive={isActive('/haartransplantation')}
                      onClick={() => setIsTreatmentsOpen(false)}
                    />
                    <DropdownLink 
                      to="/barthaartransplantation" 
                      label={t('footer.services.beardTransplant')} 
                      isActive={isActive('/barthaartransplantation')}
                      onClick={() => setIsTreatmentsOpen(false)}
                    />
                    <DropdownLink 
                      to="/augenbrauentransplantation" 
                      label={t('footer.services.eyebrowTransplant')} 
                      isActive={isActive('/augenbrauentransplantation')}
                      onClick={() => setIsTreatmentsOpen(false)}
                    />
                    <DropdownLink 
                      to="/haarausfall-therapie" 
                      label={t('footer.services.hairLossTherapy')} 
                      isActive={isActive('/haarausfall-therapie')}
                      onClick={() => setIsTreatmentsOpen(false)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Other Navigation Links */}
              <NavLink 
                to="/information" 
                label={t('navigation.information')} 
                isActive={isActive('/information')}
              />
              <NavLink 
                to="/klinik" 
                label={t('navigation.clinic')} 
                isActive={isActive('/klinik')}
              />
              <NavLink 
                to="/kontakt" 
                label={t('navigation.contact')} 
                isActive={isActive('/kontakt')}
              />
              <NavLink 
                to="/preisrechner" 
                label={t('navigation.priceCalculator')} 
                isActive={isActive('/preisrechner')}
                isSpecial
              />
              <NavLink 
                to="/theme-designer" 
                label="Theme Designer" 
                isActive={isActive('/theme-designer')}
              />
            </div>
            
            {/* Consultation Button */}
            <div className="ml-4">
              <button className={`${buttonStyle.primary} shadow-sm hover:shadow-md transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-sm py-2 px-4`}>
                <span className={buttonRippleClass}></span>
                <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest text-sm`}>
                  {t('buttons.consultation', { ns: 'common' })}
                  <ArrowRight className={`${buttonArrowClass} ml-2 w-4 h-4`} />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 z-40 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Mobile Menu Panel */}
        <div 
          className={`fixed top-0 bottom-0 right-0 w-[80%] max-w-sm bg-white shadow-xl md:hidden z-50 transition-transform duration-500 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <img 
              src="/images/DionHairClinic_Logo.svg" 
              alt="Dion Hair Clinic" 
              className="h-[50px]"
            />
          </div>
          
          {/* Mobile Menu Links */}
          <div className="p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
            <div className="flex flex-col gap-4">
              {/* Mobile Navigation Links */}
              <MobileNavLink 
                to="/" 
                label={t('navigation.home')} 
                isActive={isActive('/')}
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Mobile Treatments Dropdown */}
              <div>
                <button 
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-300 ${
                    isTreatmentsOpen || isActive('/haartransplantation') || isActive('/barthaartransplantation') || isActive('/augenbrauentransplantation')
                      ? `${fontWeight.medium} bg-gray-200`
                      : `${fontWeight.light} hover:bg-gray-100`
                  }`}
                  style={{ 
                    color: isTreatmentsOpen || isActive('/haartransplantation') || isActive('/barthaartransplantation') || isActive('/augenbrauentransplantation')
                      ? activeTheme.textPrimary
                      : activeTheme.textSecondary
                  }}
                  onClick={() => setIsTreatmentsOpen(!isTreatmentsOpen)}
                >
                  <span>{t('navigation.treatments')}</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${isTreatmentsOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {/* Mobile Dropdown Content */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    isTreatmentsOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-4 pt-2 flex flex-col gap-1">
                    <MobileSubLink 
                      to="/haartransplantation" 
                      label={t('footer.services.hairTransplant')} 
                      isActive={isActive('/haartransplantation')}
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MobileSubLink 
                      to="/barthaartransplantation" 
                      label={t('footer.services.beardTransplant')} 
                      isActive={isActive('/barthaartransplantation')}
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MobileSubLink 
                      to="/augenbrauentransplantation" 
                      label={t('footer.services.eyebrowTransplant')} 
                      isActive={isActive('/augenbrauentransplantation')}
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MobileSubLink 
                      to="/haarausfall-therapie" 
                      label={t('footer.services.hairLossTherapy')} 
                      isActive={isActive('/haarausfall-therapie')}
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Other Mobile Links */}
              <MobileNavLink 
                to="/information" 
                label={t('navigation.information')} 
                isActive={isActive('/information')}
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLink 
                to="/klinik" 
                label={t('navigation.clinic')} 
                isActive={isActive('/klinik')}
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLink 
                to="/kontakt" 
                label={t('navigation.contact')} 
                isActive={isActive('/kontakt')}
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLink 
                to="/preisrechner" 
                label={t('navigation.priceCalculator')} 
                isActive={isActive('/preisrechner')}
                onClick={() => setIsMenuOpen(false)}
                isSpecial
              />
              <MobileNavLink 
                to="/theme-designer" 
                label="Theme Designer" 
                isActive={isActive('/theme-designer')}
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Mobile Consultation Button */}
              <div className="mt-6">
                <button className={`${buttonStyle.primary} w-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center justify-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.consultation', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Desktop Navigation Link Component
const NavLink: React.FC<{ 
  to: string; 
  label: string; 
  isActive: boolean;
  isSpecial?: boolean;
}> = ({ to, label, isActive, isSpecial = false }) => {
  const { activeTheme } = useTheme();
  
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
        isActive
          ? `${fontWeight.medium} bg-${isSpecial ? 'red' : 'gray'}-200`
          : `${fontWeight.light} hover:bg-${isSpecial ? 'red' : 'gray'}-100`
      }`}
      style={{ 
        color: isSpecial 
          ? (isActive ? 'rgb(220, 38, 38)' : 'rgb(220, 38, 38)') 
          : (isActive ? activeTheme.textPrimary : activeTheme.textSecondary)
      }}
    >
      {label}
    </Link>
  );
};

// Dropdown Link Component
const DropdownLink: React.FC<{ 
  to: string; 
  label: string; 
  isActive: boolean;
  onClick: () => void;
}> = ({ to, label, isActive, onClick }) => {
  const { activeTheme } = useTheme();
  
  return (
    <Link
      to={to}
      className={`block px-4 py-2.5 rounded-lg transition-all duration-300 ${
        isActive
          ? `${fontWeight.medium} bg-gray-200`
          : `${fontWeight.light} hover:bg-gray-100`
      }`}
      style={{ 
        color: isActive ? activeTheme.textPrimary : activeTheme.textSecondary
      }}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

// Mobile Navigation Link Component
const MobileNavLink: React.FC<{ 
  to: string; 
  label: string; 
  isActive: boolean;
  onClick: () => void;
  isSpecial?: boolean;
}> = ({ to, label, isActive, onClick, isSpecial = false }) => {
  const { activeTheme } = useTheme();
  
  return (
    <Link
      to={to}
      className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
        isActive
          ? `${fontWeight.medium} bg-${isSpecial ? 'red' : 'gray'}-200`
          : `${fontWeight.light} hover:bg-gray-100`
      }`}
      style={{ 
        color: isSpecial 
          ? (isActive ? 'rgb(220, 38, 38)' : 'rgb(220, 38, 38)') 
          : (isActive ? activeTheme.textPrimary : activeTheme.textSecondary)
      }}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

// Mobile Submenu Link Component
const MobileSubLink: React.FC<{ 
  to: string; 
  label: string; 
  isActive: boolean;
  onClick: () => void;
}> = ({ to, label, isActive, onClick }) => {
  const { activeTheme } = useTheme();
  
  return (
    <Link
      to={to}
      className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
        isActive
          ? `${fontWeight.medium} bg-gray-200`
          : `${fontWeight.light} hover:bg-gray-100`
      }`}
      style={{ 
        color: isActive ? activeTheme.textPrimary : activeTheme.textSecondary
      }}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navigation;
