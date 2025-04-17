import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';

export interface Method {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  benefits: string[];
  process: string[];
  idealFor: string;
}

interface AdditionalInfo {
  personalConsultation: {
    title: string;
    description: string;
  };
  combinedTechniques: {
    title: string;
    description: string;
  };
}

interface MethodsCardsSectionProps {
  title: string;
  subtitle: string;
  methods: Method[];
  translationNamespace: string;
  defaultImagePath?: string;
  altTextPrefix?: string;
  additionalInfo?: AdditionalInfo;
  sectionLabels?: {
    benefits: string;
    process: string;
  };
  imageMapping?: Record<string, string>;
  enableHyphenation?: boolean;
}

const MethodsCardsSection: React.FC<MethodsCardsSectionProps> = ({
  title,
  subtitle,
  methods,
  translationNamespace,
  defaultImagePath = 'FUE_Haartransplantation_Schema.svg',
  altTextPrefix = '',
  additionalInfo,
  sectionLabels,
  imageMapping = {},
  enableHyphenation = false
}) => {
  const { t } = useTranslation(translationNamespace);
  const [hoverMethod, setHoverMethod] = useState<number | null>(null);

  // Helper function to get the correct image path
  const getImagePath = (imageName: string): string => {
    if (!imageName) return defaultImagePath;
    
    // Check if we have a mapping for this image
    if (imageMapping[imageName]) {
      return imageMapping[imageName];
    }
    
    // Handle common image format conversions
    if (imageName.endsWith('.jpg') || imageName.endsWith('.jpeg')) {
      return imageName.replace(/\.(jpg|jpeg)$/, '.webp');
    }
    if (imageName.endsWith('.png')) {
      return imageName.replace('.png', '.webp');
    }
    
    return imageName;
  };

  // Helper function to determine if an image should be displayed as cover or contain
  const isImageCover = (imageName: string): boolean => {
    const coverImages = ['saphir_fue.jpg', 'dhi_fue.jpg', 'mesotherapie.png', 'haaranalyse.png', 'hairselection.jpeg'];
    return coverImages.some(img => imageName.includes(img.replace(/\.(jpg|jpeg|png)$/, '')));
  };

  // Helper function to generate alt text
  const generateAltText = (method: Method): string => {
    if (altTextPrefix) {
      return `${method.title} - ${altTextPrefix}`;
    }
    return method.title;
  };

  // Helper function to add hyphenation classes if enabled
  const getHyphenationClass = (): string => {
    return enableHyphenation ? 'break-words hyphens-auto' : '';
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -left-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -right-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className={`${textStyle.sectionTitle} ${getHyphenationClass()}`} lang="de">{title}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4 ${getHyphenationClass()}`} lang="de">
            {subtitle}
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {methods.map((method, index) => {
            const isHovered = index === hoverMethod;
            const imagePath = getImagePath(method.image);
            const isObjectCover = isImageCover(method.image);
            
            return (
              <div 
                key={index} 
                className="group relative"
                onMouseEnter={() => setHoverMethod(index)}
                onMouseLeave={() => setHoverMethod(null)}
              >
                {/* Card with glass morphism effect */}
                <div 
                  className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full border-2 ${
                    isHovered 
                      ? 'shadow-xl transform -translate-y-2' 
                      : 'hover:shadow-xl'
                  }`}
                  style={{
                    borderColor: isHovered ? '#7BA7C2CC' : 'rgba(243, 244, 246, 0.8)', // 80% opacity for hover, gray-100/80 equivalent
                  }}
                >
                  {/* Decorative elements from TreatmentAreasSection */}
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-50 -mr-24 -mt-24 blur-xl transition-opacity duration-500"
                       style={{ 
                         background: 'radial-gradient(circle at top right, #7BA7C215, transparent 70%)',
                         opacity: isHovered ? 1 : 0
                       }}></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-50 -ml-24 -mb-24 blur-xl transition-opacity duration-500"
                       style={{ 
                         background: 'radial-gradient(circle at bottom left, #7BA7C215, transparent 70%)',
                         opacity: isHovered ? 0.7 : 0
                       }}></div>
                  {/* Method Image with background gradient */}
                  <div className="h-72 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#7BA7C2]/60 to-[#7BA7C2]/10 z-0"></div>
                    <img 
                      src={`/images/${imagePath}`}
                      alt={generateAltText(method)}
                      className={`h-full w-full relative z-10 transition-all duration-700 ${
                        isHovered ? 'scale-105' : 'scale-100'
                      } ${
                        isObjectCover
                          ? 'object-cover' 
                          : 'object-contain p-6'
                      }`}
                      loading="lazy"
                      decoding="async"
                      width={isObjectCover ? "600" : "400"}
                      height={isObjectCover ? "400" : "400"}
                    />
                    
                    {/* Method title overlay with fixed height for consistent multi-line titles */}
                    <div className="absolute bottom-0 left-0 right-0 py-6 px-6 bg-gradient-to-t from-black/60 to-transparent min-h-[90px] flex flex-col justify-end z-20">
                      <h3 
                        className={`${fontSize.lg} ${fontWeight.normal} ${tracking.wide} drop-shadow-md leading-tight transition-colors duration-300`}
                        style={{ 
                          color: isHovered ? '#7BA7C2' : 'white',
                        }}
                      >{method.title}</h3>
                      <p className={`${fontSize.sm} text-white/90 ${fontWeight.normal} mt-1`}>{method.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Method Content */}
                  <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full">
                    {/* Description */}
                    <div className="mb-6">
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} ${getHyphenationClass()}`} lang="de">
                        {method.description}
                      </p>
                    </div>
                    
                    {/* Benefits section */}
                    <div className="mb-6">
                      <h4 className={`${fontSize.base} ${fontWeight.medium} ${textColor.primary} ${tracking.wide} mb-4 flex items-center`}>
                        <span className="w-8 h-px bg-[#7BA7C2]/25 mr-3"></span>
                        {sectionLabels?.benefits || t('methodsSection.sectionLabels.benefits')}
                      </h4>
                      <div>
                        <ul className="grid gap-3">
                          {method.benefits.map((benefit: string, i: number) => (
                            <li key={i} className="flex items-start group">
                              <div className="mr-3 flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#7BA7C2]/20">
                                <Check className="h-3 w-3 text-[#7BA7C2]" />
                              </div>
                              <span className={`${fontSize.sm} ${textColor.dark} ${fontWeight.normal} ${getHyphenationClass()}`} lang="de">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Process section */}
                    <div className="mb-6">
                      <h4 className={`${fontSize.base} ${fontWeight.medium} ${textColor.primary} ${tracking.wide} mb-4 flex items-center`}>
                        <span className="w-8 h-px bg-[#7BA7C2]/25 mr-3"></span>
                        {sectionLabels?.process || t('methodsSection.sectionLabels.process')}
                      </h4>
                      <div>
                        <ol className="grid gap-4">
                          {method.process.map((step: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <div className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-[#7BA7C2]/10 text-[#7BA7C2] flex items-center justify-center font-medium text-sm transition-all duration-300 group-hover:bg-[#7BA7C2]/20">
                                {i + 1}
                              </div>
                              <span className={`${fontSize.sm} ${textColor.dark} ${fontWeight.normal} ${getHyphenationClass()}`} lang="de">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    
                    {/* Ideal for section */}
                    <div className="mt-auto pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                      <span className={`inline-block px-4 py-2 sm:px-5 sm:py-2.5 bg-[#7BA7C2]/10 rounded-full ${fontSize.sm} ${fontWeight.normal} ${textColor.primary} transition-all duration-300 group-hover:bg-[#7BA7C2]/15`}>
                        {method.idealFor}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative shadow element - enhanced with TreatmentAreasSection styling */}
                <div className={`absolute -z-10 w-[calc(100%+16px)] h-[calc(100%+16px)] rounded-2xl top-2 left-2 blur-md transition-all duration-500 ${
                  isHovered ? 'opacity-80' : 'opacity-0'
                }`} style={{ backgroundColor: '#7BA7C210' }}></div>
              </div>
            );
          })}
        </div>
        
        {/* Additional information */}
        {additionalInfo && (
          <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="md:w-1/2">
                <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left ${getHyphenationClass()}`} lang="de">
                  {additionalInfo.personalConsultation.title}
                </h3>
                <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0 ${getHyphenationClass()}`} lang="de">
                  {additionalInfo.personalConsultation.description}
                </p>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left ${getHyphenationClass()}`} lang="de">
                  {additionalInfo.combinedTechniques.title}
                </h3>
                <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0 ${getHyphenationClass()}`} lang="de">
                  {additionalInfo.combinedTechniques.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MethodsCardsSection;
