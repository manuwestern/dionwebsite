import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

export interface Stat {
  value: string;
  label: string;
}

export interface PriceTag {
  title: string;
  price: string;
  description?: string;
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  welcomeText: string;
  translationNamespace: string;
  // Image options
  imageSrc?: string;
  imageAltMobile?: string;
  imageAltDesktop?: string;
  // CTA options
  ctaLink?: string;
  ctaText?: string;
  ctaOnClick?: () => void;
  // Stats options
  stats?: Stat[];
  // Price tags options
  priceTags?: PriceTag[];
  // Custom right content
  rightContent?: ReactNode;
  // Style options
  enableHyphenation?: boolean;
  minHeightMobile?: string;
  minHeightDesktop?: string;
  rightColumnWidth?: string;
  leftColumnWidth?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  welcomeText,
  translationNamespace,
  // Image options
  imageSrc,
  imageAltMobile = "",
  imageAltDesktop = "",
  // CTA options
  ctaLink = '/kontakt',
  ctaText = 'buttons.consultation',
  ctaOnClick,
  // Stats options
  stats = [
    { value: '98%', label: 'stats.satisfiedPatients' },
    { value: '5.000+', label: 'stats.successfulTreatments' },
    { value: '15+', label: 'stats.yearsExperience' }
  ],
  // Price tags options
  priceTags,
  // Custom right content
  rightContent,
  // Style options
  enableHyphenation = true,
  minHeightMobile = "85vh",
  minHeightDesktop = "85vh",
  rightColumnWidth = "50%",
  leftColumnWidth = "50%"
}) => {
  const { t } = useTranslation([translationNamespace, 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations immediately
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Helper function to add hyphenation classes if enabled
  const getHyphenationClass = (): string => {
    return enableHyphenation ? 'break-words hyphens-auto' : '';
  };

  // Render CTA button based on props
  const renderCTAButton = () => {
    const buttonContent = (
      <>
        <span className={buttonRippleClass}></span>
        <span className={`relative flex items-center ${textStyle.button}`}>
          {t(ctaText, { ns: 'common' })}
          <ArrowRight className={`${buttonArrowClass} ml-2`} />
        </span>
      </>
    );

    if (ctaOnClick) {
      return (
        <button 
          className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
          onClick={ctaOnClick}
        >
          {buttonContent}
        </button>
      );
    }

    return (
      <Link 
        to={ctaLink} 
        className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] inline-block`}
      >
        {buttonContent}
      </Link>
    );
  };

  // Render right content based on props
  const renderRightContent = () => {
    if (rightContent) {
      return rightContent;
    }

    if (priceTags && priceTags.length > 0) {
      return (
        <div className={`grid grid-cols-2 gap-6`}>
          {priceTags.map((tag, index) => (
            <div 
              key={index} 
              className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#7BA7C2]/20 transform ${
                index % 4 === 0 ? 'rotate-[-3deg]' : 
                index % 4 === 1 ? 'rotate-[2deg]' : 
                index % 4 === 2 ? 'rotate-[1deg]' : 
                'rotate-[-2deg]'
              } hover:rotate-0 transition-all duration-300 ${
                index % 4 === 1 || index % 4 === 3 ? 'mt-4' : ''
              }`}
            >
              <div className="text-[#7BA7C2] font-medium text-xl mb-1">{tag.title}</div>
              <div className="text-gray-800 font-light text-4xl mb-2">{tag.price}</div>
              {tag.description && <div className="text-gray-600 text-sm">{tag.description}</div>}
            </div>
          ))}
        </div>
      );
    }

    if (imageSrc) {
      return (
        <img 
          src={imageSrc}
          alt={imageAltDesktop}
          className="w-auto h-auto max-h-[750px] object-contain object-center relative z-10 scale-125"
          width="650"
          height="850"
          loading="lazy"
          decoding="async"
          fetchPriority="high"
        />
      );
    }

    return null;
  };

  // Render mobile right content
  const renderMobileRightContent = () => {
    if (priceTags && priceTags.length > 0) {
      return (
        <div className="grid grid-cols-2 gap-4 max-w-[360px] mx-auto">
          {priceTags.map((tag, index) => (
            <div 
              key={index} 
              className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-[#7BA7C2]/20 transform rotate-[-3deg] hover:rotate-0 transition-all duration-300"
            >
              <div className="text-[#7BA7C2] font-medium text-lg">{tag.title}</div>
              <div className="text-gray-800 font-light text-2xl">{tag.price}</div>
              {tag.description && <div className="text-gray-600 text-xs">{tag.description}</div>}
            </div>
          ))}
        </div>
      );
    }

    if (imageSrc) {
      return (
        <img 
          src={imageSrc}
          alt={imageAltMobile}
          className="w-auto h-auto max-h-[500px] object-contain relative z-10 scale-125"
          width="450"
          height="650"
          loading="lazy"
          decoding="async"
          fetchPriority="high"
        />
      );
    }

    return null;
  };

  return (
    <div 
      ref={heroRef}
      className={`relative overflow-hidden md:min-h-[85vh] flex items-center`}
    >
      {/* Background with simple gradient */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] bg-[url('/images/dionhairclinic_bg.svg')] bg-[length:200px_200px] bg-repeat"
        ></div>
      </div>
      
      {/* Mobile Layout */}
      <div className="md:hidden w-full max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col px-5">
          {/* Main content area with perfect spacing */}
          <div className="flex-1 flex flex-col pt-4 pb-0 min-h-[85vh]">
            {/* Text content with refined typography and animations */}
            <div className="space-y-6 mt-4">
              {/* Title with elegant animation and perfect typography */}
              <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
                <h1 className={`${textStyle.heroTitle} text-center px-1 leading-tight ${getHyphenationClass()} whitespace-pre-line`} lang="de">
                  {title}
                </h1>
                
                {/* Subtitle with refined styling */}
                <div className="mt-3 mb-2">
                  <span className={`block text-center ${fontSize.h4} ${textColor.medium} ${fontWeight.light} ${tracking.wider} leading-relaxed ${getHyphenationClass()}`} lang="de">
                    {subtitle}
                  </span>
                </div>
                
                {/* Elegant gradient underline with perfect animation */}
                <div className={`${gradientUnderline.primary} h-[1.5px] w-[85%] max-w-[280px] mx-auto mt-5 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              </div>
              
              {/* Welcome text with perfect spacing and animation */}
              <div className={`px-2 transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className={`${textStyle.bodyText} text-center max-w-md mx-auto leading-relaxed ${getHyphenationClass()}`} lang="de">
                  {welcomeText}
                </p>
              </div>
              
              {/* CTA button with refined styling and animation */}
              <div className={`flex justify-center mt-8 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {renderCTAButton()}
              </div>
            </div>
            
            {/* Right content section */}
            <div className="mt-[100px] relative">
              {/* Content with animation */}
              <div className={`relative flex justify-center transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                {renderMobileRightContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-8 relative z-10">
        <div className="relative min-h-[85vh] flex items-center">
          {/* Text content with refined typography and animations */}
          <div className="relative z-10 w-[50%] flex flex-col justify-center h-full pt-6 pr-12">
            {/* Title with elegant animation and perfect typography */}
            <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
              <h1 className={`${textStyle.heroTitle} text-left leading-tight ${getHyphenationClass()} whitespace-pre-line`} lang="de">
                {title}
              </h1>
              
              {/* Subtitle with refined styling */}
              <div className="mt-3 mb-2">
                <span className={`block ${fontSize.h3} ${textColor.medium} ${fontWeight.light} ${tracking.elegant} leading-relaxed ${getHyphenationClass()}`} lang="de">
                  {subtitle}
                </span>
              </div>
              
              {/* Elegant gradient underline with perfect animation */}
              <div className={`${gradientUnderline.primary} h-[1.5px] w-[90%] max-w-[400px] mt-6 mb-8 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
            </div>
            
            {/* Welcome text with perfect spacing and animation */}
            <div className={`transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className={`${textStyle.bodyTextImportant} max-w-2xl leading-relaxed ${getHyphenationClass()}`} lang="de">
                {welcomeText}
              </p>
            </div>
            
            {/* Stats with refined styling and animations */}
            {stats && stats.length > 0 && (
              <div className={`flex gap-14 mt-12 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <span className={`${textStyle.stat} text-[#7BA7C2]`}>{stat.value}</span>
                    <span className={`${fontSize.sm} ${textColor.light} ${fontWeight.light} tracking-wide`}>
                      {t(stat.label, { ns: 'common' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            {/* CTA button with refined styling and animation */}
            <div className={`mt-12 flex justify-start transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {renderCTAButton()}
            </div>
          </div>
          
          {/* Right content section */}
          <div className={`absolute right-0 top-0 bottom-0 w-[50%] h-full flex items-center justify-end transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {renderRightContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
