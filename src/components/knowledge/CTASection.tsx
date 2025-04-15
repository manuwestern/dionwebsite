import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

const CTASection: React.FC = () => {
  const { t } = useTranslation(['knowledge', 'common']);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -left-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -right-[300px] blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Elegant CTA Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#7BA7C2]/5 rounded-2xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${fontSize.h3} ${fontWeight.normal} ${textColor.primary} mb-4 text-center md:text-left`}>
                  {t('ctaSection.title', { defaultValue: 'Haben Sie Fragen zu Haarausfall oder Haarpflege?' })}
                </h3>
                <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                  {t('ctaSection.description', { defaultValue: 'Unsere Experten stehen Ihnen für eine persönliche Beratung zur Verfügung. Wir helfen Ihnen, die richtige Lösung für Ihre individuellen Bedürfnisse zu finden und beantworten alle Ihre Fragen rund um das Thema Haargesundheit.' })}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Link to="/kontakt" className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button}`}>
                    {t('buttons.consultation', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
