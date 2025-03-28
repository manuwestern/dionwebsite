import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/knowledge/HeroSection';
import HairLossCausesSection from '../components/knowledge/HairLossCausesSection';
import HairCareSection from '../components/knowledge/HairCareSection';
import TransplantCareSection from '../components/knowledge/TransplantCareSection';
import HairFactsSection from '../components/knowledge/HairFactsSection';
import NutritionSection from '../components/knowledge/NutritionSection';

const KnowledgePage: React.FC = () => {
  const { t } = useTranslation('knowledge');

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>

      <HeroSection />
      <HairLossCausesSection />
      <HairCareSection />
      <TransplantCareSection />
      <HairFactsSection />
      <NutritionSection />
    </>
  );
};

export default KnowledgePage;
