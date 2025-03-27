import React, { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from '../../utils/ThemeProvider';
import { textStyle, fontSize, fontWeight } from '../../utils/typography';

const TopBar: React.FC = () => {
  const { t } = useTranslation(['common', 'layout']);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { activeTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check if mobile on mount and resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      className={`relative z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-1 shadow-md bg-white/95 backdrop-blur-sm' 
          : 'py-2'
      }`}
      style={{ 
        background: isScrolled 
          ? undefined 
          : `linear-gradient(to right, ${activeTheme.backgroundLight}, ${activeTheme.backgroundDark}, ${activeTheme.backgroundLight})`
      }}
    >
      {/* Subtle animated gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px]" 
           style={{ background: `linear-gradient(to right, transparent, ${activeTheme.divider}, transparent)` }}></div>
      
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className={`flex flex-col md:flex-row md:justify-between md:items-center ${isMobile ? 'gap-3' : 'gap-0'}`}>
          {/* Left side - Language and Theme switchers */}
          <div className="flex justify-center md:justify-start items-center gap-4">
            <LanguageSwitcher />
            {/* Theme Switcher entfernt */}
          </div>
          
          {/* Right side - Contact info and social media */}
          <div className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-row items-center gap-8'}`}>
            {/* Contact information */}
            <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-row items-center gap-6'}`}>
              <a 
                href="mailto:info@dionhairclinic.de" 
                className={`group flex items-center justify-center gap-1.5 ${
                  fontSize.sm
                } transition-colors duration-300 hover:text-gray-700`}
                style={{ color: activeTheme.textSecondary }}
              >
                <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                  isScrolled ? 'bg-gray-200' : 'bg-white/50'
                } group-hover:bg-gray-200 transition-colors duration-300`}>
                  <Mail size={14} className="text-gray-500" />
                </div>
                <span className={`${fontWeight.light} tracking-wide`}>info@dionhairclinic.de</span>
              </a>
              
              <a 
                href="tel:+491702637818" 
                className={`group flex items-center justify-center gap-1.5 ${
                  fontSize.sm
                } transition-colors duration-300 hover:text-gray-700`}
                style={{ color: activeTheme.textSecondary }}
              >
                <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                  isScrolled ? 'bg-gray-200' : 'bg-white/50'
                } group-hover:bg-gray-200 transition-colors duration-300`}>
                  <Phone size={14} className="text-gray-500" />
                </div>
                <span className={`${fontWeight.light} tracking-wide`}>+49 170 2637818</span>
              </a>
            </div>
            
            {/* Social media icons */}
            <div className={`flex items-center justify-center ${isMobile ? 'w-full' : 'border-l border-gray-300 pl-6'} gap-4`}>
              <a 
                href="#" 
                className="group relative flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <div className={`absolute inset-0 rounded-full ${
                  isScrolled ? 'bg-gray-100' : 'bg-white/30'
                } scale-0 group-hover:scale-100 transition-transform duration-300 ease-out`}></div>
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                  isScrolled ? 'bg-gray-200' : 'bg-white/50'
                } group-hover:bg-gray-200 transition-all duration-300 group-hover:scale-110`}>
                  <img 
                    src="/images/whatsapp_icon_header.png" 
                    alt="WhatsApp" 
                    className="w-4 h-4 object-contain"
                  />
                </div>
              </a>
              
              <a 
                href="#" 
                className="group relative flex items-center justify-center"
                aria-label="Instagram"
              >
                <div className={`absolute inset-0 rounded-full ${
                  isScrolled ? 'bg-gray-100' : 'bg-white/30'
                } scale-0 group-hover:scale-100 transition-transform duration-300 ease-out`}></div>
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                  isScrolled ? 'bg-gray-200' : 'bg-white/50'
                } group-hover:bg-gray-200 transition-all duration-300 group-hover:scale-110`}>
                  <img 
                    src="/images/instagram_icon_header.png" 
                    alt="Instagram" 
                    className="w-4 h-4 object-contain"
                  />
                </div>
              </a>
              
              <a 
                href="#" 
                className="group relative flex items-center justify-center"
                aria-label="TikTok"
              >
                <div className={`absolute inset-0 rounded-full ${
                  isScrolled ? 'bg-gray-100' : 'bg-white/30'
                } scale-0 group-hover:scale-100 transition-transform duration-300 ease-out`}></div>
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${
                  isScrolled ? 'bg-gray-200' : 'bg-white/50'
                } group-hover:bg-gray-200 transition-all duration-300 group-hover:scale-110`}>
                  <img 
                    src="/images/tiktok_icon_header.png" 
                    alt="TikTok" 
                    className="w-4 h-4 object-contain"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
