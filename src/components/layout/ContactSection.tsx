import React from 'react';
import { Phone, Mail, MessageCircle, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactSection: React.FC = () => {
  const { t } = useTranslation(['layout', 'common']);

  return (
    <div className="bg-gray-50 py-16 md:py-28 min-h-[800px] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('contactSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('contactSection.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 text-center md:text-left">
            <h3 className="text-2xl font-light mb-6">{t('contactSection.contactOptions')}</h3>
            
            <div className="space-y-6 flex flex-col items-center md:items-start">
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <div className="bg-gray-100 rounded-full p-3 mb-3 md:mb-0 md:mr-4 w-12 h-12 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg font-light mb-1">{t('contact.phone', { ns: 'common' })}</h4>
                  <p className="text-base text-gray-600 font-light">
                    <a href="tel:+491702637818" className="hover:text-gray-900 transition-colors">
                      +49 170 2637818
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {t('contact.businessHours', { ns: 'common' })}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <div className="bg-gray-100 rounded-full p-3 mb-3 md:mb-0 md:mr-4 w-12 h-12 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg font-light mb-1">{t('contact.email', { ns: 'common' })}</h4>
                  <p className="text-base text-gray-600 font-light">
                    <a href="mailto:info@dionhairclinic.de" className="hover:text-gray-900 transition-colors">
                      info@dionhairclinic.de
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {t('contact.responseTime', { ns: 'common' })}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <div className="bg-gray-100 rounded-full p-3 mb-3 md:mb-0 md:mr-4 w-12 h-12 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h4 className="text-lg font-light mb-1">{t('contact.whatsapp', { ns: 'common' })}</h4>
                  <p className="text-base text-gray-600 font-light">
                    <a href="https://wa.me/491702637818" className="hover:text-gray-900 transition-colors">
                      +49 170 2637818
                    </a>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {t('contact.quickConsultation', { ns: 'common' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center md:text-left">
              <h4 className="text-lg font-light mb-3">{t('contactSection.address.title')}</h4>
              <p className="text-base text-gray-600 font-light">
                {t('contactSection.address.line1')}<br />
                {t('contactSection.address.line2')}<br />
                {t('contactSection.address.line3')}<br />
                {t('contactSection.address.line4')}
              </p>
            </div>
          </div>

          {/* Free Hair Analysis CTA */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 rounded-2xl shadow-lg p-8 md:p-10 flex flex-col text-center md:text-left">
            <h3 className="text-2xl font-light mb-4">{t('contactSection.hairAnalysis.title')}</h3>
              <p className="text-base text-gray-600 font-light mb-6">
              {t('contactSection.hairAnalysis.description')}
            </p>
            
            <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
              <h4 className="text-xl font-light mb-4">{t('contactSection.hairAnalysis.expectations.title')}</h4>
              <ul className="space-y-3 flex flex-col items-start px-4 sm:px-8 md:px-0">
                {(t('contactSection.hairAnalysis.expectations.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <li key={index} className="flex items-start text-left w-full max-w-xs md:max-w-none">
                    <div className="w-6 h-6 rounded-full bg-[#333333] flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-base text-gray-600 font-light text-left">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-auto">
              <a 
                href="#" 
                className="block w-full bg-[#333333] text-white text-center py-3 px-6 rounded-lg font-light hover:bg-[#444444] transition-colors tracking-wider"
              >
                {t('buttons.hairAnalysis', { ns: 'common' })}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
