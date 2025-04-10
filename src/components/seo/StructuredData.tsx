import React from 'react';
import { Helmet } from 'react-helmet';

interface LocalBusinessProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  image?: string;
  priceRange?: string;
}

interface MedicalServiceProps {
  name: string;
  description: string;
  url: string;
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
  };
  author: {
    name: string;
  };
  datePublished?: string;
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

interface StructuredDataProps {
  type: 'LocalBusiness' | 'MedicalService' | 'Review' | 'FAQPage' | 'BreadcrumbList';
  data: LocalBusinessProps | MedicalServiceProps | ReviewProps | FAQPageProps | BreadcrumbProps;
}

/**
 * StructuredData component for adding Schema.org structured data to pages
 * 
 * This component generates JSON-LD structured data for various entity types:
 * - LocalBusiness: For the clinic information
 * - MedicalService: For specific treatments offered
 * - Review: For testimonials and reviews
 * - FAQPage: For FAQ sections to enhance search visibility
 * - BreadcrumbList: For navigation breadcrumbs
 */
const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  let structuredData = {};

  switch (type) {
    case 'LocalBusiness':
      const businessData = data as LocalBusinessProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        '@id': businessData.url || 'https://dionhairclinic.de/#organization',
        name: businessData.name || 'Dion Hair Clinic',
        description: businessData.description || 'Spezialisierte Haarklinik für Haartransplantationen und Haarausfallbehandlungen',
        url: businessData.url || 'https://dionhairclinic.de',
        telephone: businessData.telephone || '+49 170 2637818',
        image: businessData.image || 'https://dionhairclinic.de/images/DionHairClinic_Logo.svg',
        priceRange: businessData.priceRange || '€€',
        address: {
          '@type': 'PostalAddress',
        streetAddress: businessData.address?.streetAddress || 'Schürenweg 61',
        addressLocality: businessData.address?.addressLocality || 'Mönchengladbach',
        postalCode: businessData.address?.postalCode || '41063',
          addressCountry: businessData.address?.addressCountry || 'DE'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: businessData.geo?.latitude || 51.1956,
          longitude: businessData.geo?.longitude || 6.4378
        },
        openingHoursSpecification: businessData.openingHours?.map(hours => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: hours.split(' ')[0],
          opens: hours.split(' ')[1].split('-')[0],
          closes: hours.split(' ')[1].split('-')[1]
        })) || [
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
        ]
      };
      break;

    case 'MedicalService':
      const serviceData = data as MedicalServiceProps;
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        name: serviceData.name,
        description: serviceData.description,
        url: serviceData.url,
        provider: {
          '@type': 'MedicalBusiness',
          name: serviceData.provider.name,
          url: serviceData.provider.url
        },
        medicalSpecialty: serviceData.medicalSpecialty || 'Dermatology'
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
          bestRating: reviewData.reviewRating.bestRating
        },
        author: {
          '@type': 'Person',
          name: reviewData.author.name
        },
        datePublished: reviewData.datePublished || new Date().toISOString().split('T')[0],
        itemReviewed: {
          '@type': 'MedicalBusiness',
          name: 'Dion Hair Clinic',
          url: 'https://dionhairclinic.de'
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
