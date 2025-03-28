import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline, fontSize, fontWeight, textColor, lineHeight } from '../../utils/typography';
import { 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

const MythsFactsSection: React.FC = () => {
  const { t } = useTranslation('knowledge');
  const [expandedMyth, setExpandedMyth] = useState<string | null>(null);

  const myths = [
    {
      id: 'myth1',
      title: t('mythsFacts.myth1Title'),
      text: t('mythsFacts.myth1Text')
    },
    {
      id: 'myth2',
      title: t('mythsFacts.myth2Title'),
      text: t('mythsFacts.myth2Text')
    },
    {
      id: 'myth3',
      title: t('mythsFacts.myth3Title'),
      text: t('mythsFacts.myth3Text')
    },
    {
      id: 'myth4',
      title: t('mythsFacts.myth4Title'),
      text: t('mythsFacts.myth4Text')
    },
    {
      id: 'myth5',
      title: t('mythsFacts.myth5Title'),
      text: t('mythsFacts.myth5Text')
    },
    {
      id: 'myth6',
      title: t('mythsFacts.myth6Title'),
      text: t('mythsFacts.myth6Text')
    }
  ];

  const toggleMyth = (id: string) => {
    if (expandedMyth === id) {
      setExpandedMyth(null);
    } else {
      setExpandedMyth(id);
    }
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className={`${textStyle.sectionTitle}`}>{t('mythsFacts.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('mythsFacts.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {myths.map((myth, index) => (
            <div 
              key={myth.id} 
              className={`mb-6 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border-2 ${
                expandedMyth === myth.id 
                  ? 'shadow-xl border-[#7BA7C2]/80' 
                  : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
              }`}
            >
              <div 
                className={`flex justify-between items-center p-6 backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                  expandedMyth === myth.id ? 'bg-[#7BA7C2]/10' : 'bg-white'
                }`}
                onClick={() => toggleMyth(myth.id)}
              >
                <div className="flex items-center">
                  <div className={`mr-4 p-2 rounded-full transition-all duration-300 ${
                    expandedMyth === myth.id ? 'bg-red-100' : 'bg-red-50'
                  }`}>
                    <X size={20} className="text-red-500" />
                  </div>
                  <h3 className={`${fontSize.lg} ${fontWeight.medium} ${textColor.dark}`}>
                    {myth.title}
                  </h3>
                </div>
                <div className="transition-transform duration-300">
                  {expandedMyth === myth.id ? (
                    <ChevronUp size={24} className="text-[#7BA7C2]" />
                  ) : (
                    <ChevronDown size={24} className="text-[#7BA7C2]" />
                  )}
                </div>
              </div>
              
              {expandedMyth === myth.id && (
                <div className="p-6 border-t border-gray-100 bg-white">
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-green-100 rounded-full mt-1">
                      <Check size={20} className="text-green-500" />
                    </div>
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed}`}>
                      {myth.text}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Additional information */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/2">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('mythsFacts.title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('mythsFacts.subtitle')}
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('mythsFacts.myth1Title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('mythsFacts.myth1Text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MythsFactsSection;
