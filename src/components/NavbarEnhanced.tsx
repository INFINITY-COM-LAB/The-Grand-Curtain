import { useState, useEffect } from "react";
import { Menu, X, Theater } from "lucide-react";
import { cn } from "@/utils/cn";
import { useActiveSectionScroll } from "@/hooks/useActiveSectionScroll";

const navLinks = [
  { label: "Now Showing", href: "#now-showing", id: "now-showing" },
  { label: "Upcoming", href: "#upcoming", id: "upcoming" },
  { label: "About", href: "#about", id: "about" },
  { label: "Reviews", href: "#reviews", id: "reviews" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function NavbarEnhanced() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSectionScroll(navLinks.map(l => l.id), 80);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Auto-close mobile menu on scroll
      if (mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Theater className="h-8 w-8 text-amber-400 group-hover:text-amber-300 transition-colors" />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-wide text-white font-serif">
              The Grand Curtain
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/80">
              Theatre & Arts
            </span>
          </div>
        </a>

        {/* Desktop Links with Active State */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobileMenu}
              className={cn(
                "text-sm uppercase tracking-widest transition-colors duration-300 relative group",
                activeSection === link.id
                  ? "text-amber-400 font-semibold"
                  : "text-white/70 hover:text-amber-400"
              )}
            >
              {link.label}
              {/* Active indicator underline */}
              <span
                className={cn(
                  "absolute bottom-[-4px] left-0 h-0.5 bg-amber-400 transition-all duration-300",
                  activeSection === link.id ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-white hover:text-amber-400 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-amber-400/20 animate-in fade-in slide-in-from-top-4"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className={cn(
                  "px-6 py-4 text-sm uppercase tracking-widest border-l-2 transition-all duration-200",
                  activeSection === link.id
                    ? "bg-amber-400/10 border-l-amber-400 text-amber-400 font-semibold"
                    : "border-l-transparent text-white/70 hover:bg-white/5 hover:text-amber-400"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
