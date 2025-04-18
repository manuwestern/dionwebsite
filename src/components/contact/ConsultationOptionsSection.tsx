import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, MapPin, Check, ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

interface OptionCardProps {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
  isHovered: boolean;
  onHover: (isHovered: boolean) => void;
  calendlyUrl: string;
  buttonText: string;
}

const OptionCard: React.FC<OptionCardProps> = ({ 
  title, 
  description, 
  benefits, 
  icon, 
  isHovered,
  onHover,
  calendlyUrl,
  buttonText
}) => {
  return (
    <div 
      className={`relative bg-white rounded-2xl shadow-lg border transition-all duration-300 overflow-hidden h-full flex flex-col ${
        isHovered 
          ? 'border-[#7BA7C2]/80 shadow-xl transform -translate-y-1' 
          : 'border-gray-100 hover:border-[#7BA7C2]/30 hover:shadow-xl'
      }`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      
      {/* Card content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        {/* Icon and title */}
        <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 mr-4 ${
            isHovered 
              ? 'bg-[#7BA7C2] text-white' 
              : 'bg-[#7BA7C2]/10 text-[#7BA7C2]'
          }`}>
            {icon}
          </div>
          <h3 className={`${fontSize.h3} ${fontWeight.medium} ${textColor.dark}`}>{title}</h3>
        </div>
        
        {/* Description */}
        <p className={`${fontSize.base} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} mb-6`}>
          {description}
        </p>
        
        {/* Benefits list */}
        <div className="flex-1">
          <h4 className={`${fontSize.base} ${fontWeight.medium} ${textColor.dark} mb-3`}>Vorteile:</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <Check className={`w-5 h-5 mr-2 mt-0.5 ${isHovered ? 'text-[#7BA7C2]' : 'text-gray-400'}`} />
                <span className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light}`}>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Button area */}
      <div className="p-6 md:p-8 pt-0">
        <a 
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full ${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] block text-center`}
        >
          <span className={buttonRippleClass}></span>
          <span className={`relative flex items-center justify-center ${textStyle.button}`}>
            {buttonText}
            <ArrowRight className={`${buttonArrowClass} ml-2`} />
          </span>
        </a>
      </div>
    </div>
  );
};

const ConsultationOptionsSection: React.FC = () => {
  const { t } = useTranslation('contact');
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle hover state
  const handleHover = (option: string, isHovered: boolean) => {
    setHoveredOption(isHovered ? option : null);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className={`${textStyle.sectionTitle} mb-4`}>
            {t('optionsSection.title')}
          </h2>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto`}>
            {t('optionsSection.subtitle')}
          </p>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-6 mx-auto`}></div>
        </div>
        
        {/* Options Cards */}
        <div className={`grid md:grid-cols-2 gap-6 md:gap-10 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Phone Consultation Option */}
          <OptionCard
            title={t('optionsSection.phoneOption.title')}
            description={t('optionsSection.phoneOption.description')}
            benefits={t('optionsSection.phoneOption.benefits', { returnObjects: true }) as string[]}
            icon={<Phone strokeWidth={1.5} className="w-6 h-6" />}
            isHovered={hoveredOption === 'phone'}
            onHover={(isHovered) => handleHover('phone', isHovered)}
            calendlyUrl="https://calendly.com/dionhairclinic/beratung-telefonisch"
            buttonText={t('optionsSection.chooseButton')}
          />
          
          {/* In-Person Consultation Option */}
          <OptionCard
            title={t('optionsSection.inPersonOption.title')}
            description={t('optionsSection.inPersonOption.description')}
            benefits={t('optionsSection.inPersonOption.benefits', { returnObjects: true }) as string[]}
            icon={<MapPin strokeWidth={1.5} className="w-6 h-6" />}
            isHovered={hoveredOption === 'inPerson'}
            onHover={(isHovered) => handleHover('inPerson', isHovered)}
            calendlyUrl="https://calendly.com/dionhairclinic/beratungklinik"
            buttonText={t('optionsSection.chooseButton')}
          />
        </div>
      </div>
    </section>
  );
};

export default ConsultationOptionsSection;
