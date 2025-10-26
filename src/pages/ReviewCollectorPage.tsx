import React, { useEffect } from 'react';
import SEO from '../components/seo/SEO';

const ReviewCollectorPage: React.FC = () => {
  useEffect(() => {
    // Load Trustpilot script only on this page
    const existing = document.querySelector('script[src*="tp.widget.bootstrap.min.js"]') as HTMLScriptElement | null;
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      <SEO
        title="Bewertung abgeben | Dion Hair Clinic"
        description="Geben Sie Ihre Erfahrungen mit der Dion Hair Clinic bei Trustpilot ab."
        noindex
        nofollow
        namespace="common"
      />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">Bewertung abgeben</h1>
          <p className="text-gray-600 mb-8">
            Vielen Dank, dass Sie sich Zeit für eine Bewertung nehmen. Über das folgende Trustpilot-Widget
            können Sie Ihre Erfahrung mit der Dion Hair Clinic teilen.
          </p>

          {/* TrustBox widget - Review Collector */}
          <div
            className="trustpilot-widget"
            data-locale="de-DE"
            data-template-id="56278e9abbbba0bdcd568bc"
            data-businessunit-id="6578440cfa8c7e8d395fed19"
            data-style-height="52px"
            data-style-width="100%"
            data-token="f8c15495-0e5c-4467-93b5-3a202537e419"
          >
            <a
              href="https://de.trustpilot.com/review/dionhairclinic.de"
              target="_blank"
              rel="noopener"
            >
              Trustpilot
            </a>
          </div>
          {/* End TrustBox widget */}
        </div>
      </section>
    </>
  );
};

export default ReviewCollectorPage;
