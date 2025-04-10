import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogType?: string;
  ogImage?: string;
  namespace?: string;
}

/**
 * SEO component for managing document head metadata
 * 
 * This component handles all SEO-related tags including:
 * - Title and meta description
 * - Canonical URLs
 * - Robots directives
 * - Open Graph tags
 * - Twitter Card tags
 * - Language alternates (hreflang)
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  noindex = false,
  nofollow = false,
  ogType = 'website',
  ogImage = '/images/DionHairClinic_Logo.svg',
  namespace = 'common'
}) => {
  const { t, i18n } = useTranslation([namespace, 'common']);
  const location = useLocation();
  
  // Get current language and alternate language
  const currentLang = i18n.language;
  const alternateLang = currentLang === 'de' ? 'en' : 'de';
  
  // Base URL for canonical and alternate URLs
  const baseUrl = 'https://dionhairclinic.de';
  
  // Determine canonical URL
  const canonicalUrl = canonical || `${baseUrl}${location.pathname}`;
  
  // Determine alternate URL (for hreflang)
  const alternateUrl = `${baseUrl}${location.pathname}`;
  
  // Determine title and description from props or translations
  const pageTitle = title || t('meta.title', { ns: namespace });
  const pageDescription = description || t('meta.description', { ns: namespace, defaultValue: t('meta.description', { ns: 'common' }) });
  
  // Determine robots directives
  const robotsContent = [];
  if (noindex) robotsContent.push('noindex');
  if (nofollow) robotsContent.push('nofollow');
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <html lang={currentLang} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots directives */}
      {robotsContent.length > 0 && (
        <meta name="robots" content={robotsContent.join(', ')} />
      )}
      
      {/* Alternate language versions */}
      <link 
        rel="alternate" 
        hrefLang={alternateLang} 
        href={alternateUrl} 
      />
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={baseUrl} 
      />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:locale" content={currentLang === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:site_name" content="Dion Hair Clinic" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
    </Helmet>
  );
};

export default SEO;
