import { Component, ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary Component
 * 
 * Catches React errors in the component tree and displays a user-friendly fallback UI.
 * Prevents the entire app from crashing if a single component fails.
 * 
 * @example
 * <ErrorBoundary>
 *   <SomeComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="text-6xl mb-4">🎭</div>
            <h1 className="text-3xl font-bold text-white font-serif mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-white/60 mb-8">
              We apologize for the interruption. Our team has been notified and is working on a fix.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-block rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
