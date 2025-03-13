import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FooterSection: React.FC = () => {
  const { t } = useTranslation('layout');
  
  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="text-2xl font-light tracking-wider mb-4">DION<span className="font-extralight">HAIR</span></div>
            <p className="text-sm font-light text-gray-300 mb-6">
              {t('footer.clinicDescription')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-light mb-4">{t('footer.services.title')}</h3>
            <ul className="space-y-2 text-sm font-light text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.services.hairTransplant')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.services.beardTransplant')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.services.eyebrowTransplant')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.services.hairLossTherapy')}</a></li>
            </ul>
          </div>

          {/* Information */}
          <div className="col-span-1">
            <h3 className="text-lg font-light mb-4">{t('footer.information.title')}</h3>
            <ul className="space-y-2 text-sm font-light text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.information.aboutUs')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.information.results')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.information.priceCalculator')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.information.careInstructions')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.information.career')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-light mb-4">{t('footer.contact.title')}</h3>
            <address className="not-italic text-sm font-light text-gray-300 space-y-2">
              <p>{t('footer.contact.address.line2')}</p>
              <p>{t('footer.contact.address.line3')}</p>
              <p>{t('footer.contact.address.line4')}</p>
              <p className="mt-4">{t('topBar.contact.phone')}</p>
              <p><a href="mailto:info@dionhairclinic.de" className="hover:text-white transition-colors">{t('topBar.contact.email')}</a></p>
            </address>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright and Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-light">
          <div>
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">{t('footer.legal.imprint')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.legal.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.legal.terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.legal.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
