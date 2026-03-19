import { Component, ReactNode, ErrorInfo } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary Component
 * 
 * Catches React component errors and displays a user-friendly fallback UI.
 * Prevents entire app crashes from breaking the user experience.
 * 
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console in development
    if (import.meta.env.DEV) {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white p-6"
          role="alert"
          aria-live="polite"
        >
          <div className="max-w-md text-center">
            {/* Error Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse" />
                <AlertTriangle className="h-16 w-16 text-red-500 relative z-10" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold font-serif mb-3">
              Oops! Something went wrong
            </h1>
            <p className="text-white/60 mb-2">
              We encountered an unexpected error. Don't worry, we're working on it.
            </p>

            {/* Debug Info (Development Only) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-6 mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left">
                <p className="text-xs text-red-400 font-mono break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mt-8">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold transition-colors"
                aria-label="Try again"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 hover:border-white/40 text-white font-semibold transition-colors"
                aria-label="Go to home page"
              >
                Go Home
              </a>
            </div>

            {/* Support Message */}
            <p className="text-xs text-white/40 mt-8">
              If this problem persists, please contact{" "}
              <a
                href="mailto:webstitch2026@gmail.com"
                className="underline hover:text-white/60 transition-colors"
              >
                our support team
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
