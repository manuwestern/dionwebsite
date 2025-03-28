import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Instagram, Music } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../../utils/typography';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center mr-4 shrink-0">
          {icon}
        </div>
        <div>
          <h3 className={`${textStyle.cardTitle} mb-3`}>{title}</h3>
          <div className={`${textStyle.bodyText} ${textColor.medium}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactInfoSection: React.FC = () => {
  const { t } = useTranslation('contact');

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white -z-10"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${textStyle.sectionTitle} mb-4`}>
            {t('contactInfo.title')}
          </h2>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto`}>
            {t('contactInfo.description')}
          </p>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-6 mx-auto`}></div>
        </div>
        
        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Address Card */}
          <ContactCard 
            icon={<MapPin className="w-6 h-6 text-[#7BA7C2]" />} 
            title={t('contactInfo.address.title')}
          >
            <address className="not-italic">
              <p>{t('contactInfo.address.line1')}</p>
              <p>{t('contactInfo.address.line2')}</p>
              <p>{t('contactInfo.address.line3')}</p>
              <p>{t('contactInfo.address.line4')}</p>
            </address>
          </ContactCard>
          
          {/* Phone Card */}
          <ContactCard 
            icon={<Phone className="w-6 h-6 text-[#7BA7C2]" />} 
            title={t('contactInfo.phone.title')}
          >
            <p className="mb-2">
              <a 
                href={`tel:${t('contactInfo.phone.number').replace(/\s/g, '')}`} 
                className="text-[#7BA7C2] hover:underline transition-all duration-300"
              >
                {t('contactInfo.phone.number')}
              </a>
            </p>
            <p>{t('contactInfo.phone.hours')}</p>
          </ContactCard>
          
          {/* Email Card */}
          <ContactCard 
            icon={<Mail className="w-6 h-6 text-[#7BA7C2]" />} 
            title={t('contactInfo.email.title')}
          >
            <p className="mb-2">
              <a 
                href={`mailto:${t('contactInfo.email.address')}`} 
                className="text-[#7BA7C2] hover:underline transition-all duration-300"
              >
                {t('contactInfo.email.address')}
              </a>
            </p>
            <p>{t('contactInfo.email.response')}</p>
          </ContactCard>
        </div>
        
        {/* Social Media Section */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <h3 className={`${textStyle.primaryHeading} mb-4 text-center`}>
            {t('contactInfo.social.title')}
          </h3>
          <p className={`${textStyle.bodyText} text-center mb-8`}>
            {t('contactInfo.social.description')}
          </p>
          
          <div className="flex justify-center gap-8">
            <a 
              href="https://www.instagram.com/dionhairclinic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-16 h-16 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center group-hover:bg-[#7BA7C2]/20 transition-colors duration-300">
                <Instagram className="w-8 h-8 text-[#7BA7C2]" />
              </div>
              <p className={`${fontSize.sm} ${textColor.medium} text-center mt-2`}>Instagram</p>
            </a>
            
            <a 
              href="https://www.tiktok.com/@dionhairclinic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <div className="w-16 h-16 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center group-hover:bg-[#7BA7C2]/20 transition-colors duration-300">
                <Music className="w-8 h-8 text-[#7BA7C2]" />
              </div>
              <p className={`${fontSize.sm} ${textColor.medium} text-center mt-2`}>TikTok</p>
            </a>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -z-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -z-10 blur-3xl"></div>
      </div>
    </section>
  );
};

export default ContactInfoSection;
