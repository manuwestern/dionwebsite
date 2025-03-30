import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navigation: React.FC = () => {
  // State for mobile menu and treatments dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTreatmentsOpen, setIsTreatmentsOpen] = useState(false);
  
  // Refs for click outside detection
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  // Hooks
  const { t } = useTranslation('layout');
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsTreatmentsOpen(false);
  }, [location.pathname]);

  // Close treatments dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close treatments dropdown when clicking outside
      if (treatmentsRef.current && !treatmentsRef.current.contains(event.target as Node)) {
        setIsTreatmentsOpen(false);
      }
      
      // Close mobile menu when clicking outside (but not when clicking the menu button)
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.mobile-menu-button')
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [treatmentsRef, mobileMenuRef]);

  // Check if a path is active (for highlighting current page)
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Check if any treatment page is active
  const isTreatmentActive = () => {
    return [
      '/haartransplantation',
      '/barthaartransplantation',
      '/augenbrauentransplantation',
      '/haarausfalltherapie'
    ].some(path => location.pathname.startsWith(path));
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center transition-transform duration-300 hover:scale-[1.02]"
          >
            <img src="/images/DionHairClinic_Logo.svg" alt="Dion Hair Clinic" className="h-[60px] md:h-[70px]" />
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="block md:hidden absolute top-6 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 text-base font-light">
            <NavLink to="/" isActive={isActive('/')}>
              {t('navigation.home')}
            </NavLink>
            
            {/* Treatments Dropdown */}
            <div className="relative px-3" ref={treatmentsRef}>
              <button 
                className={`flex items-center py-2 px-3 rounded-full transition-all duration-200 ${
                  isTreatmentActive() 
                    ? 'text-[#7BA7C2] font-normal' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setIsTreatmentsOpen(!isTreatmentsOpen)}
                aria-label={isTreatmentsOpen ? "Close treatments menu" : "Open treatments menu"}
              >
                {t('navigation.treatments')}
                <ChevronDown 
                  size={16} 
                  className={`ml-1 transition-transform duration-200 ${isTreatmentsOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {/* Dropdown Menu */}
              {isTreatmentsOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-50 min-w-[240px] border border-gray-100"
                >
                  <div className="flex flex-col text-base font-light">
                    <DropdownLink 
                      to="/haartransplantation" 
                      isActive={isActive('/haartransplantation')}
                      onClick={() => setIsTreatmentsOpen(false)}
                    >
                      {t('footer.services.hairTransplant')}
                    </DropdownLink>
                    <DropdownLink 
                      to="/barthaartransplantation" 
                      isActive={isActive('/barthaartransplantation')}
                      onClick={() => setIsTreatmentsOpen(false)}
                    >
                      {t('footer.services.beardTransplant')}
                    </DropdownLink>
                    <DropdownLink 
                      to="/augenbrauentransplantation" 
                      isActive={isActive('/augenbrauentransplantation')}
                      onClick={() => setIsTreatmentsOpen(false)}
                    >
                      {t('footer.services.eyebrowTransplant')}
                    </DropdownLink>
                    <DropdownLink 
                      to="/haarausfalltherapie" 
                      isActive={isActive('/haarausfalltherapie')}
                      onClick={() => setIsTreatmentsOpen(false)}
                    >
                      {t('footer.services.hairLossTherapy')}
                    </DropdownLink>
                  </div>
                </div>
              )}
            </div>
            
            <NavLink to="/wissenswertes" isActive={isActive('/wissenswertes')}>
              {t('navigation.information')}
            </NavLink>
            <NavLink to="/klinik" isActive={isActive('/klinik')}>
              {t('navigation.clinic')}
            </NavLink>
            <NavLink to="/kontakt" isActive={isActive('/kontakt')}>
              {t('navigation.contact')}
            </NavLink>
            
            <NavLink to="/preise" isActive={isActive('/preise')}>
              Preise
            </NavLink>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 md:hidden z-50 border-t border-gray-100"
          >
            <div className="flex flex-col gap-3 text-base font-light">
              <MobileNavLink 
                to="/" 
                isActive={isActive('/')}
              >
                {t('navigation.home')}
              </MobileNavLink>
              
              {/* Mobile Treatments Submenu */}
              <div className="border-b border-gray-100 pb-2">
                <button 
                  className={`flex items-center w-full text-left py-3 px-2 active:bg-gray-50 rounded ${
                    isTreatmentActive() ? 'text-[#7BA7C2] font-normal' : ''
                  }`}
                  onClick={() => setIsTreatmentsOpen(!isTreatmentsOpen)}
                >
                  <span>
                    {t('navigation.treatments')}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`ml-1 transition-transform duration-200 ${isTreatmentsOpen ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {/* Submenu */}
                {isTreatmentsOpen && (
                  <div className="pl-4 mt-2 flex flex-col gap-2 text-base">
                    <MobileSubNavLink 
                      to="/haartransplantation" 
                      isActive={isActive('/haartransplantation')}
                    >
                      {t('footer.services.hairTransplant')}
                    </MobileSubNavLink>
                    <MobileSubNavLink 
                      to="/barthaartransplantation" 
                      isActive={isActive('/barthaartransplantation')}
                    >
                      {t('footer.services.beardTransplant')}
                    </MobileSubNavLink>
                    <MobileSubNavLink 
                      to="/augenbrauentransplantation" 
                      isActive={isActive('/augenbrauentransplantation')}
                    >
                      {t('footer.services.eyebrowTransplant')}
                    </MobileSubNavLink>
                    <MobileSubNavLink 
                      to="/haarausfalltherapie" 
                      isActive={isActive('/haarausfalltherapie')}
                    >
                      {t('footer.services.hairLossTherapy')}
                    </MobileSubNavLink>
                  </div>
                )}
              </div>
              
              <MobileNavLink 
                to="/wissenswertes" 
                isActive={isActive('/wissenswertes')}
              >
                {t('navigation.information')}
              </MobileNavLink>
              <MobileNavLink 
                to="/klinik" 
                isActive={isActive('/klinik')}
              >
                {t('navigation.clinic')}
              </MobileNavLink>
              <MobileNavLink 
                to="/kontakt" 
                isActive={isActive('/kontakt')}
              >
                {t('navigation.contact')}
              </MobileNavLink>
              
              <MobileNavLink 
                to="/preise" 
                isActive={isActive('/preise')}
              >
                Preise
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
      
      {/* Subtle gradient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </nav>
  );
};

// Desktop Navigation Link Component
interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, isActive, children }) => (
  <Link 
    to={to} 
    className={`py-2 px-3 rounded-full transition-all duration-200 ${
      isActive 
        ? 'text-[#7BA7C2] font-normal' 
        : 'hover:bg-gray-50'
    }`}
  >
    {children}
  </Link>
);

// Dropdown Link Component
interface DropdownLinkProps {
  to: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const DropdownLink: React.FC<DropdownLinkProps> = ({ to, isActive, onClick, children }) => (
  <Link 
    to={to} 
    className={`py-3 px-4 transition-colors duration-200 ${
      isActive 
        ? 'bg-gray-50 text-[#7BA7C2] font-normal' 
        : 'hover:bg-gray-50'
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

// Mobile Navigation Link Component
interface MobileNavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, isActive, children }) => (
  <Link 
    to={to} 
    className={`block w-full text-left py-3 px-2 border-b border-gray-100 rounded active:bg-gray-50 ${
      isActive ? 'text-[#7BA7C2] font-normal' : ''
    }`}
  >
    {children}
  </Link>
);

// Mobile Sub Navigation Link Component
interface MobileSubNavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}

const MobileSubNavLink: React.FC<MobileSubNavLinkProps> = ({ to, isActive, children }) => (
  <Link 
    to={to} 
    className={`block w-full text-left py-2 px-2 rounded active:bg-gray-50 ${
      isActive ? 'text-[#7BA7C2] font-normal' : 'text-gray-600'
    }`}
  >
    {children}
  </Link>
);

export default Navigation;
