import React from 'react';
import { Helmet } from 'react-helmet';

interface LocalBusinessProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
    addressRegion?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  image?: string | string[];
  logo?: string;
  priceRange?: string;
  sameAs?: string[];
  paymentAccepted?: string[];
  areaServed?: string[];
}

interface MedicalServiceProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  procedureType?: string;
  bodyLocation?: string;
  preparation?: string[];
  followup?: string[];
  howPerformed?: string;
  provider: {
    name: string;
    url: string;
  };
  medicalSpecialty?: string;
}

interface ReviewProps {
  name: string;
  reviewBody: string;
  reviewRating: {
    ratingValue: number;
    bestRating: number;
    worstRating?: number;
  };
  author: {
    name: string;
    type?: 'Person' | 'Organization';
  };
  datePublished?: string;
  publisher?: {
    name: string;
    type?: 'Person' | 'Organization';
  };
}

interface AggregateRatingProps {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

interface FAQPageProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

interface BreadcrumbProps {
  items: {
    name: string;
    url: string;
  }[];
}

interface WebPageProps {
  type: 'WebPage' | 'AboutPage' | 'ContactPage' | 'MedicalWebPage';
  name: string;
  description: string;
  url: string;
  lastReviewed?: string;
  mainContentOfPage?: string;
  specialty?: string;
  datePublished?: string;
  dateModified?: string;
}

interface PersonProps {
  name: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    url?: string;
  };
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
}

interface ArticleProps {
  headline: string;
  description: string;
  url: string;
  image?: string | string[];
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    type?: 'Person' | 'Organization';
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
    url?: string;
  };
  articleBody?: string;
  articleSection?: string;
  wordCount?: number;
  keywords?: string[];
  inLanguage?: string;
}

interface HowToProps {
  name: string;
  description: string;
  image?: string | string[];
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: string;
  };
  supply?: string[];
  tool?: string[];
  step: {
    name: string;
    text: string;
    image?: string;
    url?: string;
  }[];
}

interface VideoObjectProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
  transcript?: string;
}

interface StructuredDataProps {
  type: 'LocalBusiness' | 'MedicalService' | 'Review' | 'AggregateRating' | 'FAQPage' | 'BreadcrumbList' | 'WebPage' | 'Person' | 'Article' | 'HowTo' | 'VideoObject';
  data: LocalBusinessProps | MedicalServiceProps | ReviewProps | AggregateRatingProps | FAQPageProps | BreadcrumbProps | WebPageProps | PersonProps | ArticleProps | HowToProps | VideoObjectProps;
}

/**
 * Enhanced StructuredData component for adding Schema.org structured data to pages
 * 
 * This component generates JSON-LD structured data for various entity types:
 * - LocalBusiness: For the clinic information
 * - MedicalService: For specific treatments offered
 * - Review: For testimonials and reviews
 * - AggregateRating: For overall ratings
 * - FAQPage: For FAQ sections to enhance search visibility
 * - BreadcrumbList: For navigation breadcrumbs
 * - WebPage: For specific page types
 * - Person: For doctor/staff profiles
 */
