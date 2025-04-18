import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Mail, ArrowRight, CheckCircle, AlertCircle, Tag, BookOpen, Sparkles, Zap } from 'lucide-react';
import { useNewsletter } from '../../contexts/NewsletterContext';
import { textStyle, fontSize, fontWeight, textColor } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

const NewsletterPopup: React.FC = () => {
  const { t } = useTranslation('newsletter');
  const { 
    showPopup, 
    isSubmitting, 
    isSuccess, 
    isError, 
    errorMessage, 
    closePopup, 
    submitEmail 
  } = useNewsletter();
  
  const [email, setEmail] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  
  if (!showPopup) {
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (acceptPrivacy) {
      submitEmail(email);
    } else {
      // Focus on checkbox if not checked
      document.getElementById('privacy-checkbox')?.focus();
    }
  };
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closePopup();
      setIsClosing(false);
    }, 300);
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div 
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      ></div>
      
      {/* Popup card - more compact for mobile */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-3xl w-[95%] md:w-full mx-auto transition-all duration-300 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Decorative top gradient bar */}
        <div className="h-2 bg-gradient-to-r from-[#7BA7C2] to-[#9BBFD9]"></div>
        
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={t('popup.form.close')}
        >
          <X size={20} className="md:w-6 md:h-6" />
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* Left content - Form */}
          <div className="p-4 pt-6 md:p-6 md:pt-8 md:w-1/2">
            {/* Header */}
            <div className="mb-6">
              <h2 className={`${textStyle.primaryHeading} mb-2`}>
                {t('popup.title')}
              </h2>
              <p className={`${textStyle.bodyText} text-[#7BA7C2] font-medium`}>
                {t('popup.subtitle')}
              </p>
            </div>
            
            {/* Success message */}
            {isSuccess ? (
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6 flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className={`${fontSize.base} ${fontWeight.medium} text-green-700 mb-1`}>
                    {t('popup.success.title')}
                  </h3>
                  <p className={`${fontSize.sm} text-green-600`}>
                    {t('popup.success.message')}
                  </p>
                </div>
              </div>
            ) : isError ? (
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle className="text-red-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className={`${fontSize.base} ${fontWeight.medium} text-red-700 mb-1`}>
                    {t('popup.error.title')}
                  </h3>
                  <p className={`${fontSize.sm} text-red-600`}>
                    {t(`popup.error.${errorMessage}`)}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                  <label htmlFor="email" className={`block ${fontSize.sm} ${fontWeight.medium} ${textColor.medium} mb-1`}>
                    {t('popup.form.email')}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      ref={emailInputRef}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-[#7BA7C2] focus:border-[#7BA7C2] text-gray-900"
                      placeholder={t('popup.form.placeholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="privacy-checkbox"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#7BA7C2] focus:ring-[#7BA7C2]"
                        checked={acceptPrivacy}
                        onChange={(e) => setAcceptPrivacy(e.target.checked)}
                        required
                        aria-label={t('popup.form.privacy').replace(/<\/?a>/g, '')}
                        title={t('popup.form.privacy').replace(/<\/?a>/g, '')}
                      />
                    </div>
                    <label htmlFor="privacy-checkbox" className="ml-2 block text-sm text-gray-600">
                      <span dangerouslySetInnerHTML={{ 
                        __html: t('popup.form.privacy').replace(
                          '<a>', 
                          `<a href="/datenschutz" class="text-[#7BA7C2] hover:underline">`
                        ).replace('</a>', '</a>') 
                      }} />
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${buttonStyle.primary} w-full relative overflow-hidden ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center justify-center ${textStyle.button}`}>
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('popup.form.subscribe')}
                      </>
                    ) : (
                      <>
                        {t('popup.form.subscribe')}
                        <ArrowRight className={`${buttonArrowClass} ml-2`} />
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>
          
          {/* Right content - Benefits - more compact for mobile */}
          <div className="bg-[#F8FAFC] p-4 md:p-6 md:w-1/2 border-t md:border-t-0 md:border-l border-gray-100">
            <h3 className={`${fontSize.base} md:${fontSize.lg} ${fontWeight.medium} ${textColor.dark} mb-3 md:mb-4`}>
              {t('popup.description')}
            </h3>
            
            {/* Mobile: 2x2 grid for benefits, Desktop: vertical list */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {/* First row - 2 most important benefits */}
              <div className="flex flex-col items-center text-center p-2 bg-white/50 rounded-lg">
                <div className="mb-2 bg-[#7BA7C2]/10 p-1.5 rounded-full">
                  <Tag className="h-4 w-4 text-[#7BA7C2]" />
                </div>
                <span className={`${fontSize.sm} ${textColor.medium}`}>
                  {t('popup.benefits.promotions')}
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-2 bg-white/50 rounded-lg">
                <div className="mb-2 bg-[#7BA7C2]/10 p-1.5 rounded-full">
                  <Sparkles className="h-4 w-4 text-[#7BA7C2]" />
                </div>
                <span className={`${fontSize.sm} ${textColor.medium}`}>
                  {t('popup.benefits.transplantation')}
                </span>
              </div>
            </div>
            
            {/* Desktop: vertical list */}
            <ul className="hidden md:block space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-0.5 bg-[#7BA7C2]/10 p-1.5 rounded-full">
                  <Tag className="h-4 w-4 text-[#7BA7C2]" />
                </div>
                <span className={`${fontSize.base} ${textColor.medium}`}>
                  {t('popup.benefits.promotions')}
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-0.5 bg-[#7BA7C2]/10 p-1.5 rounded-full">
                  <BookOpen className="h-4 w-4 text-[#7BA7C2]" />
                </div>
                <span className={`${fontSize.base} ${textColor.medium}`}>
                  {t('popup.benefits.hairCare')}
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-0.5 bg-[#7BA7C2]/10 p-1.5 rounded-full">
                  <Sparkles className="h-4 w-4 text-[#7BA7C2]" />
                </div>
                <span className={`${fontSize.base} ${textColor.medium}`}>
                  {t('popup.benefits.transplantation')}
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-0.5 bg-[#7BA7C2]/10 p-1.5 rounded-full">
                  <Zap className="h-4 w-4 text-[#7BA7C2]" />
                </div>
                <span className={`${fontSize.base} ${textColor.medium}`}>
                  {t('popup.benefits.treatments')}
                </span>
              </li>
            </ul>
            
            {/* Decorative image - hidden on mobile */}
            <div className="hidden md:flex mt-6 justify-center">
              <img 
                src="/images/Dion_Model_ThumbsUp.webp" 
                alt="Dion Hair Clinic" 
                className="h-32 object-contain opacity-90"
                width="128"
                height="128"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
