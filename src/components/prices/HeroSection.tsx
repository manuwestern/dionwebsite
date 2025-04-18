import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonHeroSection, { PriceTag } from '../common/HeroSection';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['prices', 'common']);

  // Define price tags using translation keys
  const priceTags: PriceTag[] = [
    {
      title: t('heroSection.priceTags.saphirFUEHair.title'),
      price: t('heroSection.priceTags.saphirFUEHair.price'),
      description: t('heroSection.priceTags.saphirFUEHair.description')
    },
    {
      title: t('heroSection.priceTags.dhiFUEHair.title'),
      price: t('heroSection.priceTags.dhiFUEHair.price'),
      description: t('heroSection.priceTags.dhiFUEHair.description')
    },
    {
      title: t('heroSection.priceTags.saphirFUEBeard.title'),
      price: t('heroSection.priceTags.saphirFUEBeard.price'),
      description: t('heroSection.priceTags.saphirFUEBeard.description')
    },
    {
      title: t('heroSection.priceTags.saphirFUEEyebrow.title'),
      price: t('heroSection.priceTags.saphirFUEEyebrow.price'),
      description: t('heroSection.priceTags.saphirFUEEyebrow.description')
    }
  ];

  return (
    <CommonHeroSection
      title={t('heroSection.title')}
      subtitle={t('heroSection.subtitle')}
      welcomeText={t('heroSection.welcomeText')}
      translationNamespace="prices"
      priceTags={priceTags}
      stats={[
        { value: '98%', label: 'stats.satisfiedPatients' },
        { value: '5.000+', label: 'stats.successfulTreatments' },
        { value: '15+', label: 'stats.yearsExperience' }
      ]}
      ctaLink="/kontakt"
      ctaText="buttons.consultation"
      enableHyphenation={true}
      minHeightMobile="90vh"
      minHeightDesktop="750px"
    />
  );
};

export default HeroSection;
