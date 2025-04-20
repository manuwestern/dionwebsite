import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { trackPhoneCall } from '../../utils/gtm';
import LanguageSwitcher from './LanguageSwitcher';

const TopBar: React.FC = () => {
  const { t } = useTranslation(['common', 'layout']);

  return (
    <div className="bg-[#1a1a1a] text-white py-2 shadow-md">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left side with language switcher */}
          <div className="flex justify-start">
            <LanguageSwitcher />
          </div>
          
          {/* Right side with contact info and social icons */}
          <div className="flex items-center gap-4 text-sm font-light">
            {/* Email - hidden on small mobile */}
            <a href="mailto:info@dionhairclinic.de" className="hidden sm:flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors">
              <Mail size={14} className="text-[#7BA7C2]" /> 
              <span className="hidden md:inline">info@dionhairclinic.de</span>
            </a>
            
            {/* Phone */}
            <a 
              href="tel:+491702637818" 
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
              onClick={() => trackPhoneCall('+491702637818', 'header')}
            >
              <Phone size={14} className="text-[#7BA7C2]" /> 
              <span className="hidden sm:inline">+49 170 2637818</span>
            </a>
            
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a 
                href="https://wa.me/491702637818" 
                className="text-gray-300 hover:text-white transition-colors flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#1f1f1f]"
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="/images/whatsapp.svg" 
                  alt="WhatsApp" 
                  className="w-4 h-4 opacity-80 hover:opacity-100 transition-opacity"
                  style={{ filter: 'invert(65%) sepia(13%) saturate(1095%) hue-rotate(166deg) brightness(89%) contrast(86%)' }}
                />
              </a>
              <a 
                href="https://www.instagram.com/dionhairclinic" 
                className="text-gray-300 hover:text-white transition-colors flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#1f1f1f]"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="/images/instagram.svg" 
                  alt="Instagram" 
                  className="w-4 h-4 opacity-80 hover:opacity-100 transition-opacity"
                  style={{ filter: 'invert(65%) sepia(13%) saturate(1095%) hue-rotate(166deg) brightness(89%) contrast(86%)' }}
                />
              </a>
              <a 
                href="https://www.tiktok.com/@dionhairclinic" 
                className="text-gray-300 hover:text-white transition-colors flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#1f1f1f]"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="/images/tiktok.svg" 
                  alt="TikTok" 
                  className="w-4 h-4 opacity-80 hover:opacity-100 transition-opacity"
                  style={{ filter: 'invert(65%) sepia(13%) saturate(1095%) hue-rotate(166deg) brightness(89%) contrast(86%)' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
