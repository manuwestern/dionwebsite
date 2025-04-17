import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { textStyle } from '../../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../../utils/buttons';

interface CTASectionProps {
  // Required props
  translationNamespace: string;
  
  // Optional props
  titleKey?: string;
  descriptionKey?: string;
  ctaTextKey?: string;
  ctaLink?: string;
  animationDelay?: string;
  backgroundColor?: string;
  customTitle?: string;
  customDescription?: string;
  customCtaText?: string;
  showAnimation?: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({
  // Required props
  translationNamespace,
  
  // Optional props with defaults
  titleKey = 'ctaSection.title',
  descriptionKey = 'ctaSection.description',
  ctaTextKey = 'cta',
  ctaLink = '/kontakt',
  animationDelay = 'delay-300',
  backgroundColor = 'bg-white/80',
  customTitle,
  customDescription,
  customCtaText,
  showAnimation = true
}) => {
  const { t } = useTranslation([translationNamespace, 'common']);
  const [isVisible, setIsVisible] = useState(!showAnimation);

  // Trigger entrance animations if enabled
  useEffect(() => {
    if (showAnimation) {
      setIsVisible(true);
    }
  }, [showAnimation]);

  // Get text content from translations or custom props
  const title = customTitle || t(`${translationNamespace}:${titleKey}`);
  const description = customDescription || t(`${translationNamespace}:${descriptionKey}`);
  const ctaText = customCtaText || t(`${translationNamespace}:${ctaTextKey}`);

  return (
    <div className={`relative transition-all duration-1000 ${animationDelay} ease-out ${showAnimation ? (isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8') : 'opacity-100'}`}>
      <div className={`relative ${backgroundColor} backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="md:w-2/3">
            <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`} lang="de">{title}</h3>
            <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`} lang="de">
              {description}
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <Link to={ctaLink} className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
              <span className={buttonRippleClass}></span>
              <span className={`relative flex items-center ${textStyle.button}`}>
                {ctaText}
                <ArrowRight className={`${buttonArrowClass} ml-2`} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
