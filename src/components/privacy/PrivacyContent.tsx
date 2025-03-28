import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Shield, Smartphone, Brain, Cookie, Globe, UserCheck, Lock, Clock, AlertTriangle } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking } from '../../utils/typography';

// Section component for consistent styling
interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children, className = '', icon }) => {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="flex items-center mb-4">
        {icon && <div className="mr-3 text-[#7BA7C2]">{icon}</div>}
        <h2 className={`${textStyle.primaryHeading}`}>{title}</h2>
      </div>
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
    <div className={`mb-8 ${className}`}>
      <h3 className={`${textStyle.cardTitle} mb-3`}>{title}</h3>
      {children}
    </div>
  );
};

// Card component for visual separation
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

// List component for data points
interface ListProps {
  items: string[];
  className?: string;
}

const List: React.FC<ListProps> = ({ items, className = '' }) => {
  return (
    <ul className={`list-disc pl-5 space-y-1 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className={textStyle.bodyText}>{item}</li>
      ))}
    </ul>
  );
};

const PrivacyContent: React.FC = () => {
  const { t } = useTranslation('privacy');
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
        {/* Header Section */}
        <div className="text-center mb-16">
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

        {/* Introduction */}
        <Section title={t('introduction.title')} icon={<Shield size={24} />}>
          <Card>
            <p className={`${textStyle.bodyTextImportant} mb-4`}>{t('introduction.text')}</p>
          </Card>
        </Section>

        {/* Responsible Party */}
        <Section title={t('responsibleParty.title')} icon={<UserCheck size={24} />}>
          <Card>
            <p className={`${textStyle.bodyText} mb-4`}>{t('responsibleParty.text')}</p>
            <p className={`${textStyle.bodyTextImportant} mb-4`}>{t('responsibleParty.name')}</p>
            <address className={`${textStyle.bodyText} not-italic mb-6`}>
              {t('responsibleParty.address.street')}<br />
              {t('responsibleParty.address.city')}<br />
              {t('responsibleParty.address.country')}
            </address>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className={`${textStyle.bodyText} mb-1`}>
                  <span className={fontWeight.medium}>{t('responsibleParty.contact.phone')}</span>
                </p>
                <p className={`${textStyle.bodyText} mb-4`}>
                  <span className={fontWeight.medium}>E-Mail: </span>
                  <a href={`mailto:${t('responsibleParty.contact.email')}`} className="text-[#7BA7C2] hover:underline">
                    {t('responsibleParty.contact.email')}
                  </a>
                </p>
              </div>
            </div>
          </Card>
        </Section>

        {/* Data Collection */}
        <Section title={t('dataCollection.title')} icon={<Globe size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('dataCollection.general.title')}>
              <p className={`${textStyle.bodyText}`}>{t('dataCollection.general.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('dataCollection.website.title')}>
              <p className={`${textStyle.bodyText} mb-4`}>{t('dataCollection.website.text')}</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                {Array.from({ length: 10 }, (_, i) => (
                  <li key={i} className={textStyle.bodyText}>{t(`dataCollection.website.data.${i}`)}</li>
                ))}
              </ul>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('dataCollection.contactForm.title')}>
              <p className={`${textStyle.bodyText}`}>{t('dataCollection.contactForm.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('dataCollection.appointment.title')}>
              <p className={`${textStyle.bodyText}`}>{t('dataCollection.appointment.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Mobile Apps */}
        <Section title={t('mobileApps.title')} icon={<Smartphone size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('mobileApps.general.title')}>
              <p className={`${textStyle.bodyText}`}>{t('mobileApps.general.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('mobileApps.appData.title')}>
              <p className={`${textStyle.bodyText} mb-4`}>{t('mobileApps.appData.text')}</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <li key={i} className={textStyle.bodyText}>{t(`mobileApps.appData.data.${i}`)}</li>
                ))}
              </ul>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('mobileApps.appStore.title')}>
              <p className={`${textStyle.bodyText}`}>{t('mobileApps.appStore.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('mobileApps.appPrivacy.title')}>
              <p className={`${textStyle.bodyText} mb-2`}>
                {t('mobileApps.appPrivacy.apple')}
              </p>
              <p className={`${textStyle.bodyText}`}>
                {t('mobileApps.appPrivacy.google')}
              </p>
            </Subsection>
          </Card>
        </Section>

        {/* AI Hair Analysis */}
        <Section title={t('aiHairAnalysis.title')} icon={<Brain size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('aiHairAnalysis.general.title')}>
              <p className={`${textStyle.bodyText}`}>{t('aiHairAnalysis.general.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('aiHairAnalysis.dataProcessing.title')}>
              <p className={`${textStyle.bodyText} mb-4`}>{t('aiHairAnalysis.dataProcessing.text')}</p>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <li key={i} className={textStyle.bodyText}>{t(`aiHairAnalysis.dataProcessing.data.${i}`)}</li>
                ))}
              </ul>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('aiHairAnalysis.aiSecurity.title')}>
              <p className={`${textStyle.bodyText}`}>{t('aiHairAnalysis.aiSecurity.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('aiHairAnalysis.aiConsent.title')}>
              <p className={`${textStyle.bodyText}`}>{t('aiHairAnalysis.aiConsent.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Cookies */}
        <Section title={t('cookies.title')} icon={<Cookie size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('cookies.general.title')}>
              <p className={`${textStyle.bodyText}`}>{t('cookies.general.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('cookies.types.title')}>
              <div className="space-y-4">
                <div>
                  <h4 className={`${fontWeight.medium} ${textStyle.bodyText} mb-1`}>{t('cookies.types.essential.title')}</h4>
                  <p className={`${textStyle.bodyText}`}>{t('cookies.types.essential.text')}</p>
                </div>
                
                <div>
                  <h4 className={`${fontWeight.medium} ${textStyle.bodyText} mb-1`}>{t('cookies.types.functional.title')}</h4>
                  <p className={`${textStyle.bodyText}`}>{t('cookies.types.functional.text')}</p>
                </div>
                
                <div>
                  <h4 className={`${fontWeight.medium} ${textStyle.bodyText} mb-1`}>{t('cookies.types.analytics.title')}</h4>
                  <p className={`${textStyle.bodyText}`}>{t('cookies.types.analytics.text')}</p>
                </div>
                
                <div>
                  <h4 className={`${fontWeight.medium} ${textStyle.bodyText} mb-1`}>{t('cookies.types.marketing.title')}</h4>
                  <p className={`${textStyle.bodyText}`}>{t('cookies.types.marketing.text')}</p>
                </div>
              </div>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('cookies.management.title')}>
              <p className={`${textStyle.bodyText}`}>{t('cookies.management.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Third Party Services */}
        <Section title={t('thirdPartyServices.title')} icon={<Globe size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('thirdPartyServices.analytics.title')}>
              <p className={`${textStyle.bodyText}`}>{t('thirdPartyServices.analytics.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('thirdPartyServices.maps.title')}>
              <p className={`${textStyle.bodyText}`}>{t('thirdPartyServices.maps.text')}</p>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('thirdPartyServices.social.title')}>
              <p className={`${textStyle.bodyText}`}>{t('thirdPartyServices.social.text')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Data Subject Rights */}
        <Section title={t('dataSubjects.title')} icon={<UserCheck size={24} />}>
          <Card className="mb-6">
            <Subsection title={t('dataSubjects.rights.title')}>
              <p className={`${textStyle.bodyText}`}>{t('dataSubjects.rights.text')}</p>
            </Subsection>
          </Card>
          
          <Card className="mb-6">
            <Subsection title={t('dataSubjects.rightsList.title')}>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                {Array.from({ length: 8 }, (_, i) => (
                  <li key={i} className={textStyle.bodyText}>{t(`dataSubjects.rightsList.data.${i}`)}</li>
                ))}
              </ul>
            </Subsection>
          </Card>
          
          <Card>
            <Subsection title={t('dataSubjects.supervisoryAuthority.title')}>
              <p className={`${textStyle.bodyText} mb-2`}>{t('dataSubjects.supervisoryAuthority.text')}</p>
              <p className={`${textStyle.bodyText} mb-2`}>{t('dataSubjects.supervisoryAuthority.address')}</p>
              <p className={`${textStyle.bodyText}`}>{t('dataSubjects.supervisoryAuthority.contact')}</p>
            </Subsection>
          </Card>
        </Section>

        {/* Data Security */}
        <Section title={t('dataSecurity.title')} icon={<Lock size={24} />}>
          <Card>
            <p className={`${textStyle.bodyText}`}>{t('dataSecurity.text')}</p>
          </Card>
        </Section>

        {/* Data Retention */}
        <Section title={t('dataRetention.title')} icon={<Clock size={24} />}>
          <Card>
            <p className={`${textStyle.bodyText}`}>{t('dataRetention.text')}</p>
          </Card>
        </Section>

        {/* Changes */}
        <Section title={t('changes.title')} icon={<AlertTriangle size={24} />}>
          <Card>
            <p className={`${textStyle.bodyText}`}>{t('changes.text')}</p>
          </Card>
        </Section>

        {/* Contact */}
        <Section title={t('contact.title')} icon={<UserCheck size={24} />}>
          <Card>
            <p className={`${textStyle.bodyText} mb-4`}>{t('contact.text')}</p>
            <p className={`${textStyle.bodyTextImportant} mb-2`}>{t('contact.name')}</p>
            <p className={`${textStyle.bodyText} mb-1`}>
              <span className={fontWeight.medium}>E-Mail: </span>
              <a href={`mailto:${t('contact.email')}`} className="text-[#7BA7C2] hover:underline">
                {t('contact.email')}
              </a>
            </p>
            <p className={`${textStyle.bodyText}`}>
              <span className={fontWeight.medium}>{t('contact.phone')}</span>
            </p>
          </Card>
        </Section>
      </div>
    </div>
  );
};

export default PrivacyContent;
