import { useEffect } from 'react';
import { errorTracker, ErrorEvent } from '@/utils/errorTracking';

/**
 * Hook to monitor errors in a component
 * Useful for error analytics and debugging
 */
export function useErrorTracking(onError?: (error: ErrorEvent) => void): {
  errors: ErrorEvent[];
  clearErrors: () => void;
  getStats: () => Record<string, number>;
} {
  useEffect(() => {
    // Initialize error tracking on first mount
    errorTracker.init();

    // Subscribe to errors if callback provided
    if (onError) {
      return errorTracker.onError(onError);
    }
  }, [onError]);

  return {
    errors: errorTracker.getErrors(),
    clearErrors: () => errorTracker.clearErrors(),
    getStats: () => errorTracker.getErrorStats(),
  };
}
