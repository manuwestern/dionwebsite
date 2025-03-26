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
    <section id="treatment-areas-section" className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -left-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -right-[300px] blur-3xl"></div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('treatmentAreasSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[300px] mt-4 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-6`}>
            {t('treatmentAreasSection.subtitle')}
          </p>
        </div>

        {/* Mobile View - Only visible on small screens */}
        <div className="md:hidden space-y-8">
          {treatmentAreas.map((area, index) => (
            <div 
              key={area.id}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Treatment area card with enhanced styling */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                {/* Image container with subtle glow effect */}
                <div className="relative p-3">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#7BA7C2]/5 to-transparent rounded-t-3xl"></div>
                  <img
                    src={area.imageUrl}
                    alt={area.altText}
                    className="w-full h-full object-cover rounded-2xl relative z-10"
                    loading="lazy"
                  />
                </div>
                
                {/* Text content container with refined typography */}
                <div className="p-6 text-center">
                  <h3 className={`${fontSize.h3} ${fontWeight.light} ${textColor.dark} mb-3`}>{t(area.titleKey)}</h3>
                  <p className={`${textStyle.bodyText} mb-6`}>
                    {t(area.descriptionKey)}
                  </p>
                  
                  {/* Elegant button with ripple effect */}
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
          ))}
        </div>

        {/* Desktop View - Hidden on small screens, grid layout on medium and up */}
        <div className="hidden md:grid grid-cols-3 gap-8">
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
                <div className={`relative bg-white backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg transition-all duration-500 h-full flex flex-col ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-1 border-2 border-[#7BA7C2]/80' 
                    : 'border border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Image container with overlay effect on hover */}
                  <div className="relative h-64 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-t from-[#7BA7C2]/70 to-transparent z-10 opacity-0 transition-opacity duration-500 ${
                      isHovered ? 'opacity-30' : ''
                    }`}></div>
                    <img
                      src={area.imageUrl}
                      alt={area.altText}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isHovered ? 'scale-110' : 'scale-100'
                      }`}
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Text content container with refined typography */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className={`${fontSize.h3} ${fontWeight.light} ${textColor.dark} mb-4 transition-colors duration-300 ${
                      isHovered ? textColor.primary : ''
                    }`}>{t(area.titleKey)}</h3>
                    <p className={`${textStyle.bodyText} mb-8 flex-grow`}>
                      {t(area.descriptionKey)}
                    </p>
                    
                    {/* Elegant button with ripple effect */}
                    <div className="mt-auto">
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
                <div className={`absolute -z-10 w-full h-full rounded-3xl bg-[#7BA7C2]/10 top-2 left-2 transition-all duration-500 ${
                  isHovered ? 'opacity-70' : 'opacity-0'
                }`}></div>
              </div>
            );
          })}
        </div>
        
        {/* Additional treatment option - Hair Loss Therapy */}
        <div className={`mt-16 relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="absolute inset-0 bg-[#7BA7C2]/5 rounded-2xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${fontSize.h3} ${fontWeight.normal} ${textColor.primary} mb-4 text-center md:text-left`}>
                  {t('treatmentAreasSection.areas.3.title')}
                </h3>
                <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                  {t('treatmentAreasSection.areas.3.description')}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.moreInfo', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
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
