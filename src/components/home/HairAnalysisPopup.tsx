import React, { useState, useEffect } from 'react';
import { X, Brain, ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

interface HairAnalysisPopupProps {
  delay?: number; // Delay in ms before showing the popup
}

const HairAnalysisPopup: React.FC<HairAnalysisPopupProps> = ({ delay = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('hairAnalysisPopupShown');
    
    if (popupShown) {
      setHasBeenShown(true);
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Mark as shown in session storage
      sessionStorage.setItem('hairAnalysisPopupShown', 'true');
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleStartAnalysis = () => {
    // Here you would redirect to the hair analysis page or open another modal
    // For now, we'll just close the popup
    handleClose();
    // You could add a redirect here, e.g.:
    // window.location.href = '/haaranalyse';
  };

  if (!isVisible || hasBeenShown) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div 
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      ></div>
      
      {/* Popup card with elegant styling */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full transition-all duration-300 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Decorative top gradient bar */}
        <div className="h-2 bg-gradient-to-r from-[#7BA7C2] to-[#9BBFD9]"></div>
        
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Schließen"
        >
          <X size={24} />
        </button>
        
        {/* Content container */}
        <div className="p-6 pt-8">
          {/* Header with icon */}
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-[#F8FAFC] flex items-center justify-center mr-4">
              <Brain className="w-6 h-6 text-[#7BA7C2]" />
            </div>
            <h2 className={`${textStyle.primaryHeading} text-gray-800`}>KI-Haaranalyse</h2>
          </div>
          
          {/* Main content */}
          <div className="mb-6">
            <p className={`${textStyle.bodyText} mb-4`}>
              Entdecken Sie unsere innovative KI-basierte Haaranalyse! Erfahren Sie die Ursache Ihres Haarausfalls und erhalten Sie personalisierte Therapieempfehlungen.
            </p>
            <p className={`${textStyle.bodyText} mb-4`}>
              Unsere fortschrittliche KI analysiert Ihre Haarsituation umfassend und erstellt einen detaillierten Report mit individuellen Lösungsansätzen.
            </p>
            
            {/* Benefits list */}
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-[#F8FAFC] flex items-center justify-center mr-2 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#7BA7C2]"></div>
                </div>
                <span className={`${fontSize.sm} ${textColor.medium}`}>Umfassende Analyse Ihrer Haarsituation</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-[#F8FAFC] flex items-center justify-center mr-2 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#7BA7C2]"></div>
                </div>
                <span className={`${fontSize.sm} ${textColor.medium}`}>Personalisierte Therapieempfehlungen</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-[#F8FAFC] flex items-center justify-center mr-2 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-[#7BA7C2]"></div>
                </div>
                <span className={`${fontSize.sm} ${textColor.medium}`}>Detaillierter Report zum Download</span>
              </li>
            </ul>
            
            {/* Disclaimer */}
            <p className={`${fontSize.xs} ${textColor.light} italic`}>
              Hinweis: Die KI-Analyse ersetzt keine ärztliche Untersuchung oder Diagnose. Für eine medizinische Beurteilung konsultieren Sie bitte einen Facharzt.
            </p>
          </div>
          
          {/* CTA button */}
          <div className="flex justify-center">
            <button 
              onClick={handleStartAnalysis}
              className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] w-full`}
            >
              <span className={buttonRippleClass}></span>
              <span className={`relative flex items-center justify-center ${textStyle.button}`}>
                Haaranalyse starten
                <ArrowRight className={`${buttonArrowClass} ml-2`} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HairAnalysisPopup;
