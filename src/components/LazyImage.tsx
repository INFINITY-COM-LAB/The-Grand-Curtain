import { useState, useEffect, useRef } from "react";
import { cn } from "../utils/cn";

interface LazyImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * LazyImage Component
 * 
 * Advanced image component with:
 * - Intersection Observer for lazy loading
 * - Blur-up effect during load
 * - Responsive srcSet support
 * - Fallback placeholder
 * - Error handling
 * 
 * Usage:
 * <LazyImage
 *   src="image.jpg"
 *   srcSet="image-small.jpg 480w, image-large.jpg 1200w"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 *   alt="Description"
 *   className="w-full h-auto"
 * />
 */
export function LazyImage({
  src,
  alt,
  srcSet,
  sizes,
  className,
  containerClassName,
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23f3f4f6'/%3E%3C/svg%3E",
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            // Start loading the image
            imgRef.current.src = src;
            if (srcSet) {
              imgRef.current.srcSet = srcSet;
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, srcSet]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className={cn("overflow-hidden", containerClassName)}>
      <img
        ref={imgRef}
        src={placeholder}
        alt={alt}
        sizes={sizes}
        className={cn(
          "transition-all duration-500",
          isLoaded ? "blur-0" : "blur-lg",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 text-white text-xs">
          Image failed to load
        </div>
      )}
    </div>
  );
}
