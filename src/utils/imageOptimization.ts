/**
 * Image Optimization Utilities
 * Provides guidelines and helpers for responsive images, lazy loading, and performance
 */

import { siteConfig } from "../data/siteConfig";

/**
 * LazyImage Component Props
 * Use this interface for images that should be lazy-loaded
 */
export interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  onLoad?: (e: Event) => void;
}

/**
 * Generate srcset for responsive images
 * @param imagePath - Base image path
 * @param sizes - Array of widths to generate (e.g., [400, 600, 800])
 * @returns srcset string for img element
 */
export function generateSrcSet(imagePath: string, sizes: number[]): string {
  // For Unsplash images (used in demo)
  if (imagePath.includes("unsplash.com")) {
    return sizes
      .map((size) => {
        const url = new URL(imagePath);
        url.searchParams.set("w", String(size));
        url.searchParams.set("fit", "crop");
        url.searchParams.set("q", "80");
        return `${url.toString()} ${size}w`;
      })
      .join(", ");
  }

  // For other image sources, adjust logic as needed
  return imagePath;
}

/**
 * Get optimized image URL with params
 * @param imagePath - Base image URL
 * @param width - Desired width
 * @param quality - Quality (0-100, default 80)
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  imagePath: string,
  width: number,
  quality: number = 80
): string {
  if (imagePath.includes("unsplash.com")) {
    const url = new URL(imagePath);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality));
    url.searchParams.set("fit", "crop");
    return url.toString();
  }

  // Adjust for other image providers (Cloudinary, imgix, etc.)
  return imagePath;
}

/**
 * Image loading strategy recommendations:
 *
 * 1. Hero Image (above the fold):
 *    - loading="eager"
 *    - High quality, full resolution
 *    - Consider preloading in index.html <link rel="preload">
 *
 * 2. Below-the-fold images (cards, galleries):
 *    - loading="lazy"
 *    - Native browser lazy loading with IntersectionObserver polyfill
 *    - Use srcset for responsive sizes
 *
 * 3. Background images:
 *    - Use CSS `background-image` with media queries
 *    - Or use CSS `container-query` for responsive backgrounds
 *
 * 4. Thumbnails:
 *    - Width: 200-400px
 *    - Format: WebP with JPEG fallback
 *    - Quality: 75-85
 *
 * 5. Full-screen cards:
 *    - Width: 400-800px
 *    - Format: WebP with JPEG fallback
 *    - Quality: 80-85
 */

/**
 * Recommended image sizes for different screen sizes
 */
export const responsiveImageSizes = {
  // Mobile (320-480px)
  mobile: {
    card: 300,
    hero: 480,
    thumbnail: 150,
  },
  // Tablet (768-1024px)
  tablet: {
    card: 400,
    hero: 800,
    thumbnail: 200,
  },
  // Desktop (1200px+)
  desktop: {
    card: 600,
    hero: 1440,
    thumbnail: 300,
  },
};

/**
 * Create a picture element for maximum image optimization
 * Usage: Call in component render, wrap with <picture> tag
 *
 * Example:
 * <picture>
 *   {createWebPSource(imagePath)}
 *   <img
 *     src={imagePath}
 *     alt="description"
 *     loading="lazy"
 *     className="w-full h-auto"
 *   />
 * </picture>
 */
export function createWebPSource(
  imagePath: string,
  width?: number
): JSX.Element {
  if (!imagePath) return <></>;

  // For Unsplash (demo), create WebP version if possible
  // In production, use a real image optimization service
  return (
    <source
      srcSet={width ? getOptimizedImageUrl(imagePath, width) : imagePath}
      type="image/webp"
    />
  );
}

/**
 * Performance metrics to monitor:
 * - LCP (Largest Contentful Paint): Should be < 2.5s
 * - FID (First Input Delay): Should be < 100ms
 * - CLS (Cumulative Layout Shift): Should be < 0.1
 *
 * For images:
 * - Use loading="lazy" for below-the-fold images
 * - Provide explicit width/height to prevent layout shift
 * - Compress images (consider WebP format)
 * - Use CDN for image delivery
 * - Set up caching headers
 */

export const imageOptimizationGuide = {
  hero: {
    loadingStrategy: "eager",
    width: 1440,
    quality: 85,
    format: "webp",
    description: "Above-the-fold hero images should be preloaded and high quality",
  },
  card: {
    loadingStrategy: "lazy",
    width: 400,
    quality: 80,
    format: "webp",
    description: "Card images can use native lazy loading",
  },
  thumbnail: {
    loadingStrategy: "lazy",
    width: 200,
    quality: 75,
    format: "webp",
    description: "Thumbnails should be small and optimize for fast loading",
  },
};
