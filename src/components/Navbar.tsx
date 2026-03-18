import { useState, useEffect, useRef } from "react";
import { Menu, X, Theater } from "lucide-react";
import { smoothScrollToSection, getActiveSectionId } from "@/utils/smoothScroll";

const navLinks = [
  { label: "Now Showing", href: "#now-showing" },
  { label: "Upcoming", href: "#upcoming" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Efficient scroll listener with throttling
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setActiveSection(getActiveSectionId());
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (href: string) => {
    const sectionId = href.replace("#", "");
    smoothScrollToSection(sectionId);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className="fixed top-10 sm:top-10 left-0 right-0 z-50 px-4 sm:px-6"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur-xl">
          {/* Logo */}
          <div className="flex items-center gap-2 font-serif font-bold text-white">
            <Theater className="h-5 w-5 text-amber-400" />
            <span className="hidden sm:inline">The Grand Curtain</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === link.href.replace("#", "")
                    ? "text-amber-400"
                    : "text-white/60 hover:text-white"
                }`}
                aria-current={activeSection === link.href.replace("#", "") ? "page" : undefined}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            className="md:hidden text-white/60 hover:text-white transition-colors p-2"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="absolute top-full left-4 right-4 mt-2 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-6 py-3 text-sm font-medium text-left transition-colors ${
                    index !== navLinks.length - 1 ? "border-b border-white/5" : ""
                  } ${
                    activeSection === link.href.replace("#", "")
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-white/60 hover:text-white"
                  }`}
                  aria-current={activeSection === link.href.replace("#", "") ? "page" : undefined}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
