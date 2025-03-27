import React from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../../utils/typography';

const PatternSection: React.FC = () => {
  const { t } = useTranslation('beardTransplantation');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className={`${textStyle.sectionTitle} mb-4`}>
          {t('patternSection.title')}
        </h2>
        <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto`}>
          {t('patternSection.description')}
        </p>
        <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-6 mx-auto`}></div>
      </div>

      {/* Patterns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {(t('patternSection.patterns', { returnObjects: true }) as any[]).map((pattern: any, index: number) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <h3 className={`${textStyle.cardTitle} mb-2`}>{pattern.title}</h3>
              <p className={`${textStyle.bodyText} ${textColor.medium} mb-4`}>{pattern.description}</p>
              
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <div>
                  <span className={`${fontSize.xs} ${textColor.light} block mb-1`}>{t('patternSection.typicalGrafts')}</span>
                  <span className={`${fontSize.base} ${fontWeight.medium} ${textColor.dark}`}>{pattern.grafts}</span>
                </div>
                <div>
                  <span className={`${fontSize.xs} ${textColor.light} block mb-1`}>{t('patternSection.treatment')}</span>
                  <span className={`${fontSize.base} ${fontWeight.medium} ${textColor.dark}`}>{pattern.treatment}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className={`${fontSize.h4} ${fontWeight.medium} mb-3`}>{t('patternSection.additionalInfo.individualConsultation.title')}</h3>
          <p className={`${textStyle.bodyText} ${textColor.medium}`}>{t('patternSection.additionalInfo.individualConsultation.description')}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className={`${fontSize.h4} ${fontWeight.medium} mb-3`}>{t('patternSection.additionalInfo.modernTechniques.title')}</h3>
          <p className={`${textStyle.bodyText} ${textColor.medium}`}>{t('patternSection.additionalInfo.modernTechniques.description')}</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className={`${fontSize.h4} ${fontWeight.medium} mb-3`}>{t('patternSection.additionalInfo.longTermResults.title')}</h3>
          <p className={`${textStyle.bodyText} ${textColor.medium}`}>{t('patternSection.additionalInfo.longTermResults.description')}</p>
        </div>
      </div>

      {/* Visual Representation */}
      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-center">
          <img 
            src="/images/Behandlung_Barthaartransplantation.webp" 
            alt="Beard Transplantation Treatment" 
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
          <p className={`${fontSize.sm} ${textColor.medium} mt-3 text-center`}>{t('patternSection.idealForYourBeardType')}</p>
        </div>
      </div>
    </div>
  );
};

export default PatternSection;
