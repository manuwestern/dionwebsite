import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking } from '../../utils/typography';

// Section component for consistent styling
interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`mb-10 ${className}`}>
      <h2 className={`${textStyle.primaryHeading} mb-4`}>{title}</h2>
      <div className={`${gradientUnderline.primary} w-[90%] max-w-[150px] mb-6`}></div>
      {children}
    </div>
  );
};

// Subsection component for nested content
interface SubsectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Subsection: React.FC<SubsectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className={`${textStyle.cardTitle} mb-3`}>{title}</h3>
      {children}
    </div>
  );
};

const ImprintContent: React.FC = () => {
  const { t } = useTranslation('imprint');
  const [isVisible, setIsVisible] = useState(true);

  // Trigger entrance animations immediately
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient and blur effects */}
      <div className="absolute inset-0 z-0">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -mr-[400px] -mt-[400px] blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -ml-[300px] -mb-[300px] blur-3xl"></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        {/* Animated gradient lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent animate-gradient-x"></div>
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent animate-gradient-x-slow"></div>
          <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent animate-gradient-x-slower"></div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
            <h1 className={`${textStyle.heroTitle} text-center px-1 leading-tight break-words hyphens-auto whitespace-pre-line mb-3`} lang="de">
              {t('title')}
            </h1>
            
            <div className="mt-3 mb-2">
              <span className={`block text-center ${fontSize.h4} ${textColor.medium} ${fontWeight.light} ${tracking.wider} leading-relaxed`}>
                {t('subtitle')}
              </span>
            </div>
            
            <div className={`${gradientUnderline.primary} h-[1.5px] w-[85%] max-w-[280px] mx-auto mt-5 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
          </div>
        </div>

        {/* Company Information */}
        <Section title={t('companyInfo.title')}>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <p className={`${textStyle.bodyTextImportant} mb-4`}>{t('companyInfo.name')}</p>
            <address className={`${textStyle.bodyText} not-italic mb-6`}>
              {t('companyInfo.address.street')}<br />
              {t('companyInfo.address.city')}<br />
              {t('companyInfo.address.country')}
            </address>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className={`${textStyle.bodyText} mb-1`}>
                  <span className={fontWeight.medium}>{t('companyInfo.contact.phone')}</span>
                </p>
                <p className={`${textStyle.bodyText} mb-4`}>
                  <span className={fontWeight.medium}>E-Mail: </span>
                  <a href={`mailto:${t('companyInfo.contact.email')}`} className="text-[#7BA7C2] hover:underline">
                    {t('companyInfo.contact.email')}
                  </a>
                </p>
              </div>
              
              <div>
                <p className={`${textStyle.bodyText} mb-1`}>
                  <span className={fontWeight.medium}>{t('companyInfo.registration.title')}: </span>
                  {t('companyInfo.registration.court')}
                </p>
                <p className={`${textStyle.bodyText} mb-1`}>
                  <span className={fontWeight.medium}>{t('companyInfo.registration.number')}</span>
                </p>
                <p className={`${textStyle.bodyText} mb-1`}>
                  <span className={fontWeight.medium}>{t('companyInfo.vatId.title')}: </span>
                  {t('companyInfo.vatId.number')}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Management */}
        <Section title={t('management.title')}>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <p className={`${textStyle.bodyText} mb-2`}>
              <span className={fontWeight.medium}>{t('management.name')}</span>
            </p>
            <p className={`${textStyle.bodyText}`}>
              {t('management.responsibility')}
            </p>
          </div>
        </Section>

        {/* Dispute Resolution */}
        <Section title={t('disputeResolution.title')}>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <p className={`${textStyle.bodyText} mb-2`}>
              {t('disputeResolution.text')}
              <a 
                href={t('disputeResolution.link')} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#7BA7C2] hover:underline"
              >
                {t('disputeResolution.link')}
                <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </p>
            <p className={`${textStyle.bodyText}`}>
              {t('disputeResolution.participation')}
            </p>
          </div>
        </Section>

        {/* Liability */}
        <Section title={t('liability.title')}>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 space-y-6 hover:shadow-lg transition-shadow duration-300">
            <Subsection title={t('liability.content.title')}>
              <p className={`${textStyle.bodyText}`}>{t('liability.content.text')}</p>
            </Subsection>
            
            <Subsection title={t('liability.links.title')}>
              <p className={`${textStyle.bodyText}`}>{t('liability.links.text')}</p>
            </Subsection>
            
            <Subsection title={t('liability.copyright.title')}>
              <p className={`${textStyle.bodyText}`}>{t('liability.copyright.text')}</p>
            </Subsection>
          </div>
        </Section>

        {/* Data Protection */}
        <Section title={t('dataProtection.title')}>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <p className={`${textStyle.bodyText} mb-2`}>{t('dataProtection.text')}</p>
            <p className={`${textStyle.bodyText}`}>
              {t('dataProtection.link.text')} 
              <a href={t('dataProtection.link.url')} className="ml-1 text-[#7BA7C2] hover:underline">
                {t('dataProtection.link.url')}
              </a>
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default ImprintContent;
