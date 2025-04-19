import React, { useState } from 'react';
import styles from './OptimizedImage.module.css';

/**
 * Interface for image sources
 */
interface ImageSources {
  webp?: string;
  avif?: string; // Added support for AVIF format
  original: string;
  placeholder?: string;
  width?: number;
  height?: number;
}

/**
 * Props for OptimizedImage component
 */
interface OptimizedImageProps {
  sources: ImageSources;
  alt: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  useLqip?: boolean;
  placeholderStyle?: React.CSSProperties;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'; // Added configurable object-fit
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage component
 * 
 * A component for displaying optimized images with WebP support,
 * lazy loading, and optional LQIP (Low Quality Image Placeholder).
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  sources,
  alt,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = loading === 'eager' ? 'high' : 'auto', // Automatically set high priority for eager loading
  className = '',
  style = {},
  sizes = '100vw',
  useLqip = false,
  objectFit = 'cover',
  placeholderStyle = {},
  onLoad,
  onError,
}) => {
  // Assume all images are loaded to avoid layout shifts
  const [imageLoaded, setImageLoaded] = useState(true);

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
    if (onLoad) onLoad();
  };

  // Handle image error
  const handleImageError = () => {
    if (onError) onError();
  };

  // If using LQIP and a placeholder is provided
  if (useLqip && sources.placeholder) {
    return (
      <div className={`${styles.container} ${className}`}>
        {/* Placeholder image */}
        <img
          src={sources.placeholder}
          alt={alt}
          className={`${styles.placeholder} ${imageLoaded ? styles.placeholderHidden : styles.placeholderVisible}`}
          aria-hidden="true"
        />

        {/* Actual image (loaded lazily) */}
        <picture className={`${styles.picture} ${imageLoaded ? styles.pictureVisible : styles.pictureHidden}`}>
          {sources.webp && (
            <source
              srcSet={sources.webp}
              type="image/webp"
              sizes={sizes}
            />
          )}
          <source
            srcSet={sources.original}
            type={sources.original.endsWith('.png') ? 'image/png' : 'image/jpeg'}
            sizes={sizes}
          />
          <img
            src={sources.original}
            alt={alt}
            loading={loading}
            decoding={decoding}
            fetchPriority={fetchPriority}
          className={styles.image}
          style={{ objectFit }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            width={sources.width}
            height={sources.height}
          />
        </picture>
      </div>
    );
  }

  // Standard picture element with WebP and AVIF support
  return (
    <picture className={`${styles.standardPicture} ${className}`}>
      {sources.avif && (
        <source
          srcSet={sources.avif}
          type="image/avif"
          sizes={sizes}
        />
      )}
      {sources.webp && (
        <source
          srcSet={sources.webp}
          type="image/webp"
          sizes={sizes}
        />
      )}
      <source
        srcSet={sources.original}
        type={sources.original.endsWith('.png') ? 'image/png' : 'image/jpeg'}
        sizes={sizes}
      />
      <img
        src={sources.original}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={styles.image}
        style={{ objectFit }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        width={sources.width}
        height={sources.height}
      />
    </picture>
  );
};

/**
 * Generate a tiny placeholder image for LQIP
 * 
 * @param width Width of the placeholder
 * @param height Height of the placeholder
 * @param color Color of the placeholder
 * @returns Data URL for the placeholder
 */
export const generatePlaceholder = (
  width: number,
  height: number,
  color = '#f0f0f0'
): string => {
  if (typeof document === 'undefined') return '';
  
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  // Get the canvas context
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Fill the canvas with the specified color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  // Convert the canvas to a data URL
  return canvas.toDataURL('image/jpeg', 0.1);
};

/**
 * Preload an image
 * 
 * @param src Image source URL
 * @returns Promise that resolves when the image is loaded
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Preload multiple images
 * 
 * @param srcs Array of image source URLs
 * @returns Promise that resolves when all images are loaded
 */
export const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map(preloadImage));
};

export default OptimizedImage;
