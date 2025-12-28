import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X } from 'lucide-react';

const LPWhatsAppButton: React.FC = () => {
  const { t } = useTranslation('landing');
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const message = encodeURIComponent(t('whatsapp.messages.general'));
    window.open(`https://wa.me/491702637818?text=${message}`, '_blank');
    
    // Track event
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'lp_whatsapp_click',
        eventCategory: 'CTA',
        eventAction: 'WhatsApp Click',
        eventLabel: 'sticky',
        value: 1
      });
    }

    setShowBadge(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block">
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label={t('whatsapp.ariaLabel')}
        >
          <div className={`
            flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-2xl
            transition-all duration-300 hover:bg-[#1EBE57] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]
            ${isExpanded ? 'px-6 py-4' : 'p-4'}
          `}>
            <div className="relative">
              <MessageCircle className="w-7 h-7" />
              {showBadge && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            
            <span className={`
              font-semibold text-base whitespace-nowrap overflow-hidden transition-all duration-300
              ${isExpanded ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'}
            `}>
              {t('whatsapp.buttonText')}
            </span>
          </div>

          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
        </button>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden">
        <button
          onClick={handleClick}
          className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#1EBE57] transition-all duration-300 active:scale-95"
          aria-label={t('whatsapp.ariaLabel')}
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            {showBadge && (
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </div>

          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
        </button>
      </div>
    </>
  );
};

export default LPWhatsAppButton;