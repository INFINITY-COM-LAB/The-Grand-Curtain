import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { NowShowing } from "./components/NowShowing";
import { Upcoming } from "./components/Upcoming";
import { About } from "./components/About";
import { Reviews } from "./components/Reviews";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { ArrowUp } from "lucide-react";
import { cn } from "./utils/cn";

export function App() {
  const [showBanner, setShowBanner] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top button after scrolling 500px
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white antialiased">
      {/* Sample Website Caution Banner */}
      {showBanner && (
        <div
          role="banner"
          className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-black"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 justify-center text-sm sm:text-base font-semibold">
              <span className="text-lg" aria-hidden="true">⚠️</span>
              <span>
                This is a <strong>Sample Website</strong> — All content, shows &amp; details are fictional and for demonstration purposes only.
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
      <main>
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
        className={cn(
          "fixed bottom-8 right-6 z-50 w-12 h-12 rounded-full bg-amber-500 text-black shadow-lg shadow-amber-500/30 flex items-center justify-center transition-all duration-300 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black",
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Scroll back to top"
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
