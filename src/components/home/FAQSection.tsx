import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import { useTheme } from '../../utils/ThemeProvider';

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0); // First FAQ open by default
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { activeTheme } = useTheme();

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      if (sectionRef.current) {
        const elementPosition = sectionRef.current.offsetTop + 200;
        
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

  // Create FAQs from translation keys
  const faqs: FAQ[] = Array.from(
    { length: (t('faqSection.faqs', { returnObjects: true }) as any[]).length },
    (_, index) => ({
      question: t(`faqSection.faqs.${index}.question`),
      answer: t(`faqSection.faqs.${index}.answer`)
    })
  );

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      id="faq-section" 
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background with gradient and blur effects */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient background with theme colors */}
        <div className="absolute inset-0" 
             style={{ background: `linear-gradient(to bottom, ${activeTheme.backgroundLight}, ${activeTheme.backgroundDark}, ${activeTheme.backgroundLight})` }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full -mr-[400px] -mt-[400px] blur-3xl"
             style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full -ml-[300px] -mb-[300px] blur-3xl"
             style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}10` }}></div>
            <h2 className={`${textStyle.sectionTitle}`} 
                style={{ color: activeTheme.textPrimary }}
                lang="de">{t('faqSection.title')}</h2>
            <div className="w-[90%] max-w-[300px] mt-4 mx-auto h-px" 
                 style={{ background: `linear-gradient(to right, transparent, ${activeTheme.divider}, transparent)` }}></div>
          </div>
          <p className={`${fontSize.lg} ${fontWeight.normal} ${lineHeight.normal} max-w-3xl mx-auto mt-6 md:tracking-wide`}
             style={{ color: activeTheme.textSecondary }}>
            {t('faqSection.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`mb-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-center md:text-left p-5 rounded-t-xl flex justify-between items-center transition-all duration-300 ${
                  openFAQ === index
                    ? 'text-white shadow-md'
                    : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-sm'
                }`}
                style={{ 
                  backgroundColor: openFAQ === index ? activeTheme.accent : undefined,
                  color: openFAQ === index ? 'white' : activeTheme.textPrimary
                }}
              >
                <span className={`${fontSize.lg} ${fontWeight.light}`}>{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openFAQ === index 
                    ? 'bg-white/20' 
                    : ''
                }`}
                     style={{ 
                       backgroundColor: openFAQ === index ? 'rgba(255, 255, 255, 0.2)' : `${activeTheme.accent}10`
                     }}>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openFAQ === index ? 'transform rotate-180 text-white' : ''
                    }`}
                    style={{ 
                      color: openFAQ === index ? 'white' : activeTheme.accent
                    }}
                  />
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 rounded-b-xl bg-white shadow-md ${
                  openFAQ === index 
                    ? 'max-h-[500px] opacity-100 border-x border-b border-gray-100' 
                    : 'max-h-0 opacity-0 border-none'
                }`}
              >
                <div className="p-6">
                  <p className={`${fontSize.base} ${fontWeight.normal} ${lineHeight.relaxed} text-center md:text-left`}
                     style={{ color: activeTheme.textSecondary }}>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className={`mt-16 relative transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="absolute inset-0 rounded-2xl" style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-32 -mb-32 blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${fontSize.h3} ${fontWeight.normal} mb-4 text-center md:text-left`}
                    style={{ color: activeTheme.primary }}>Haben Sie weitere Fragen?</h3>
                <p className={`${fontSize.base} ${fontWeight.normal} ${lineHeight.relaxed} text-center md:text-left px-2 md:px-0`}
                   style={{ color: activeTheme.textSecondary }}>
                  Wir beantworten gerne alle Ihre Fragen in einem persönlichen Beratungsgespräch. 
                  Unsere Experten nehmen sich Zeit für Sie und erklären Ihnen den gesamten Prozess im Detail.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.consultation', { ns: 'common' })}
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

export default FAQSection;
