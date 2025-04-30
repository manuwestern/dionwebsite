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
  ogImageAlt?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  namespace?: string;
}

/**
 * Enhanced SEO component for managing document head metadata
 * 
 * This component handles all SEO-related tags including:
 * - Title and meta description
 * - Canonical URLs
 * - Robots directives
 * - Open Graph tags
 * - Twitter Card tags
 * - Language alternates (hreflang)
 * - Additional meta tags for improved SEO
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  noindex = false,
  nofollow = false,
  ogType = 'website',
  ogImage = '/images/DionHairClinic_Logo.svg',
  ogImageAlt = 'Dion Hair Clinic',
  keywords,
  author = 'Dion Hair Clinic',
  publishedTime,
  modifiedTime,
  namespace = 'common'
}) => {
  const { t, i18n } = useTranslation([namespace, 'common']);
  const location = useLocation();
  
  // Get current language and alternate language
  const currentLang = i18n.language;
  const alternateLang = currentLang === 'de' ? 'en' : 'de';
  
  // Base URL for canonical and alternate URLs
  const baseUrl = 'https://dionhairclinic.com';
  
  // Determine canonical URL
  const canonicalUrl = canonical || `${baseUrl}${location.pathname}`;
  
  // Use the same URL for both languages since we're using i18next for translations
  // without changing the URL
  const alternateUrl = canonicalUrl;
  
  // Determine title and description from props or translations
  const pageTitle = title || t('meta.title', { ns: namespace });
  const pageDescription = description || t('meta.description', { ns: namespace, defaultValue: t('meta.description', { ns: 'common' }) });
  const pageKeywords = keywords || t('meta.keywords', { ns: namespace, defaultValue: '' });
  
  // Determine robots directives
  const robotsContent = [];
  if (noindex) robotsContent.push('noindex');
  if (nofollow) robotsContent.push('nofollow');
  if (robotsContent.length === 0) robotsContent.push('index, follow');
  
  // Current date for modified time if not provided
  const currentDate = new Date().toISOString();
  const modifiedTimeValue = modifiedTime || currentDate;
  const publishedTimeValue = publishedTime || currentDate;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <html lang={currentLang} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      {/* Additional meta tags for improved SEO */}
      {pageKeywords && <meta name="keywords" content={pageKeywords} />}
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots directives */}
      <meta name="robots" content={robotsContent.join(', ')} />
      
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
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:locale" content={currentLang === 'de' ? 'de_DE' : 'en_US'} />
      <meta property="og:site_name" content="Dion Hair Clinic" />
      {publishedTime && <meta property="article:published_time" content={publishedTimeValue} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTimeValue} />}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      
      {/* Performance optimization hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    </Helmet>
  );
};

export default SEO;
