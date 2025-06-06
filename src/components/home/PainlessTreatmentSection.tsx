import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, HeartPulse, Sparkles } from 'lucide-react';
import DPISection, { FeatureItem } from '../common/DPISection';

const PainlessTreatmentSection: React.FC = () => {
  // Get features from translation
  const featureIcons = [
    <ShieldCheck strokeWidth={1.5} />,
    <Zap strokeWidth={1.5} />,
    <HeartPulse strokeWidth={1.5} />,
    <Sparkles strokeWidth={1.5} />
  ];

  // Get features from translation
  const { t } = useTranslation('home');
  const featureItems: FeatureItem[] = (t('painlessTreatmentSection.features', { returnObjects: true }) as any[]).map(
    (feature: any, index: number) => ({
      icon: featureIcons[index],
      title: feature.title,
      description: feature.description
    })
  );

  return (
    <DPISection
      title={t('painlessTreatmentSection.title')}
      subtitle={t('painlessTreatmentSection.subtitle')}
      features={featureItems}
      imageSrc="/images/DionPainlessInjection.webp"
      imageAlt="Dion Painless Injection Technology"
      premiumLabel={t('painlessTreatmentSection.premiumOption')}
      additionalFeeLabel={t('painlessTreatmentSection.additionalFee')}
      backgroundColor="from-[#7BA7C2]/5 via-[#7BA7C2]/10 to-[#7BA7C2]/5"
      accentColor="bg-[#7BA7C2]/70"
      translationNamespace="home"
    />
  );
};

export default PainlessTreatmentSection;
