import React, { useState } from 'react';
import { Star } from 'lucide-react';
import SEO from '../components/seo/SEO';

const ReviewCollectorPage: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showLinks, setShowLinks] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    if (selectedRating >= 4) {
      setShowLinks(true);
      setShowForm(false);
    } else {
      setShowForm(true);
      setShowLinks(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send feedback via webhook
      const response = await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY4MDYzNjA0M2Q1MjY4NTUzMDUxMzQi_pc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'negative_feedback',
          rating,
          name,
          email,
          feedback,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Bewertung abgeben | Dion Hair Clinic"
        description="Geben Sie Ihre Erfahrungen mit der Dion Hair Clinic ab."
        noindex
        nofollow
        namespace="common"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 font-montserrat">
        <div className="max-w-2xl w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-light tracking-wider text-primary mb-2">
              DION<span className="font-normal">HAIR CLINIC</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {!submitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
                    Ihre Meinung ist uns wichtig
                  </h2>
                  <p className="text-gray-600">
                    Wie zufrieden sind Sie mit unserer Behandlung?
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                      aria-label={`${star} Sterne`}
                    >
                      <Star
                        size={48}
                        className={`transition-colors ${
                          star <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Rating Text */}
                {rating > 0 && (
                  <p className="text-center text-gray-600 mb-6">
                    Sie haben {rating} von 5 Sternen vergeben
                  </p>
                )}

                {/* Positive Rating - Show Review Links */}
                {showLinks && (
                  <div className="space-y-6 animate-slide-up">
                    <div className="text-center mb-6">
                      <p className="text-lg font-medium text-primary mb-2">
                        Vielen Dank für Ihre positive Bewertung! 🎉
                      </p>
                      <p className="text-gray-600">
                        Helfen Sie anderen, indem Sie Ihre Erfahrung teilen:
                      </p>
                    </div>

                    {/* Google Review Button */}
                    <a
                      href="https://g.page/r/CRnU8EfKocfzEBM/review"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-primary hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-lg transition-colors text-center"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span>Auf Google bewerten</span>
                      </div>
                    </a>

                    {/* Trustpilot Review Button */}
                    <a
                      href="https://de.trustpilot.com/review/dionhairclinic.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-[#00b67a] hover:bg-[#009966] text-white font-medium py-4 px-6 rounded-lg transition-colors text-center"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span>Auf Trustpilot bewerten</span>
                      </div>
                    </a>
                  </div>
                )}

                {/* Negative Rating - Show Feedback Form */}
                {showForm && (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-6 animate-slide-up">
                    <div className="text-center mb-6">
                      <p className="text-lg font-medium text-primary mb-2">
                        Es tut uns leid, dass Sie nicht zufrieden waren
                      </p>
                      <p className="text-gray-600">
                        Bitte teilen Sie uns mit, wie wir uns verbessern können:
                      </p>
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name (optional)
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="Ihr Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        E-Mail (optional)
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder="ihre.email@beispiel.de"
                      />
                    </div>

                    <div>
                      <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                        Ihr Feedback *
                      </label>
                      <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        placeholder="Bitte beschreiben Sie, was wir verbessern können..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !feedback.trim()}
                      className="w-full bg-primary hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Wird gesendet...' : 'Feedback absenden'}
                    </button>
                  </form>
                )}
              </>
            ) : (
              /* Thank You Message */
              <div className="text-center py-8 animate-slide-up">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
                  Vielen Dank für Ihr Feedback!
                </h2>
                <p className="text-gray-600 mb-8">
                  Wir werden Ihre Rückmeldung sorgfältig prüfen und uns bemühen, unseren Service zu verbessern.
                </p>
                <a
                  href="https://www.dionhairclinic.com"
                  className="inline-block bg-primary hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                >
                  Zur Startseite
                </a>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} Dion Hair Clinic. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCollectorPage;
