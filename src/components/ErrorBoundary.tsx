import { Component, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { errorTracker } from '@/utils/errorTracking';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorCount: number;
}

/**
 * Error Boundary Component
 * Catches React component errors and provides recovery UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorCount: 1,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Track error
    errorTracker.captureError({
      type: 'component-error',
      message: error.message,
      stack: error.stack || errorInfo.componentStack,
      context: {
        componentStack: errorInfo.componentStack,
      },
    });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorCount: this.state.errorCount + 1,
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      return (
        this.props.fallback?.(this.state.error, this.handleReset) || (
          <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full">
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-red-500/10 p-4">
                    <AlertTriangle className="h-8 w-8 text-red-400" />
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-white mb-2">
                  Something Went Wrong
                </h1>

                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  An unexpected error occurred. Don't worry, we've logged this issue and our team is on it.
                </p>

                {process.env.NODE_ENV !== 'production' && (
                  <div className="mb-6 rounded-lg bg-white/5 p-4 text-left border border-white/10">
                    <p className="text-xs font-mono text-amber-400 break-words">
                      {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <details className="mt-2">
                        <summary className="text-xs text-white/40 cursor-pointer hover:text-white/60">
                          Stack trace
                        </summary>
                        <pre className="mt-2 text-xs text-white/30 overflow-auto max-h-40">
                          {this.state.error.stack}
                        </pre>
                      </details>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    onClick={this.handleReset}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Try Again
                  </button>

                  <button
                    onClick={() => window.location.reload()}
                    className="w-full rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white/70 hover:border-white/30 hover:text-white transition-colors"
                  >
                    Reload Page
                  </button>
                </div>

                {this.state.errorCount > 2 && (
                  <p className="mt-4 text-xs text-white/40">
                    If this keeps happening, please <a href="mailto:webstitch2026@gmail.com" className="text-amber-400 hover:underline">contact support</a>.
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
