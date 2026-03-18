import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { NowShowing } from "./components/NowShowing";
import { Upcoming } from "./components/Upcoming";
import { About } from "./components/About";
import { Reviews } from "./components/Reviews";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { useScrollToTop } from "./hooks/useScrollToTop";

export function App() {
  const [showBanner, setShowBanner] = useState(true);
  const { isVisible, scrollToTop } = useScrollToTop(500);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white antialiased">
      {/* Sample Website Caution Banner */}
      {showBanner && (
        <div 
          className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-black"
          role="alert"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 justify-center text-sm sm:text-base font-semibold">
              <span className="text-lg" aria-hidden="true">⚠️</span>
              <span>
                This is a <strong>Sample Website</strong> — All content, shows & details are fictional and for demonstration purposes only.
              </span>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-amber-600 transition-colors font-bold text-lg leading-none focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Dismiss banner"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Push content down when banner is visible */}
      {showBanner && <div className="h-10 sm:h-10" aria-hidden="true" />}

      <Navbar />
      
      <main className="relative">
        <Hero />
        <NowShowing />
        <Upcoming />
        <About />
        <Reviews />
        <Newsletter />
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-black hover:bg-amber-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-16 pointer-events-none"
        }`}
        aria-label="Scroll to top"
        aria-hidden={!isVisible}
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  );
}
