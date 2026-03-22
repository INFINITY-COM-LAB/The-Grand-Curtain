import { useState, useEffect } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { NowShowing } from "./components/NowShowing";
import { Upcoming } from "./components/Upcoming";
import { About } from "./components/About";
import { Reviews } from "./components/Reviews";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { errorTracker } from "@/utils/errorTracking";

export function App() {
  const [showBanner, setShowBanner] = useState(true);

  // Initialize error tracking on mount
  useEffect(() => {
    errorTracker.init();
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0d0d0d] text-white antialiased">
        {/* Sample Website Caution Banner */}
        {showBanner && (
          <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-black">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 justify-center text-sm sm:text-base font-semibold">
                <span className="text-lg">⚠️</span>
                <span>
                  This is a <strong>Sample Website</strong> — All content, shows & details are fictional and for demonstration purposes only.
                </span>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-amber-600 transition-colors font-bold text-lg leading-none"
                aria-label="Dismiss banner"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Push content down when banner is visible */}
        {showBanner && <div className="h-10 sm:h-10" />}

        <Navbar />
        <Hero />
        <NowShowing />
        <Upcoming />
        <About />
        <Reviews />
        <Newsletter />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
