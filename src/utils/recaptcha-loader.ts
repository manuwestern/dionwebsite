/**
 * Utility for lazy loading Google reCAPTCHA
 * 
 * This utility helps improve performance by loading the reCAPTCHA script
 * only when needed, rather than on initial page load.
 */

// Track if reCAPTCHA is loaded
let recaptchaLoaded = false;
let recaptchaCallback: (() => void) | null = null;

/**
 * Load the reCAPTCHA script dynamically
 * @param callback Function to call when reCAPTCHA is loaded
 */
export const loadRecaptcha = (callback?: () => void): Promise<void> => {
  // If already loaded, just call the callback
  if (recaptchaLoaded) {
    if (callback) callback();
    return Promise.resolve();
  }

  // Store callback for later
  if (callback) {
    recaptchaCallback = callback;
  }

  // If already loading, don't load again
  if (document.querySelector('script[src*="recaptcha/api.js"]')) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    // Determine which key to use based on environment
    const siteKey = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // Google Test-Schlüssel für localhost
      : '6LfJLhUrAAAAAJwA_XBpQHOYHDMjmABDzHY1oZRt'; // Produktionsschlüssel

    // Create script element
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    // Set up onload handler
    script.onload = () => {
      console.log('reCAPTCHA loaded');
      recaptchaLoaded = true;
      if (recaptchaCallback) {
        recaptchaCallback();
        recaptchaCallback = null;
      }
      resolve();
    };

    // Add script to document
    document.head.appendChild(script);
  });
};

/**
 * Execute reCAPTCHA and get a token
 * @param action The action name for analytics
 * @returns Promise that resolves with the reCAPTCHA token
 */
export const executeRecaptcha = async (action: string): Promise<string> => {
  // Load reCAPTCHA if not already loaded
  if (!recaptchaLoaded) {
    await loadRecaptcha();
  }

  // Execute reCAPTCHA and get token
  return new Promise<string>((resolve, reject) => {
    if (!(window as any).grecaptcha || !(window as any).grecaptcha.ready) {
      reject(new Error('reCAPTCHA not loaded'));
      return;
    }

    (window as any).grecaptcha.ready(() => {
      (window as any).grecaptcha
        .execute(undefined, { action })
        .then((token: string) => {
          resolve(token);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  });
};

/**
 * Hook to load reCAPTCHA when a form is being interacted with
 * @param formRef Reference to the form element
 */
export const useRecaptchaLoader = (formRef: React.RefObject<HTMLFormElement>): void => {
  // Load reCAPTCHA when user interacts with the form
  const handleFormInteraction = () => {
    loadRecaptcha();
    
    // Remove event listeners once reCAPTCHA is loading
    if (formRef.current) {
      formRef.current.removeEventListener('focus', handleFormInteraction, true);
      formRef.current.removeEventListener('mouseenter', handleFormInteraction);
    }
  };

  // Add event listeners to form
  if (formRef.current) {
    formRef.current.addEventListener('focus', handleFormInteraction, true);
    formRef.current.addEventListener('mouseenter', handleFormInteraction);
  }
};
