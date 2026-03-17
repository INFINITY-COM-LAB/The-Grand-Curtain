import { useState, useEffect } from "react";
import { Menu, X, Theater } from "lucide-react";
import { cn } from "@/utils/cn";

const navLinks = [
  { label: "Now Showing", href: "#now-showing", id: "now-showing" },
  { label: "Upcoming", href: "#upcoming", id: "upcoming" },
  { label: "About", href: "#about", id: "about" },
  { label: "Reviews", href: "#reviews", id: "reviews" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Trap focus inside mobile menu for accessibility
  const handleMobileKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      )}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          aria-label="The Grand Curtain — Home"
        >
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-widest transition-colors duration-300 relative",
                activeSection === link.id
                  ? "text-amber-400"
                  : "text-white/70 hover:text-amber-400"
              )}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-amber-400 rounded-full" />
              )}
            </a>
          ))}
          <a
            href="#now-showing"
            className="ml-4 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            Book Tickets
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          onKeyDown={handleMobileKeyDown}
          className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-6 pb-6 pt-4 space-y-4 animate-in slide-in-from-top-2 duration-200"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "block text-sm uppercase tracking-widest transition-colors py-1",
                activeSection === link.id
                  ? "text-amber-400"
                  : "text-white/70 hover:text-amber-400"
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#now-showing"
            className="block text-center rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Book Tickets
          </a>
        </div>
      )}
    </nav>
  );
}
