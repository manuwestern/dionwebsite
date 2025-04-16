import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, HeartPulse, Sparkles } from 'lucide-react';
import CommonDPISection, { FeatureItem } from '../common/DPISection';

const DPISection: React.FC = () => {
  // Get features from translation
  const featureIcons = [
    <ShieldCheck strokeWidth={1.5} />,
    <Zap strokeWidth={1.5} />,
    <HeartPulse strokeWidth={1.5} />,
    <Sparkles strokeWidth={1.5} />
  ];

  // Get features from translation
  const { t } = useTranslation('beardTransplantation');
  const featureItems: FeatureItem[] = (t('dpiSection.features', { returnObjects: true }) as any[]).map(
    (feature: any, index: number) => ({
      icon: featureIcons[index],
      title: feature.title,
      description: feature.description
    })
  );

  return (
    <CommonDPISection
      title={t('dpiSection.title')}
      subtitle={t('dpiSection.subtitle')}
      features={featureItems}
      imageSrc="/images/DionPainlessInjection.webp"
      imageAlt="Dion Painless Injection Technology"
      premiumLabel={t('dpiSection.premiumOption')}
      additionalFeeLabel={t('dpiSection.additionalFee')}
      backgroundColor="from-[#7BA7C2]/5 via-[#7BA7C2]/10 to-[#7BA7C2]/5"
      accentColor="bg-[#7BA7C2]/70"
      translationNamespace="beardTransplantation"
    />
  );
};

export default DPISection;
