import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, CheckSquare, FileText, Camera, Bell, Smartphone } from 'lucide-react';
import AppFeatureSection, { AppFeature } from '../common/AppFeatureSection';

const CareSection: React.FC = () => {
  const { t } = useTranslation(['hairTransplantation', 'common']);

  // Feature icons
  const featureIcons = [
    <Calendar className="w-6 h-6 text-[#7BA7C2]" />,
    <CheckSquare className="w-6 h-6 text-[#7BA7C2]" />,
    <FileText className="w-6 h-6 text-[#7BA7C2]" />,
    <Camera className="w-6 h-6 text-[#7BA7C2]" />,
    <Bell className="w-6 h-6 text-[#7BA7C2]" />,
    <Smartphone className="w-6 h-6 text-[#7BA7C2]" />
  ];

  // Get features from translation
  const features: AppFeature[] = (t('careSection.features', { returnObjects: true }) as any[]).map(
    (feature: any, index: number) => ({
      icon: featureIcons[index],
      title: feature.title,
      description: feature.description
    })
  );

  return (
    <AppFeatureSection
      title={t('careSection.title')}
      subtitle={t('careSection.subtitle')}
      features={features}
      appImageSrc="/images/dionapp.webp"
      appImageAlt="Dion Hair Clinic App - Haartransplantation Fortschritt verfolgen"
      badgeText="ab August 2025"
      appStoreInfo={t('careSection.appStoreInfo')}
      backgroundColor="bg-white"
      accentColor="text-[#7BA7C2]"
      translationNamespace="hairTransplantation"
      showAppStoreButtons={false}
    />
  );
};

export default CareSection;
