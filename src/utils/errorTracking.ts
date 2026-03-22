/**
 * Client Error Tracking & Logging Service
 * Captures unhandled errors, promise rejections, and component crashes
 * Provides telemetry for frontend health monitoring
 */

export interface ErrorEvent {
  id: string;
  type: 'error' | 'unhandled-rejection' | 'component-error';
  message: string;
  stack?: string;
  context?: Record<string, any>;
  timestamp: number;
  url: string;
  userAgent: string;
}

class ErrorTracker {
  private errors: ErrorEvent[] = [];
  private maxErrors = 50; // Keep last 50 errors in memory
  private listeners: ((error: ErrorEvent) => void)[] = [];
  private isInitialized = false;

  /**
   * Initialize global error listeners
   */
  init(): void {
    if (this.isInitialized) return;

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      this.captureError({
        type: 'error',
        message: event.message,
        stack: event.filename ? `${event.filename}:${event.lineno}:${event.colno}` : undefined,
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      this.captureError({
        type: 'unhandled-rejection',
        message: reason?.message || String(reason),
        stack: reason?.stack,
        context: {
          reason: reason?.toString?.() || String(reason),
        },
      });
    });

    this.isInitialized = true;
  }

  /**
   * Capture an error event
   */
  captureError(error: Omit<ErrorEvent, 'id' | 'timestamp' | 'url' | 'userAgent'>): ErrorEvent {
    const errorEvent: ErrorEvent = {
      id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...error,
    };

    // Store error
    this.errors.push(errorEvent);
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Notify listeners
    this.listeners.forEach((listener) => {
      try {
        listener(errorEvent);
      } catch (e) {
        console.error('Error in error listener:', e);
      }
    });

    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[${errorEvent.type}] ${errorEvent.message}`, errorEvent);
    }

    return errorEvent;
  }

  /**
   * Subscribe to error events
   */
  onError(callback: (error: ErrorEvent) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  /**
   * Get all captured errors
   */
  getErrors(): ErrorEvent[] {
    return [...this.errors];
  }

  /**
   * Clear error history
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Get error count by type
   */
  getErrorStats(): Record<string, number> {
    return this.errors.reduce(
      (acc, error) => {
        acc[error.type] = (acc[error.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }

  /**
   * Send errors to server (stub for backend integration)
   */
  async sendErrors(endpoint: string): Promise<void> {
    if (this.errors.length === 0) return;

    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          errors: this.errors,
          session: {
            timestamp: Date.now(),
            url: window.location.href,
          },
        }),
      });
    } catch (e) {
      console.error('Failed to send errors to server:', e);
    }
  }
}

// Export singleton instance
export const errorTracker = new ErrorTracker();
