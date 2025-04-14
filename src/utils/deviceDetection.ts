/**
 * Utility functions for device detection
 */

/**
 * Checks if the current device is a mobile device
 * @returns boolean indicating if the device is mobile
 */
export const isMobileDevice = (): boolean => {
  // Check if window is defined (for SSR)
  if (typeof window === 'undefined') {
    return false;
  }
  
  // Use user agent to detect mobile devices
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // Check for common mobile device indicators in user agent
  const mobileKeywords = [
    'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone',
    'opera mini', 'mobile', 'tablet', 'iemobile'
  ];
  
  return mobileKeywords.some(keyword => userAgent.includes(keyword));
};

/**
 * Checks if the viewport width is below a certain threshold
 * @param threshold The width threshold in pixels (default: 768px)
 * @returns boolean indicating if the viewport is narrow
 */
export const isNarrowViewport = (threshold = 768): boolean => {
  // Check if window is defined (for SSR)
  if (typeof window === 'undefined') {
    return false;
  }
  
  return window.innerWidth < threshold;
};

/**
 * Comprehensive check for mobile experience
 * Combines device detection and viewport width
 * @returns boolean indicating if mobile experience is appropriate
 */
export const shouldUseMobileExperience = (): boolean => {
  return isMobileDevice() || isNarrowViewport();
};
