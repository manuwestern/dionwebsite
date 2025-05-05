import React from 'react';
import { Check } from 'lucide-react';
import { fontSize, fontWeight, textColor, lineHeight } from '../../../utils/typography';

interface Price {
  title: string;
  price: string;
  regularPrice?: string;
}

interface ElegantPricePackageCardProps {
  title: string;
  description: string;
  prices: Price[];
  features: string[];
  index: number;
  hoverPackage: number | null;
  setHoverPackage: (index: number | null) => void;
  packageIncludes: string;
  isSpringOffer?: boolean;
}

const ElegantPricePackageCard: React.FC<ElegantPricePackageCardProps> = ({
  title,
  description,
  prices,
  features,
  index,
  hoverPackage,
  setHoverPackage,
  packageIncludes,
  isSpringOffer = true // Default to true während des Aktionszeitraums
}) => {
  const isHovered = index === hoverPackage;
  
  return (
    <div 
      className="group relative"
      onMouseEnter={() => setHoverPackage(index)}
      onMouseLeave={() => setHoverPackage(null)}
    >
      {/* Card with elegant design */}
      <div 
        className={`relative bg-white backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-500 h-full border ${
          isHovered
            ? 'shadow-lg transform -translate-y-1 border-[#7BA7C2]/60'
            : isSpringOffer 
              ? 'border-[#86C166]/30 hover:shadow-md' 
              : 'border-gray-100 hover:shadow-md'
        }`}
      >
        {/* Top accent line - Spring color for spring offers */}
        <div 
          className={`h-1 w-full transition-all duration-300 ${
            isHovered 
              ? isSpringOffer ? 'bg-[#86C166]' : 'bg-[#7BA7C2]' 
              : isSpringOffer ? 'bg-[#86C166]/30' : 'bg-[#7BA7C2]/30'
          }`}
        ></div>
        
        {/* Spring offer badge - text shifted to the right */}
        {isSpringOffer && (
          <div className="absolute -right-14 top-5 bg-[#86C166] text-white py-1.5 px-10 transform rotate-45 shadow-sm z-10">
            <span className="text-xs font-medium tracking-wider pl-8">Frühjahrsangebot</span>
          </div>
        )}
        
        <div className="p-6 md:p-8">
          {/* Title with subtle underline */}
          <div className="mb-6 pb-3 border-b border-gray-100">
            <h3 
              className={`${fontSize.lg} ${fontWeight.medium} ${textColor.dark} transition-colors duration-300 ${
                isHovered ? 'text-[#7BA7C2]' : ''
              }`}
            >
              {title}
            </h3>
          </div>
          
          {/* Description */}
          <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} mb-6 min-h-[60px]`}>
            {description}
          </p>
          
          {/* Prices */}
          <div className="mb-8">
            {prices.map((price, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 group">
                <span className={`${fontSize.base} ${textColor.dark} ${fontWeight.normal}`}>{price.title}</span>
                <div className="flex flex-col items-end">
                  {isSpringOffer && price.regularPrice && (
                    <span className={`text-sm text-gray-500 line-through`}>
                      {price.regularPrice}
                    </span>
                  )}
                  <span className={`${fontSize.lg} ${isSpringOffer ? 'text-[#86C166]' : textColor.primary} ${fontWeight.medium} transition-all duration-300 group-hover:scale-110`}>
                    {price.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Features */}
          <div className="mb-6">
            <h4 className={`${fontSize.base} ${fontWeight.medium} ${textColor.primary} mb-4`}>
              {packageIncludes}
            </h4>
            <ul className="grid gap-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start group">
                  <div className="mr-3 flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#7BA7C2]/20">
                    <Check className="h-3 w-3 text-[#7BA7C2]" />
                  </div>
                  <span className={`${fontSize.sm} ${textColor.dark} ${fontWeight.normal}`}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom right subtle accent - spring themed during offer */}
        <div 
          className={`absolute bottom-0 right-0 w-16 h-16 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            background: isSpringOffer 
              ? `radial-gradient(circle at bottom right, #86C16615, transparent 70%)`
              : `radial-gradient(circle at bottom right, #7BA7C215, transparent 70%)`
          }}
        ></div>
      </div>
      
      {/* Subtle shadow effect on hover - spring themed during offer */}
      <div className={`absolute -z-10 w-full h-full rounded-xl ${isSpringOffer ? 'bg-[#86C166]/5' : 'bg-[#7BA7C2]/5'} top-2 left-1 transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default ElegantPricePackageCard;
