import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import StructuredData from '../seo/StructuredData';

/**
 * Breadcrumbs component for improved navigation and SEO
 * 
 * This component creates a breadcrumb trail based on the current URL path
 * and provides structured data for search engines using the StructuredData component.
 */
const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation(['layout', 'common']);
  
  // Skip breadcrumbs on homepage
  if (location.pathname === '/' || location.pathname === '/en/') {
    return null;
  }
  
  // Get current language
  const currentLang = i18n.language;
  
  // Split path into segments and remove empty segments
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Remove language prefix if present
  if (pathSegments[0] === 'en') {
    pathSegments.shift();
  }
  
  // Map path segments to breadcrumb items with translated names
  const breadcrumbItems = [
    { name: t('navigation.home'), path: currentLang === 'en' ? '/en/' : '/' }
  ];
  
  // Build path progressively
  let currentPath = currentLang === 'en' ? '/en' : '';
  
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`;
    
    // Map segment to translated name
    let name = '';
    switch (segment) {
      case 'haartransplantation':
      case 'hair-transplantation':
        name = t('footer.services.hairTransplant');
        break;
      case 'barthaartransplantation':
      case 'beard-transplantation':
        name = t('footer.services.beardTransplant');
        break;
      case 'augenbrauentransplantation':
      case 'eyebrow-transplantation':
        name = t('footer.services.eyebrowTransplant');
        break;
      case 'haarausfalltherapie':
      case 'hair-loss-therapy':
        name = t('footer.services.hairLossTherapy');
        break;
      case 'preise':
      case 'prices':
        name = t('navigation.prices');
        break;
      case 'klinik':
      case 'clinic':
        name = t('navigation.clinic');
        break;
      case 'kontakt':
      case 'contact':
        name = t('navigation.contact');
        break;
      case 'wissenswertes':
      case 'knowledge':
        name = t('navigation.information');
        break;
      case 'impressum':
      case 'imprint':
        name = t('footer.legal.imprint');
        break;
      case 'datenschutz':
      case 'privacy':
        name = t('footer.legal.privacy');
        break;
      case 'agb':
      case 'terms':
        name = t('footer.legal.terms');
        break;
      default:
        // Capitalize first letter and replace hyphens with spaces
        name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    }
    
    breadcrumbItems.push({ name, path: currentPath });
  });
  
  // Breadcrumb items are now ready to be used in the StructuredData component
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-3">
      {/* Structured data for SEO using StructuredData component */}
      <StructuredData 
        type="BreadcrumbList"
        data={{
          items: breadcrumbItems.map(item => ({
            name: item.name,
            url: `https://dionhairclinic.de${item.path}`
          }))
        }}
      />
      
      {/* Visual breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <ol className="flex flex-wrap items-center">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight size={14} className="mx-2 text-gray-400" />
              )}
              
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-700 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link 
                  to={item.path} 
                  className="hover:text-[#7BA7C2] transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
