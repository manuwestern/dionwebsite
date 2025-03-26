import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

interface TreatmentArea {
  id: string;
  imageUrl: string;
  titleKey: string;
  descriptionKey: string;
  mobileDescription: string;
  altText: string;
}

const TreatmentAreasSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverCard, setHoverCard] = useState<string | null>(null);

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const element = document.getElementById('treatment-areas-section');
      
      if (element) {
        const elementPosition = element.offsetTop + 200;
        
        if (scrollPosition > elementPosition) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Treatment areas data with images and custom descriptions for mobile view
  const treatmentAreas: TreatmentArea[] = [
    {
      id: 'head',
      imageUrl: '/images/Behandlung_Haartransplantation.webp',
      titleKey: 'treatmentAreasSection.areas.0.title',
      descriptionKey: 'treatmentAreasSection.areas.0.description',
      mobileDescription: 'Leiden Sie unter kahlen Stellen oder Geheimratsecken?',
      altText: 'Haartransplantation in Mönchengladbach - Wiederherstellung des Haupthaars mit modernsten FUE und DHI Techniken'
    },
    {
      id: 'beard',
      imageUrl: '/images/Behandlung_Barthaartransplantation.webp',
      titleKey: 'treatmentAreasSection.areas.1.title',
      descriptionKey: 'treatmentAreasSection.areas.1.description',
      mobileDescription: 'Wünschen Sie sich einen volleren Bart ohne Lücken?',
      altText: 'Barthaartransplantation in der Dion Hair Clinic - Verdichtung und Neugestaltung des Bartwuchses für einen volleren Bart'
    },
    {
      id: 'eyebrows',
      imageUrl: '/images/Behandlung_Augenbrauentransplantation.webp',
      titleKey: 'treatmentAreasSection.areas.2.title',
      descriptionKey: 'treatmentAreasSection.areas.2.description',
      mobileDescription: 'Möchten Sie ausdrucksstarke, volle Augenbrauen?',
      altText: 'Augenbrauentransplantation bei Dion Hair Clinic - Wiederherstellung oder Verdichtung der Augenbrauen für einen ausdrucksstarken Blick'
    }
  ];

  return (
    <section id="treatment-areas-section" className="py-24 md:py-32 relative overflow-hidden">
      {/* Elegant background with subtle animations */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-white"></div>
        
        {/* Animated gradient circles */}
        <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#7BA7C2]/5 to-transparent -top-[400px] -left-[400px] blur-3xl"></div>
        <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#7BA7C2]/5 to-transparent -bottom-[300px] -right-[300px] blur-3xl"></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        {/* Animated gradient lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent"></div>
          <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent"></div>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Elegant section header */}
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle} mb-4`} lang="de">{t('treatmentAreasSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[300px] mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-6`}>
            {t('treatmentAreasSection.subtitle')}
          </p>
        </div>

        {/* Mobile View - Only visible on small screens */}
        <div className="md:hidden space-y-10">
          {treatmentAreas.map((area, index) => (
            <div 
              key={area.id}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Treatment area card with enhanced styling */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100/80">
                {/* Image container with elegant styling */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#7BA7C2]/10 to-transparent"></div>
                  <img
                    src={area.imageUrl}
                    alt={area.altText}
                    className="w-full h-64 object-cover relative z-10"
                    loading="lazy"
                  />
                  {/* Elegant overlay with title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 z-20">
                    <h3 className={`${textStyle.primaryHeading} text-white mb-0`}>{t(area.titleKey)}</h3>
                  </div>
                </div>
                
                  {/* Text content container with refined typography and fixed height */}
                  <div className="p-6 text-center flex flex-col h-[220px]">
                    <div className="flex-grow">
                      <p className={`${textStyle.bodyText} line-clamp-6`}>
                        {t(area.descriptionKey)}
                      </p>
                    </div>
                    
                    {/* Elegant button with ripple effect - positioned at bottom */}
                    <div className="mt-auto pt-6">
                      <button className={`${buttonStyle.primary} w-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                        <span className={buttonRippleClass}></span>
                        <span className={`relative flex items-center justify-center ${textStyle.button} uppercase tracking-widest`}>
                          {t('buttons.moreInfo', { ns: 'common' })}
                          <ArrowRight className={`${buttonArrowClass} ml-2`} />
                        </span>
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Hidden on small screens, grid layout on medium and up */}
        <div className="hidden md:grid grid-cols-3 gap-10">
          {treatmentAreas.map((area, index) => {
            const isHovered = area.id === hoverCard;
            
            return (
              <div 
                key={area.id}
                className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoverCard(area.id)}
                onMouseLeave={() => setHoverCard(null)}
              >
                {/* Treatment area card with glass morphism and hover effects */}
                <div className={`group relative bg-white backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg transition-all duration-500 h-full ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-2 border-2 border-[#7BA7C2]' 
                    : 'border border-gray-100/80 hover:shadow-xl'
                }`}>
                  {/* Image container with elegant overlay effects */}
                  <div className="relative h-72 overflow-hidden">
                    {/* Gradient overlay that intensifies on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-opacity duration-500 ${
                      isHovered ? 'opacity-80' : 'opacity-60'
                    }`}></div>
                    
                    {/* Subtle color overlay on hover */}
                    <div className={`absolute inset-0 bg-[#7BA7C2]/20 z-10 transition-opacity duration-500 ${
                      isHovered ? 'opacity-30' : 'opacity-0'
                    }`}></div>
                    
                    {/* Image with zoom effect on hover */}
                    <img
                      src={area.imageUrl}
                      alt={area.altText}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Title overlay positioned at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-500">
                      <h3 className={`${textStyle.primaryHeading} text-white mb-0 group-hover:text-[#7BA7C2]/90`}>
                        {t(area.titleKey)}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Text content container with refined typography and fixed height */}
                  <div className="p-8 flex flex-col h-[240px]">
                    <div className="flex-grow">
                      <p className={`${textStyle.bodyText} line-clamp-6`}>
                        {t(area.descriptionKey)}
                      </p>
                    </div>
                    
                    {/* Elegant button with ripple effect - positioned at bottom */}
                    <div className="mt-auto pt-8">
                      <button className={`${buttonStyle.primary} w-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                        <span className={buttonRippleClass}></span>
                        <span className={`relative flex items-center justify-center ${textStyle.button} uppercase tracking-widest`}>
                          {t('buttons.moreInfo', { ns: 'common' })}
                          <ArrowRight className={`${buttonArrowClass} ml-2`} />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Decorative shadow element */}
                <div className={`absolute -z-10 w-full h-full rounded-3xl bg-[#7BA7C2]/10 top-3 left-3 transition-all duration-500 ${
                  isHovered ? 'opacity-70' : 'opacity-0'
                }`}></div>
              </div>
            );
          })}
        </div>
        
        {/* Additional treatment option - Hair Loss Therapy */}
        <div className={`mt-20 relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="relative bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] rounded-2xl p-8 md:p-10 shadow-xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 -ml-32 -mb-32"></div>
            
            {/* Animated particles */}
            <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-white/70 animate-pulse"></div>
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-white/70 animate-pulse-slow"></div>
            <div className="absolute top-1/2 right-1/2 w-1 h-1 rounded-full bg-white/70 animate-pulse-slower"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${textStyle.primaryHeading} text-white mb-4 text-center md:text-left`}>
                  {t('treatmentAreasSection.areas.3.title')}
                </h3>
                <p className={`${fontSize.base} ${fontWeight.normal} ${lineHeight.relaxed} text-white/90 text-center md:text-left`}>
                  {t('treatmentAreasSection.areas.3.description')}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <button className="group relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 shadow-lg px-8 py-4 rounded-xl bg-white text-[#7BA7C2]">
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#7BA7C2] rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-wider text-[#7BA7C2]`}>
                    {t('buttons.moreInfo', { ns: 'common' })}
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentAreasSection;
