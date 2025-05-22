import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { trackPhoneCall } from '../../utils/gtm';

const FooterSection: React.FC = () => {
  const { t } = useTranslation('layout');
  
  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center mb-6">
              <img src="/images/DionHairClinic_Logo.svg" alt="Dion Hair Clinic" className="h-12 mr-3 brightness-0 invert" />
            </div>
            <p className="text-sm font-light text-gray-300 mb-6 leading-relaxed">
              {t('footer.clinicDescription')}
            </p>
            <div className="flex gap-3 mt-6">
              <a 
                href="https://wa.me/491702637818" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#1f1f1f] border border-gray-800"
                aria-label="WhatsApp"
              >
                <img 
                  src="/images/whatsapp.svg" 
                  alt="WhatsApp" 
                  className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity filter-social-icon"
                />
              </a>
              <a 
                href="https://www.instagram.com/dionhairclinic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#1f1f1f] border border-gray-800"
                aria-label="Instagram"
              >
                <img 
                  src="/images/instagram.svg" 
                  alt="Instagram" 
                  className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity filter-social-icon"
                />
              </a>
              <a 
                href="https://www.tiktok.com/@dionhairclinic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#1f1f1f] border border-gray-800"
                aria-label="TikTok"
              >
                <img 
                  src="/images/tiktok.svg" 
                  alt="TikTok" 
                  className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity filter-social-icon"
                />
              </a>
            </div>
          </div>

          {/* Information */}
          <div className="col-span-1">
            <h3 className="text-base font-normal tracking-wide mb-5 flex items-center">
              <span className="w-6 h-px bg-[#7BA7C2]/40 mr-3"></span>
              {t('footer.information.title')}
            </h3>
            <ul className="space-y-3 text-sm font-light text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA7C2]/30 mr-2.5"></span>
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link to="/klinik" className="hover:text-white transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA7C2]/30 mr-2.5"></span>
                  {t('navigation.clinic')}
                </Link>
              </li>
              <li>
                <Link to="/wissenswertes" className="hover:text-white transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA7C2]/30 mr-2.5"></span>
                  {t('navigation.information')}
                </Link>
              </li>
              <li>
                <Link to="/preise" className="hover:text-white transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA7C2]/30 mr-2.5"></span>
                  {t('navigation.prices')}
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="hover:text-white transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA7C2]/30 mr-2.5"></span>
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Treatments */}
          <div className="col-span-1">
            <h3 className="text-base font-normal tracking-wide mb-5 flex items-center">
              <span className="w-6 h-px bg-[#7BA7C2]/40 mr-3"></span>
              {t('footer.services.title')}
            </h3>
            <ul className="space-y-3 text-sm font-light text-gray-300">
              <li>
                <Link to="/haartransplantation" className="hover:text-white transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA7C2]/30 mr-2.5"></span>
                  {t('footer.services.hairTransplant')}
                </Link>
              </li>
              <li>
                <Link to="/barthaartransplantation" className="hover:text-white transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA7C2]/30 mr-2.5"></span>
                  {t('footer.services.beardTransplant')}
                </Link>
              </li>
              <li>
                <Link to="/augenbrauentransplantation" className="hover:text-white transition-colors inline-flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7BA7C2]/30 mr-2.5"></span>
                  {t('footer.services.eyebrowTransplant')}
                </Link>
              </li>
              {/* Link to Hair Loss Therapy page removed due to Google Ads guidelines violation */}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-base font-normal tracking-wide mb-5 flex items-center">
              <span className="w-6 h-px bg-[#7BA7C2]/40 mr-3"></span>
              {t('footer.contact.title')}
            </h3>
            <address className="not-italic text-sm font-light text-gray-300 space-y-3">
              <p className="leading-relaxed">{t('footer.contact.address.line2')}<br/>{t('footer.contact.address.line3')}<br/>{t('footer.contact.address.line4')}</p>
              
              <div className="pt-2">
                <a 
                  href="tel:+4921612963017"
                  className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors py-1.5"
                  onClick={() => trackPhoneCall('+4921612963017', 'footer')}
                >
                  <Phone size={14} className="text-[#7BA7C2]" /> 
                  <span>+49 2161 2963017</span>
                </a>
                
                <a href="mailto:info@dionhairclinic.de" className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors py-1.5">
                  <Mail size={14} className="text-[#7BA7C2]" /> 
                  <span>info@dionhairclinic.de</span>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent my-10"></div>

        {/* Copyright and Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-light">
          <div>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/impressum" className="hover:text-white transition-colors">{t('footer.legal.imprint')}</Link>
            <Link to="/datenschutz" className="hover:text-white transition-colors">{t('footer.legal.privacy')}</Link>
            <Link to="/agb" className="hover:text-white transition-colors">{t('footer.legal.terms')}</Link>
            <button 
              onClick={() => {
                // Trigger cookie settings dialog if available
                const cookieSettings = document.getElementById('cookie-settings-button');
                if (cookieSettings) {
                  cookieSettings.click();
                }
              }} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('footer.legal.cookies')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
