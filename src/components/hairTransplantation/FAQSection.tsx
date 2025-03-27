import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Clock, Stethoscope, HelpCircle, DollarSign, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import { useTheme } from '../../utils/ThemeProvider';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

// FAQ categories with icons
const categories = {
  procedure: { name: 'Verfahren', icon: <Stethoscope className="w-5 h-5" /> },
  recovery: { name: 'Erholung', icon: <Clock className="w-5 h-5" /> },
  results: { name: 'Ergebnisse', icon: <HelpCircle className="w-5 h-5" /> },
  costs: { name: 'Kosten', icon: <DollarSign className="w-5 h-5" /> }
};

const FAQSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { activeTheme } = useTheme();

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Create FAQs from translation keys and assign categories
  const faqCategories = ['procedure', 'recovery', 'results', 'costs'];
  const faqs: FAQ[] = Array.from(
    { length: (t('faqSection.faqs', { returnObjects: true }) as any[]).length },
    (_, index) => ({
      question: t(`faqSection.faqs.${index}.question`),
      answer: t(`faqSection.faqs.${index}.answer`),
      category: faqCategories[index % faqCategories.length] // Assign categories cyclically
    })
  );

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Filter FAQs based on search term and active category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === null || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0" 
           style={{ background: `linear-gradient(to bottom, ${activeTheme.backgroundLight}, ${activeTheme.backgroundDark}, ${activeTheme.backgroundLight})` }}></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full -top-[400px] -right-[400px] blur-3xl"
           style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full -bottom-[300px] -left-[300px] blur-3xl"
           style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
      
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}10` }}></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('faqSection.title')}</h2>
            <div className="w-[90%] max-w-[350px] mt-3 mx-auto h-px" 
                 style={{ background: `linear-gradient(to right, transparent, ${activeTheme.accent}, transparent)` }}></div>
          </div>
          <p className={`${fontSize.lg} ${fontWeight.normal} max-w-3xl mx-auto mt-4`}
             style={{ color: activeTheme.textSecondary }}>
            {t('faqSection.subtitle')}
          </p>
        </div>

        {/* Search and filter with elegant design */}
        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5" style={{ color: activeTheme.accent }} />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
              style={{ "--tw-ring-color": activeTheme.accent } as React.CSSProperties}
              placeholder="Frage suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-0 -z-10 rounded-xl blur-sm"
                 style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
          </div>
          
          {/* Category filters with elegant design */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-3 rounded-xl ${fontSize.sm} ${fontWeight.light} transition-all duration-300 ${
                activeCategory === null
                  ? 'text-white shadow-md transform -translate-y-1'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:shadow-md border border-gray-100'
              }`}
              style={activeCategory === null ? { 
                background: `linear-gradient(to right, ${activeTheme.accent}, ${activeTheme.accentDark})` 
              } : undefined}
            >
              Alle Fragen
            </button>
            {Object.entries(categories).map(([key, { name, icon }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-xl ${fontSize.sm} ${fontWeight.light} transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === key
                    ? 'text-white shadow-md transform -translate-y-1'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:shadow-md border border-gray-100'
                }`}
                style={activeCategory === key ? { 
                  background: `linear-gradient(to right, ${activeTheme.accent}, ${activeTheme.accentDark})` 
                } : undefined}
              >
                <span className={activeCategory === key ? 'text-white' : ''}
                      style={activeCategory !== key ? { color: activeTheme.accent } : undefined}>
                  {icon}
                </span>
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion with elegant design */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filteredFAQs.length > 0 ? (
            <div className="space-y-5">
              {filteredFAQs.map((faq, index) => (
                <div 
                  key={index} 
                  className="relative group"
                >
                  {/* Card with glass morphism effect */}
                  <div 
                    className={`relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md transition-all duration-500 border border-gray-100/80 ${
                      openFAQ === index 
                        ? 'shadow-lg' 
                        : 'hover:shadow-lg'
                    }`}
                    style={{ 
                      borderColor: openFAQ === index 
                        ? `${activeTheme.accent}30` 
                        : undefined
                    }}>
                    {/* Question button */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left p-6 flex justify-between items-center transition-all duration-300"
                      
                      aria-controls={`faq-answer-${index}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          openFAQ === index 
                            ? 'text-white' 
                            : 'group-hover:bg-opacity-20'
                        }`}
                        style={{ 
                          backgroundColor: openFAQ === index 
                            ? activeTheme.accent 
                            : `${activeTheme.accent}10`,
                          color: openFAQ === index 
                            ? 'white' 
                            : activeTheme.accent
                        }}>
                          {categories[faq.category as keyof typeof categories].icon}
                        </div>
                        <span className={`${fontSize.lg} ${fontWeight.normal} text-left`} 
                              style={{ color: activeTheme.textPrimary }}>{faq.question}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openFAQ === index 
                          ? 'text-white rotate-180' 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                      }`}
                      style={{ 
                        backgroundColor: openFAQ === index ? activeTheme.accent : undefined
                      }}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>
                    
                    {/* Answer content */}
                    <div 
                      id={`faq-answer-${index}`}
                      className={`overflow-hidden transition-all duration-500 ${
                        openFAQ === index 
                          ? 'max-h-[500px] opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-6 pt-0 border-t border-gray-100">
                        <p className={`${fontSize.base} ${fontWeight.light} ${lineHeight.relaxed} text-center md:text-left`}
                           style={{ color: activeTheme.textSecondary }}>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className={`absolute -z-10 w-full h-full rounded-2xl top-2 left-2 transition-all duration-500 ${
                    openFAQ === index ? 'opacity-70' : 'opacity-0 group-hover:opacity-30'
                  }`} style={{ backgroundColor: `${activeTheme.accent}10` }}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-10 text-center shadow-md border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full -mr-20 -mt-20 blur-xl"
                   style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
              <div className="relative z-10">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                   style={{ backgroundColor: `${activeTheme.accent}10` }}>
                <HelpCircle className="w-8 h-8" style={{ color: activeTheme.accent }} />
                </div>
                <h3 className={`${fontSize.h4} ${fontWeight.light} mb-2`} style={{ color: activeTheme.textPrimary }}>Keine Ergebnisse gefunden</h3>
                <p className={`${fontWeight.light}`} style={{ color: activeTheme.textSecondary }}>Bitte versuchen Sie eine andere Suche oder wählen Sie eine andere Kategorie.</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Still have questions with elegant design */}
        <div className={`max-w-4xl mx-auto mt-16 relative transition-all duration-1000 delay-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-xl"
               style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-32 -mb-32 blur-xl"
               style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>Noch Fragen?</h3>
                <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                  Wir verstehen, dass eine Haartransplantation eine wichtige Entscheidung ist. Unser Expertenteam 
                  beantwortet gerne alle Ihre Fragen in einem persönlichen und unverbindlichen Beratungsgespräch.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    Beratungstermin vereinbaren
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
