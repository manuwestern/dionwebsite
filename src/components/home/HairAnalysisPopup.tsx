import React, { useState, useEffect } from 'react';
import { X, Brain, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

interface HairAnalysisPopupProps {
  delay?: number; // Delay in ms before showing the floating icon
}

const HairAnalysisPopup: React.FC<HairAnalysisPopupProps> = ({ delay = 500 }) => {
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show icon immediately or after a short delay
    const timer = setTimeout(() => {
      setIsIconVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsPopupVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleStartAnalysis = () => {
    // Here you would redirect to the hair analysis page or open another modal
    // For now, we'll just close the popup
    handleClosePopup();
    // You could add a redirect here, e.g.:
    // window.location.href = '/haaranalyse';
  };

  return (
    <>
      {/* Floating icon button */}
      {isIconVisible && !isPopupVisible && (
        <div 
          className="fixed right-6 bottom-24 z-40 transition-all duration-300"
        >
          <button
            onClick={handleOpenPopup}
            className="relative group w-16 h-16 rounded-full bg-gradient-to-r from-[#7BA7C2] to-[#9BBFD9] text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="KI-Haaranalyse starten"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1.5 bg-[#7BA7C2]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Icon */}
            <div className="relative flex items-center justify-center">
              <Brain className="w-7 h-7" />
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-lg px-3 py-2 shadow-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              KI-Haaranalyse starten
              <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-2 h-2 bg-white transform rotate-45"></div>
            </div>
          </button>
          
          {/* "NEU" badge */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            NEU
          </div>
        </div>
      )}
      
      {/* Popup modal */}
      {isPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur effect */}
          <div 
            className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleClosePopup}
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
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Schließen"
            >
              <X size={24} />
            </button>
            
            {/* Content container */}
            <div className="p-6 pt-8">
              {/* Header with icon */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#F8FAFC] flex items-center justify-center mr-4 relative">
                  <Brain className="w-6 h-6 text-[#7BA7C2]" />
                  <Sparkles className="w-3 h-3 absolute -top-0.5 -right-0.5 text-yellow-400" />
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
      )}
    </>
  );
};

export default HairAnalysisPopup;
