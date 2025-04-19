import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../../utils/typography';
import { buttonStyle, buttonRippleClass } from '../../utils/buttons';

// Constants for fixed heights and styling
const CARD_HEIGHTS = {
  mobile: {
    default: 'h-[240px]',  // Increased from 200px to 240px
    eyebrows: 'h-[280px]'  // Increased from 240px to 280px
  },
  desktop: {
    content: 'h-[380px]',
    description: 'h-[100px]',
    features: 'h-[120px]'
  }
};

export interface TreatmentArea {
  id: string;
  imageUrl: string;
  titleKey: string;
  descriptionKey: string;
  altText: string;
  features: string[];
  path: string;
}

interface TreatmentAreasSectionProps {
  title?: string;
  subtitle?: string;
  titleKey?: string;
  subtitleKey?: string;
  treatmentAreas?: TreatmentArea[];
  backgroundColor?: string;
  accentColor?: string;
  translationNamespace?: string;
  sectionId?: string;
}

const TreatmentAreasSection: React.FC<TreatmentAreasSectionProps> = ({
  title,
  subtitle,
  titleKey = 'treatmentAreasSection.title',
  subtitleKey = 'treatmentAreasSection.subtitle',
  treatmentAreas,
  backgroundColor = 'from-[#7BA7C2]/5 via-[#7BA7C2]/10 to-[#7BA7C2]/5',
  accentColor = 'bg-[#7BA7C2]',
  translationNamespace = 'home',
  sectionId = 'treatment-areas-section'
}) => {
  const { t } = useTranslation([translationNamespace, 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverCard, setHoverCard] = useState<string | null>(null);

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const element = document.getElementById(sectionId);
    
    if (element) {
      const elementPosition = element.offsetTop + 200;
      
      if (scrollPosition > elementPosition) {
        setIsVisible(true);
      }
    }
  }, [sectionId]);

  // Trigger entrance animations on scroll
  useEffect(() => {
    // Initial check
    handleScroll();
    
    // Add debounced event listener
    let timeoutId: number;
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleScroll, 50);
    };
    
    window.addEventListener('scroll', debouncedScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Use provided treatment areas or fetch from translations
  const areas = useMemo(() => {
    if (treatmentAreas) {
      return treatmentAreas;
    }
    
    // Default treatment areas if none provided
    return [
      {
        id: 'head',
        imageUrl: '/images/Behandlung_Haartransplantation.webp',
        titleKey: `${translationNamespace === 'home' ? '' : `${translationNamespace}.`}treatmentAreasSection.areas.0.title`,
        descriptionKey: `${translationNamespace === 'home' ? '' : `${translationNamespace}.`}treatmentAreasSection.areas.0.description`,
        altText: 'Haartransplantation in Mönchengladbach - Wiederherstellung des Haupthaars mit modernsten FUE und DHI Techniken',
        features: t(`${translationNamespace === 'home' ? '' : `${translationNamespace}.`}treatmentAreasSection.areas.0.features`, { returnObjects: true }) as string[],
        path: '/haartransplantation'
      },
      {
        id: 'beard',
        imageUrl: '/images/Behandlung_Barthaartransplantation.webp',
        titleKey: `${translationNamespace === 'home' ? '' : `${translationNamespace}.`}treatmentAreasSection.areas.1.title`,
        descriptionKey: `${translationNamespace === 'home' ? '' : `${translationNamespace}.`}treatmentAreasSection.areas.1.description`,
        altText: 'Barthaartransplantation in der Dion Hair Clinic - Verdichtung und Neugestaltung des Bartwuchses für einen volleren Bart',
        features: t(`${translationNamespace === 'home' ? '' : `${translationNamespace}.`}treatmentAreasSection.areas.1.features`, { returnObjects: true }) as string[],
        path: '/barthaartransplantation'
      },
      {
        id: 'eyebrows',
        imageUrl: '/images/Behandlung_Augenbrauentransplantation.webp',
        titleKey: `${translationNamespace === 'home' ? '' : `${translationNamespace}.`}treatmentAreasSection.areas.2.title`,
        descriptionKey: `${translationNamespace === 'home' ? '' : `${translationNamespace}.`}treatmentAreasSection.areas.2.description`,
        altText: 'Augenbrauentransplantation bei Dion Hair Clinic - Wiederherstellung oder Verdichtung der Augenbrauen für einen ausdrucksstarken Blick',
        features: t(`${translationNamespace === 'home' ? '' : `${translationNamespace}.`}treatmentAreasSection.areas.2.features`, { returnObjects: true }) as string[],
        path: '/augenbrauentransplantation'
      }
    ];
  }, [t, treatmentAreas, translationNamespace]);

  // Reusable button component to avoid duplication
  const MoreInfoButton = ({ path, areaId }: { path: string, areaId: string }) => {
    // Get specific text based on area ID
    const getButtonText = () => {
      switch(areaId) {
        case 'head':
          return t('buttons.hairTransplantation', { ns: 'common' });
        case 'beard':
          return t('buttons.beardTransplantation', { ns: 'common' });
        case 'eyebrows':
          return t('buttons.eyebrowTransplantation', { ns: 'common' });
        default:
          return t('buttons.moreInfo', { ns: 'common' });
      }
    };

    // Get full descriptive text for aria-label
    const getAriaLabel = () => {
      switch(areaId) {
        case 'head':
          return 'Mehr über Haartransplantation erfahren';
        case 'beard':
          return 'Mehr über Barthaartransplantation erfahren';
        case 'eyebrows':
          return 'Mehr über Augenbrauentransplantation erfahren';
        default:
          return 'Mehr Informationen';
      }
    };

    return (
      <Link
        to={path}
        className={`${buttonStyle.primary} w-4/5 shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-center`}
        aria-label={getAriaLabel()}
        title={getAriaLabel()}
      >
        <span className={buttonRippleClass}></span>
        <span className="relative flex items-center justify-center text-sm uppercase tracking-wider whitespace-pre-line">
          {getButtonText()}
          <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    );
  };

  // Extract the color from the accentColor class (assuming it's in the format "bg-[#color]")
  const colorMatch = accentColor.match(/#[0-9A-Fa-f]+/);
  const color = colorMatch ? colorMatch[0] : "#7BA7C2";

  return (
    <section id={sectionId} className="py-16 md:py-32 relative overflow-hidden">
      {/* Background is now provided by the SectionWrapper component */}
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Elegant section header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block relative">
            <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full ${accentColor}/10 blur-xl`}></div>
            <h2 className={`${textStyle.sectionTitle} mb-4`} lang="de">
              <span className="md:hidden">
                {title || (titleKey ? t(titleKey).split(' ').map((word, i, arr) => 
                  i === 0 ? <React.Fragment key={i}>{word}<br /></React.Fragment> : word
                ) : 'Behandlung\nsbereiche')}
              </span>
              <span className="hidden md:inline">
                {title || (titleKey ? t(titleKey) : 'Behandlungsbereiche')}
              </span>
            </h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[300px] mt-6 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-6`} lang="de">
            {subtitle || (subtitleKey ? t(subtitleKey) : '')}
          </p>
        </div>

        {/* Mobile View - Only visible on small screens */}
        <div className="md:hidden space-y-6">
          {areas.map((area, index) => (
            <div 
              key={area.id}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Treatment area card with enhanced styling */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100/80">
                {/* Image container with elegant styling - larger for mobile */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-b ${backgroundColor}`}></div>
                  <img
                    src={area.imageUrl}
                    alt={area.altText}
                    className="w-full h-96 object-cover relative z-10"
                    loading="lazy"
                  />
                  {/* Elegant overlay with title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 z-20">
                    <h3 className={`${textStyle.primaryHeading} text-white mb-0`}>
                      {area.titleKey ? t(area.titleKey) : ''}
                    </h3>
                  </div>
                </div>

                {/* Text content container with refined typography and conditional height based on card type */}
                <div className={`p-6 text-center flex flex-col ${CARD_HEIGHTS.mobile[area.id === 'eyebrows' ? 'eyebrows' : 'default']}`}>
                  <div className="flex-grow">
                    <div className="overflow-hidden p-2">
                      <p className={`${textStyle.bodyText}`} lang="de">
                        {area.descriptionKey ? t(area.descriptionKey) : ''}
                      </p>
                    </div>
                  </div>
                  
                  {/* Smaller button for mobile view - positioned at bottom */}
                  <div className="mt-auto pt-6 pb-4 flex justify-center">
                    <MoreInfoButton path={area.path} areaId={area.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Hidden on small screens, grid layout on medium and up */}
        <div className="hidden md:grid grid-cols-3 gap-10">
          {areas.map((area, index) => {
            const isHovered = area.id === hoverCard;
            
            return (
              <div 
                key={area.id}
                className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoverCard(area.id)}
                onMouseLeave={() => setHoverCard(null)}
              >
                {/* Treatment area card with glass morphism and hover effects - enhanced with FeatureBenefitCard styling */}
                <div 
                  className={`group relative bg-white backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg transition-all duration-500 h-full border-2 ${
                    isHovered 
                      ? 'shadow-xl transform -translate-y-2' 
                      : 'hover:shadow-xl'
                  }`}
                  style={{
                    borderColor: isHovered ? `${color}CC` : 'rgba(243, 244, 246, 0.8)', // 80% opacity for hover, gray-100/80 equivalent
                  }}>
                  {/* Decorative elements from FeatureBenefitCard */}
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-50 -mr-24 -mt-24 blur-xl transition-opacity duration-500"
                       style={{ 
                         background: `radial-gradient(circle at top right, ${color}15, transparent 70%)`,
                         opacity: isHovered ? 1 : 0
                       }}></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-50 -ml-24 -mb-24 blur-xl transition-opacity duration-500"
                       style={{ 
                         background: `radial-gradient(circle at bottom left, ${color}15, transparent 70%)`,
                         opacity: isHovered ? 0.7 : 0
                       }}></div>
                  {/* Image container with elegant overlay effects */}
                  <div className="relative h-72 overflow-hidden">
                    {/* Gradient overlay that intensifies on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-opacity duration-500 ${
                      isHovered ? 'opacity-80' : 'opacity-60'
                    }`}></div>
                    
                    {/* Subtle color overlay on hover */}
                    <div className={`absolute inset-0 ${accentColor}/20 z-10 transition-opacity duration-500 ${
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
                      <h3 
                        className={`${textStyle.primaryHeading} mb-0 transition-colors duration-300`}
                        style={{ 
                          color: isHovered ? `${color}` : 'white',
                        }}>
                        {area.titleKey ? t(area.titleKey) : ''}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Text content container with refined typography and fixed height - enhanced with features */}
                  <div className={`p-8 flex flex-col ${CARD_HEIGHTS.desktop.content}`}>
                    <div className="flex-grow">
                      <div className={CARD_HEIGHTS.desktop.description}>
                        <p className={`${textStyle.bodyText}`} lang="de">
                          {area.descriptionKey ? t(area.descriptionKey) : ''}
                        </p>
                      </div>
                      
                      {/* Key features with elegant styling and fixed height */}
                      <div className={`mt-6 ${CARD_HEIGHTS.desktop.features} space-y-3`}>
                        {area.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full ${accentColor}/20 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <div className={`w-2.5 h-2.5 rounded-full ${accentColor}`}></div>
                            </div>
                            <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} text-left break-words hyphens-auto`} lang="de">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Elegant button with ripple effect - positioned at bottom - new smaller design */}
                    <div className="mt-auto pt-6 pb-4 flex justify-center">
                      <MoreInfoButton path={area.path} areaId={area.id} />
                    </div>
                  </div>
                </div>
                
                {/* Decorative shadow element - enhanced with FeatureBenefitCard styling */}
                <div className={`absolute -z-10 w-[calc(100%+16px)] h-[calc(100%+16px)] rounded-3xl top-2 left-2 blur-md transition-all duration-500 ${
                  isHovered ? 'opacity-80' : 'opacity-0'
                }`} style={{ backgroundColor: `${color}10` }}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TreatmentAreasSection;
