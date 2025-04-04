import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['knowledge', 'common']);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden md:min-h-[85vh] flex items-center">
      {/* Background with simple gradient */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col px-5">
          

          {/* Main content area with perfect spacing */}
          <div className="flex-1 flex flex-col pt-4 pb-0">
            {/* Text content with refined typography and animations */}
            <div className="space-y-6 mt-4">
              {/* Title with elegant animation and perfect typography */}
              <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
                <h1 className={`${textStyle.heroTitle} text-center px-1 leading-tight break-words hyphens-auto whitespace-pre-line`} lang="de">
                  {t('hero.title')}
                </h1>

                {/* Subtitle with refined styling */}
                <div className="mt-3 mb-2">
                  <span className={`block text-center ${fontSize.h4} ${textColor.medium} ${fontWeight.light} ${tracking.wider} leading-relaxed`}>
                    {t('hero.subtitle')}
                  </span>
                </div>

                {/* Elegant gradient underline with perfect animation */}
                <div className={`${gradientUnderline.primary} h-[1.5px] w-[85%] max-w-[280px] mx-auto mt-5 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              </div>

              {/* Welcome text with perfect spacing and animation */}
              <div className={`px-2 transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className={`${textStyle.bodyText} text-center max-w-md mx-auto leading-relaxed`}>
                  {t('hero.welcomeText')}
                </p>
              </div>

              {/* CTA button with refined styling and animation */}
              <div className={`flex justify-center mt-8 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.consultation', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </button>
              </div>
            </div>

            {/* Image section */}
            <div className="mt-[100px] relative">
              {/* Image with animation */}
              <div className={`relative flex justify-center transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <img
                  src="/images/Model_Wissen.png"
                  alt="Wissenswertes über Haare und Haarpflege"
                  className="w-auto h-auto max-h-[500px] object-contain relative z-10 scale-125"
                  width="450"
                  height="650"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-8 relative z-10">
        <div className="relative min-h-[750px] flex items-center">
          {/* Text content with refined typography and animations */}
          <div className="relative z-10 w-[50%] flex flex-col justify-center h-full pt-6 pr-12">
            {/* Title with elegant animation and perfect typography */}
            <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
              <h1 className={`${textStyle.heroTitle} text-left leading-tight break-words hyphens-auto whitespace-pre-line`} lang="de">
                {t('hero.title')}
              </h1>

              {/* Subtitle with refined styling */}
              <div className="mt-3 mb-2">
                <span className={`block ${fontSize.h3} ${textColor.medium} ${fontWeight.light} ${tracking.elegant} leading-relaxed`}>
                  {t('hero.subtitle')}
                </span>
              </div>

              {/* Elegant gradient underline with perfect animation */}
              <div className={`${gradientUnderline.primary} h-[1.5px] w-[90%] max-w-[400px] mt-6 mb-8 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
            </div>

            {/* Welcome text with perfect spacing and animation */}
            <div className={`transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className={`${textStyle.bodyTextImportant} max-w-2xl leading-relaxed`}>
                {t('hero.welcomeText')}
              </p>
            </div>

            {/* Stats with refined styling and animations */}
            <div className={`flex gap-14 mt-12 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex flex-col">
                <span className={`${textStyle.stat} text-[#7BA7C2]`}>98%</span>
                <span className={`${fontSize.sm} ${textColor.light} ${fontWeight.light} tracking-wide`}>{t('stats.satisfiedPatients', { ns: 'common' })}</span>
              </div>
              <div className="flex flex-col">
                <span className={`${textStyle.stat} text-[#7BA7C2]`}>5.000+</span>
                <span className={`${fontSize.sm} ${textColor.light} ${fontWeight.light} tracking-wide`}>{t('stats.successfulTreatments', { ns: 'common' })}</span>
              </div>
              <div className="flex flex-col">
                <span className={`${textStyle.stat} text-[#7BA7C2]`}>15+</span>
                <span className={`${fontSize.sm} ${textColor.light} ${fontWeight.light} tracking-wide`}>{t('stats.yearsExperience', { ns: 'common' })}</span>
              </div>
            </div>

            {/* CTA button with refined styling and animation */}
            <div className={`mt-12 flex justify-start transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                <span className={buttonRippleClass}></span>
                <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                  {t('buttons.consultation', { ns: 'common' })}
                  <ArrowRight className={`${buttonArrowClass} ml-2`} />
                </span>
              </button>
            </div>
          </div>

          {/* Image section */}
          <div className={`absolute right-0 top-0 bottom-0 w-[50%] h-full flex items-center justify-end transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <img
              src="/images/Model_Wissen.png"
              alt="Wissenswertes über Haare und Haarpflege"
              className="w-auto h-auto max-h-[750px] object-contain object-center relative z-10 scale-125"
              width="650"
              height="850"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
