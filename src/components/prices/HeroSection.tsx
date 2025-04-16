import React from 'react';
import { useTranslation } from 'react-i18next';
import CommonHeroSection, { PriceTag } from '../common/HeroSection';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['prices', 'common']);

  // Define price tags
  const priceTags: PriceTag[] = [
    {
      title: 'Saphir FUE Hair',
      price: 'ab 2599€',
      description: 'Basic Paket bis 2000 Grafts'
    },
    {
      title: 'DHI FUE Hair',
      price: 'ab 3599€',
      description: 'Basic Paket bis 2000 Grafts'
    },
    {
      title: 'Saphir FUE Beard',
      price: 'ab 2599€',
      description: 'Basic Paket bis 2000 Grafts'
    },
    {
      title: 'Saphir FUE Eyebrow',
      price: 'ab 1699€',
      description: 'bis 1000 Grafts'
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
