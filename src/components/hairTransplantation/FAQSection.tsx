import React, { useState } from 'react';
import { ChevronDown, Search, Clock, Stethoscope, HelpCircle, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-28 relative">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5 z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('faqSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto">
            {t('faqSection.subtitle')}
          </p>
        </div>

        {/* Search and filter */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7BA7C2] focus:border-transparent"
              placeholder="Frage suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === null
                  ? 'bg-[#7BA7C2] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alle
            </button>
            {Object.entries(categories).map(([key, { name, icon }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === key
                    ? 'bg-[#7BA7C2] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {icon}
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div key={index} className="mb-4 transform transition-all duration-300 hover:translate-x-1">
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-all duration-300 ${
                    openFAQ === index
                      ? 'bg-[#7BA7C2] text-white shadow-md'
                      : 'bg-white text-gray-800 hover:bg-gray-50 border border-gray-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${openFAQ === index ? 'text-white' : 'text-[#7BA7C2]'}`}>
                      {categories[faq.category as keyof typeof categories].icon}
                    </div>
                    <span className="text-lg font-light">{faq.question}</span>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${
                      openFAQ === index ? 'transform rotate-180' : ''
                    }`} 
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 rounded-b-lg bg-white shadow-md ${
                    openFAQ === index 
                      ? 'max-h-[500px] opacity-100 p-6 mt-1 border border-gray-100 border-t-0' 
                      : 'max-h-0 opacity-0 p-0 border-0'
                  }`}
                >
                  <p className="text-base text-gray-600 font-light leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-lg shadow-sm border border-gray-100">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Keine Fragen gefunden. Bitte versuchen Sie eine andere Suche.</p>
            </div>
          )}
        </div>
        
        {/* Still have questions prompt */}
        <div className="max-w-4xl mx-auto mt-12 bg-[#7BA7C2]/10 rounded-xl p-8 text-center">
          <h3 className="text-xl font-light mb-2">Noch Fragen?</h3>
          <p className="text-gray-600 mb-6">Wir beantworten gerne alle Ihre Fragen in einem persönlichen Beratungsgespräch.</p>
          <button className="inline-block bg-[#7BA7C2] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 text-base font-light tracking-wider transform hover:scale-105">
            Beratungstermin vereinbaren
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