const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  let structuredData = {};

  switch (type) {
    case 'LocalBusiness':
      const businessData = data as LocalBusinessProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness'],
        '@id': businessData.url || 'https://www.dionhairclinic.com/#organization',
        name: businessData.name || 'Dion Hair Clinic',
        description: businessData.description || 'Spezialisierte Haarklinik für Haartransplantationen und Haarausfallbehandlungen mit modernsten Techniken wie Saphir-FUE und DHI.',
        url: businessData.url || 'https://www.dionhairclinic.com',
        telephone: businessData.telephone || '+49 2161 2963017',
        email: businessData.email || 'info@dionhairclinic.com',
        logo: businessData.logo || 'https://www.dionhairclinic.com/images/DionHairClinic_Logo.svg',
        image: Array.isArray(businessData.image) 
          ? businessData.image 
          : businessData.image || 'https://www.dionhairclinic.com/images/DionHairClinic_Logo.svg',
        priceRange: businessData.priceRange || '€€',
        currenciesAccepted: 'EUR',
        paymentAccepted: businessData.paymentAccepted || ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer'],
        areaServed: businessData.areaServed || ['Germany', 'Europe'],
        sameAs: businessData.sameAs || [
          'https://www.facebook.com/dionhairclinic',
          'https://www.instagram.com/dionhairclinic',
          'https://www.youtube.com/dionhairclinic'
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: businessData.address?.streetAddress || 'Schürenweg 61',
          addressLocality: businessData.address?.addressLocality || 'Mönchengladbach',
          postalCode: businessData.address?.postalCode || '41063',
          addressCountry: businessData.address?.addressCountry || 'DE',
          addressRegion: businessData.address?.addressRegion || 'Nordrhein-Westfalen'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: businessData.geo?.latitude || 51.1956,
          longitude: businessData.geo?.longitude || 6.4378
        },
        openingHoursSpecification: businessData.openingHours?.map(hours => {
          const parts = hours.split(' ');
          const timeRange = parts[1].split('-');
          return {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: parts[0],
            opens: timeRange[0],
            closes: timeRange[1]
          };
        }) || [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:30',
            closes: '19:30'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Saturday',
            opens: '09:30',
            closes: '16:00'
          }
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Hair Treatments',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: 'Hair Transplantation',
                url: 'https://www.dionhairclinic.com/haartransplantation'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: 'Beard Transplantation',
                url: 'https://www.dionhairclinic.com/barthaartransplantation'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: 'Eyebrow Transplantation',
                url: 'https://www.dionhairclinic.com/augenbrauentransplantation'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MedicalTherapy',
                name: 'Hair Loss Therapy',
                url: 'https://www.dionhairclinic.com/haarausfalltherapie'
              }
            }
          ]
        }
      };
      break;

    case 'MedicalService':
      const serviceData = data as MedicalServiceProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': serviceData.procedureType === 'Therapy' ? 'MedicalTherapy' : 'MedicalProcedure',
        name: serviceData.name,
        description: serviceData.description,
        url: serviceData.url,
        image: serviceData.image,
        procedureType: serviceData.procedureType,
        bodyLocation: serviceData.bodyLocation || 'Scalp',
        preparation: serviceData.preparation,
        followup: serviceData.followup,
        howPerformed: serviceData.howPerformed,
        provider: {
          '@type': 'MedicalBusiness',
          name: serviceData.provider.name,
          url: serviceData.provider.url
        },
        medicalSpecialty: serviceData.medicalSpecialty || 'Dermatology',
        relevantSpecialty: {
          '@type': 'MedicalSpecialty',
          name: serviceData.medicalSpecialty || 'Dermatology'
        }
      };
      break;

    case 'Review':
      const reviewData = data as ReviewProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Review',
        name: reviewData.name,
        reviewBody: reviewData.reviewBody,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: reviewData.reviewRating.ratingValue,
          bestRating: reviewData.reviewRating.bestRating || 5,
          worstRating: reviewData.reviewRating.worstRating || 1
        },
        author: {
          '@type': reviewData.author.type || 'Person',
          name: reviewData.author.name
        },
        datePublished: reviewData.datePublished || new Date().toISOString().split('T')[0],
        publisher: reviewData.publisher ? {
          '@type': reviewData.publisher.type || 'Organization',
          name: reviewData.publisher.name
        } : {
          '@type': 'Organization',
          name: 'Dion Hair Clinic',
          url: 'https://www.dionhairclinic.com'
        },
        itemReviewed: {
          '@type': 'MedicalBusiness',
          name: 'Dion Hair Clinic',
          url: 'https://www.dionhairclinic.com'
        }
      };
      break;

    case 'AggregateRating':
      const ratingData = data as AggregateRatingProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        '@id': 'https://www.dionhairclinic.com/#organization',
        name: 'Dion Hair Clinic',
        url: 'https://www.dionhairclinic.com',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: ratingData.ratingValue,
          reviewCount: ratingData.reviewCount,
          bestRating: ratingData.bestRating || 5,
          worstRating: ratingData.worstRating || 1
        }
      };
      break;

    case 'FAQPage':
      const faqData = data as FAQPageProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqData.questions.map(q => ({
          '@type': 'Question',
          'name': q.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': q.answer
          }
        }))
      };
      break;

    case 'BreadcrumbList':
      const breadcrumbData = data as BreadcrumbProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbData.items.map((item, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': item.name,
          'item': item.url
        }))
      };
      break;

    case 'WebPage':
      const pageData = data as WebPageProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': pageData.type,
        '@id': `${pageData.url}#webpage`,
        name: pageData.name,
        description: pageData.description,
        url: pageData.url,
        isPartOf: {
          '@id': 'https://www.dionhairclinic.com/#website'
        },
        about: {
          '@id': 'https://www.dionhairclinic.com/#organization'
        },
        datePublished: pageData.datePublished || new Date().toISOString().split('T')[0],
        dateModified: pageData.dateModified || new Date().toISOString().split('T')[0],
        ...(pageData.type === 'MedicalWebPage' && {
          lastReviewed: pageData.lastReviewed || new Date().toISOString().split('T')[0],
          mainContentOfPage: pageData.mainContentOfPage,
          specialty: pageData.specialty || 'Dermatology'
        })
      };
      break;

    case 'Person':
      const personData = data as PersonProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: personData.name,
        jobTitle: personData.jobTitle,
        description: personData.description,
        image: personData.image,
        url: personData.url,
        sameAs: personData.sameAs,
        ...(personData.worksFor && {
          worksFor: {
            '@type': 'MedicalBusiness',
            name: personData.worksFor.name,
            url: personData.worksFor.url || 'https://www.dionhairclinic.com'
          }
        }),
        ...(personData.address && {
          address: {
            '@type': 'PostalAddress',
            streetAddress: personData.address.streetAddress,
            addressLocality: personData.address.addressLocality,
            postalCode: personData.address.postalCode,
            addressCountry: personData.address.addressCountry
          }
        })
      };
      break;

    case 'Article':
      const articleData = data as ArticleProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: articleData.headline,
        description: articleData.description,
        url: articleData.url,
        image: Array.isArray(articleData.image) ? articleData.image : articleData.image ? [articleData.image] : [],
        datePublished: articleData.datePublished,
        dateModified: articleData.dateModified || articleData.datePublished,
        author: {
          '@type': articleData.author.type || 'Organization',
          name: articleData.author.name,
          ...(articleData.author.url && { url: articleData.author.url })
        },
        publisher: {
          '@type': 'Organization',
          name: articleData.publisher.name,
          logo: {
            '@type': 'ImageObject',
            url: articleData.publisher.logo
          },
          ...(articleData.publisher.url && { url: articleData.publisher.url })
        },
        ...(articleData.articleBody && { articleBody: articleData.articleBody }),
        ...(articleData.articleSection && { articleSection: articleData.articleSection }),
        ...(articleData.wordCount && { wordCount: articleData.wordCount }),
        ...(articleData.keywords && { keywords: articleData.keywords.join(', ') }),
        inLanguage: articleData.inLanguage || 'de-DE',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleData.url
        }
      };
      break;

    case 'HowTo':
      const howToData = data as HowToProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: howToData.name,
        description: howToData.description,
        image: Array.isArray(howToData.image) ? howToData.image : howToData.image ? [howToData.image] : [],
        ...(howToData.totalTime && { totalTime: howToData.totalTime }),
        ...(howToData.estimatedCost && {
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: howToData.estimatedCost.currency,
            value: howToData.estimatedCost.value
          }
        }),
        ...(howToData.supply && {
          supply: howToData.supply.map(item => ({
            '@type': 'HowToSupply',
            name: item
          }))
        }),
        ...(howToData.tool && {
          tool: howToData.tool.map(item => ({
            '@type': 'HowToTool',
            name: item
          }))
        }),
        step: howToData.step.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
          ...(step.image && { image: step.image }),
          ...(step.url && { url: step.url })
        }))
      };
      break;

    case 'VideoObject':
      const videoData = data as VideoObjectProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: videoData.name,
        description: videoData.description,
        thumbnailUrl: videoData.thumbnailUrl,
        uploadDate: videoData.uploadDate,
        ...(videoData.duration && { duration: videoData.duration }),
        ...(videoData.contentUrl && { contentUrl: videoData.contentUrl }),
        ...(videoData.embedUrl && { embedUrl: videoData.embedUrl }),
        ...(videoData.transcript && { transcript: videoData.transcript })
      };
      break;

    default:
      break;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
