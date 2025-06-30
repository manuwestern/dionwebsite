import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, Flower, CalendarRange, Gift, PhoneCall, ChevronDown, ChevronUp } from 'lucide-react';
import { useSummerPromotion } from '../../contexts/SummerPromotionContext';
import { textStyle, fontSize, fontWeight, textColor } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import { useTranslation } from 'react-i18next';

const SummerPromotionPopup: React.FC = () => {
  const { showPopup, isClosing, closePopup } = useSummerPromotion();
  const { t } = useTranslation(['layout']);
  const popupRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Reset transform and expanded state when popup closes
  useEffect(() => {
    if (!showPopup) {
      setTranslateY(0);
      setIsExpanded(false);
    }
  }, [showPopup]);
  
  // The minimum swipe distance (in px) to trigger close
  const minSwipeDistance = 100;
  
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const currentY = e.targetTouches[0].clientY;
    const diff = currentY - touchStart;
    
    // Only allow swiping down (positive diff)
    if (diff > 0) {
      setTranslateY(diff);
    }
    
    setTouchEnd(currentY);
  };
  
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchEnd - touchStart;
    const isDownSwipe = distance > minSwipeDistance;
    
    if (isDownSwipe) {
      closePopup();
    } else {
      // Reset position if swipe wasn't long enough
      setTranslateY(0);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  if (!showPopup) {
    return null;
  }
  
  const handleWhatsAppContact = () => {
    // Explizites Event an dataLayer senden für GTM-Tracking
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'whatsapp_contact',
        eventCategory: 'Contact',
        eventAction: 'WhatsApp Click',
        eventLabel: 'Summer Promotion Popup'
      });
    }
    
    // Open WhatsApp with predefined message
    const message = encodeURIComponent(t('promotionPopup.whatsAppMessages.hair'));
    window.open(`https://wa.me/+491702637818?text=${message}`, '_blank');
    closePopup();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div 
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={closePopup}
      ></div>
      
      {/* Popup card with summer-themed styling */}
      <div 
        ref={popupRef}
        className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-[95%] md:w-full mx-auto transition-all duration-300 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{ 
          transform: `translateY(${translateY}px)`,
          transition: translateY > 0 ? 'none' : 'all 0.3s ease',
          maxHeight: isExpanded ? 'none' : '70vh',
          overflow: 'hidden'
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Summer-themed gradient top bar */}
        <div className="h-2 bg-gradient-to-r from-[#4FB5E6] to-[#FFB74D]"></div>
        
        {/* Close button - larger and more visible */}
        <button 
          onClick={closePopup}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-700 hover:text-gray-900 transition-colors z-10 bg-white/80 rounded-full p-1.5 shadow-sm"
          aria-label={t('promotionPopup.closeButton')}
        >
          <X size={24} className="md:w-7 md:h-7" />
        </button>
        
        {/* Summer-themed decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E1F5FE]/30 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FFE0B2]/40 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-[#FFE5EC]/40 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-[#4FB5E6]/10 rounded-full"></div>
        </div>
        
        {/* Mobile expand/collapse toggle button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden absolute right-0 left-0 mx-auto bottom-4 w-12 h-12 flex items-center justify-center bg-white/90 rounded-full shadow-lg z-10 border border-gray-100"
          aria-label={isExpanded ? t('promotionPopup.mobileHint.collapse') : t('promotionPopup.mobileHint.expand')}
        >
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-gray-700" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-700" />
          )}
        </button>
        
        <div className={`flex flex-col md:flex-row overflow-auto ${isExpanded ? 'max-h-[70vh]' : 'max-h-[45vh]'} md:max-h-none transition-all duration-300`}>
          {/* Left content - Summer Promotion */}
          <div className="p-4 pt-6 md:p-6 md:pt-8 md:w-1/2 relative">
            {/* Flower icon with summer color */}
            <div className="mb-4 inline-flex items-center">
              <div className="bg-[#E1F5FE] p-2 rounded-full mr-3">
                <Flower className="h-5 w-5 text-[#4FB5E6]" />
              </div>
              <span className={`${fontSize.sm} ${fontWeight.medium} text-[#4FB5E6]`}>
                {t('promotionPopup.dateRange')}
              </span>
            </div>
            
            {/* Promotion Title */}
            <h2 className={`${textStyle.primaryHeading} text-gray-800 mb-2`}>
              {t('promotionPopup.title')}
            </h2>
            <p className={`${fontSize.lg} ${fontWeight.medium} text-[#4FB5E6] mb-6`}>
              {t('promotionPopup.subtitles.hair')}
            </p>
            
            {/* Promotion details */}
            <div className="bg-[#F5FCFF] border border-[#FFE0B2] rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className={`${fontSize.base} ${fontWeight.semibold} text-gray-800`}>{t('promotionPopup.fixedPriceOffer')}</span>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500 line-through">3.499€</span>
                  <span className="text-xl font-bold text-[#4FB5E6]">2.499€</span>
                </div>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 text-[#4FB5E6]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`${fontSize.sm} ${textColor.medium}`}>
                    {t('promotionPopup.benefits.maxGrafts')}
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 text-[#4FB5E6]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`${fontSize.sm} ${textColor.medium}`}>
                    <strong>3 {t('promotionPopup.benefits.treatments', {treatmentType: t('promotionPopup.treatmentTypes.hair'), value: 750})}</strong>
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 text-[#4FB5E6]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`${fontSize.sm} ${textColor.medium}`}>
                    {t('promotionPopup.benefits.aftercare')}
                  </span>
                </li>
              </ul>
            </div>
            
            {/* Promotion validity */}
            <p className={`${fontSize.xs} ${textColor.light} mb-6 italic`}>
              {t('promotionPopup.validityNote')}
            </p>
            
            {/* WhatsApp CTA Button - Von Button zu Link geändert für GTM-Tracking */}
            <a 
              href={`https://wa.me/+491702637818?text=${encodeURIComponent(t('promotionPopup.whatsAppMessages.hair'))}`}
              target="_blank"
              rel="noopener noreferrer"
              id="summer-popup-whatsapp-button"
              onClick={(e) => {
                e.preventDefault(); // Verhindert die Standard-Navigation
                handleWhatsAppContact(); // Führt die bestehende Funktion aus
              }}
              className={`${buttonStyle.primary} w-full bg-gradient-to-r from-[#4FB5E6] to-[#FFB74D] relative overflow-hidden cursor-pointer`}
            >
              <span className={buttonRippleClass}></span>
              <span className={`relative flex items-center justify-center ${textStyle.button}`}>
                <span className="mr-2">{t('promotionPopup.whatsAppButton')}</span>
                <ArrowRight className={buttonArrowClass} />
              </span>
            </a>
          </div>
          
          {/* Right content - Benefits */}
          <div className="bg-[#F8FAFC] p-4 md:p-6 md:w-1/2 border-t md:border-t-0 md:border-l border-gray-100">
            <h3 className={`${fontSize.base} md:${fontSize.lg} ${fontWeight.medium} ${textColor.dark} mb-4`}>
              {t('promotionPopup.whyActNow')}
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-0.5 bg-[#E6F3FA] p-1.5 rounded-full">
                  <CalendarRange className="h-4 w-4 text-[#7BA7C2]" />
                </div>
                <div>
                  <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.dark}`}>
                    {t('promotionPopup.reasons.limitedTime.title')}
                  </span>
                  <p className={`${fontSize.sm} ${textColor.medium}`}>
                    {t('promotionPopup.reasons.limitedTime.description')}
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-0.5 bg-[#FFE0B2] p-1.5 rounded-full">
                  <Gift className="h-4 w-4 text-[#FFB74D]" />
                </div>
                <div>
                  <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.dark}`}>
                    {t('promotionPopup.reasons.freeTreatments.title')}
                  </span>
                  <p className={`${fontSize.sm} ${textColor.medium}`}>
                    {t('promotionPopup.reasons.freeTreatments.description', {count: 3, treatmentType: t('promotionPopup.treatmentTypes.hair')})}
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-0.5 bg-[#FFE5EC]/50 p-1.5 rounded-full">
                  <PhoneCall className="h-4 w-4 text-[#E57098]" />
                </div>
                <div>
                  <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.dark}`}>
                    {t('promotionPopup.reasons.directContact.title')}
                  </span>
                  <p className={`${fontSize.sm} ${textColor.medium}`}>
                    {t('promotionPopup.reasons.directContact.description')}
                  </p>
                </div>
              </li>
            </ul>
            
            {/* Testimonial quote for added credibility */}
            <div className="mt-6 p-3 bg-white rounded-lg border border-gray-100">
              <p className={`${fontSize.sm} ${textColor.medium} italic`}>
                {t('promotionPopup.testimonial.hair.text')}
              </p>
              <p className={`${fontSize.xs} ${textColor.light} mt-2 text-right`}>
                — {t('promotionPopup.testimonial.hair.author')}
              </p>
            </div>
            
            {/* Additional close button for mobile - at the bottom of the content */}
            <button 
              onClick={closePopup}
              className="md:hidden mt-4 w-full py-2 text-gray-500 text-sm font-medium border border-gray-200 rounded-lg flex items-center justify-center"
            >
              <X size={16} className="mr-2" />
              {t('promotionPopup.closeButton')}
            </button>
          </div>
        </div>
        
        {/* Swipe hint for mobile - indicates user can swipe down to close */}
        <div className="md:hidden w-full flex flex-col items-center pb-16">
          <div className="w-10 h-1 bg-gray-300 rounded-full mb-1"></div>
          <span className="text-xs text-gray-400">
            {isExpanded ? t('promotionPopup.mobileHint.swipeDown') : t('promotionPopup.mobileHint.tapToExpand')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummerPromotionPopup;
