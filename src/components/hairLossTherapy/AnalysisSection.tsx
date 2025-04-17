import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, HeartPulse, Sparkles } from 'lucide-react';
import { textStyle, gradientUnderline } from '../../utils/typography';
import FeatureContainer from '../common/elements/FeatureContainer';

const AnalysisSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get features from translation
  const featureIcons = [
    <ShieldCheck strokeWidth={1.5} />,
    <Zap strokeWidth={1.5} />,
    <HeartPulse strokeWidth={1.5} />,
    <Sparkles strokeWidth={1.5} />
  ];

  // Get features from translation
  const { t } = useTranslation('hairLossTherapy');
  const features = (t('analysisSection.features', { returnObjects: true }) as any[]).map(
    (feature: any, index: number) => ({
      icon: featureIcons[index],
      title: feature.title,
      description: feature.description
    })
  );

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#7BA7C2]/5 via-[#7BA7C2]/10 to-[#7BA7C2]/5"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/10 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/10 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design - exactly matching other sections */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle} break-words hyphens-auto`} lang="de">{t('analysisSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4 break-words hyphens-auto`} lang="de">
            {t('analysisSection.subtitle')}
          </p>
        </div>
        
        {/* Features Container using the reusable component */}
        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <FeatureContainer
            title={t('analysisSection.benefitsTitle')}
            description={t('analysisSection.description')}
            features={features}
            accentColor="#7BA7C2"
            backgroundColor="bg-white/90"
            columns={2}
          />
        </div>
      </div>
    </section>
  );
};

export default AnalysisSection;
