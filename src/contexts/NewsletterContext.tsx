import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NewsletterContextType {
  showPopup: boolean;
  hasSubscribed: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  openPopup: () => void;
  closePopup: () => void;
  submitEmail: (email: string) => Promise<void>;
}

const NewsletterContext = createContext<NewsletterContextType | undefined>(undefined);

interface NewsletterProviderProps {
  children: ReactNode;
  webhookUrl?: string;
}

export const NewsletterProvider: React.FC<NewsletterProviderProps> = ({ 
  children, 
  webhookUrl = 'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY4MDYzNjA0M2Q1MjY4NTUzMDUxMzQi_pc' // Replace with actual webhook URL
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Check localStorage on mount to see if user has already seen the popup
  useEffect(() => {
    try {
      const hasSeenPopup = localStorage.getItem('dion_newsletter_seen');
      const hasSubscribedBefore = localStorage.getItem('dion_newsletter_subscribed');
      
      if (hasSubscribedBefore === 'true') {
        setHasSubscribed(true);
      } else if (!hasSeenPopup) {
        // Show popup after 30 seconds if user hasn't seen it before
        // Increased from 15 to 30 seconds for better user experience
        const timer = setTimeout(() => {
          setShowPopup(true);
          try {
            localStorage.setItem('dion_newsletter_seen', new Date().toISOString());
          } catch (error) {
            console.error('Error saving to localStorage:', error);
          }
        }, 30000);
        
        return () => clearTimeout(timer);
      }
    } catch (error) {
      // Handle case where localStorage is not available (e.g., private browsing)
      console.error('Error accessing localStorage:', error);
    }
  }, []);
  
  const openPopup = () => {
    setShowPopup(true);
  };
  
  const closePopup = () => {
    setShowPopup(false);
    // Reset states when closing
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
  };
  
  const submitEmail = async (email: string) => {
    if (!email || !email.includes('@')) {
      setIsError(true);
      setErrorMessage('invalidEmail');
      return;
    }
    
    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage('');
    
    try {
      // Send email to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Server error');
      }
      
      // Success
      setIsSuccess(true);
      setHasSubscribed(true);
      try {
        localStorage.setItem('dion_newsletter_subscribed', 'true');
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      // Close popup after 3 seconds on success
      setTimeout(() => {
        closePopup();
      }, 3000);
      
    } catch (error) {
      setIsError(true);
      setErrorMessage('message');
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Memoize context value to prevent unnecessary re-renders
  const value = React.useMemo(() => ({
    showPopup,
    hasSubscribed,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    openPopup,
    closePopup,
    submitEmail,
  }), [
    showPopup,
    hasSubscribed,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage
  ]);
  
  return (
    <NewsletterContext.Provider value={value}>
      {children}
    </NewsletterContext.Provider>
  );
};

export const useNewsletter = (): NewsletterContextType => {
  const context = useContext(NewsletterContext);
  if (context === undefined) {
    throw new Error('useNewsletter must be used within a NewsletterProvider');
  }
  return context;
};

export default NewsletterContext;
