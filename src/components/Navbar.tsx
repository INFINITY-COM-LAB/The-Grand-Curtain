import { useState, useEffect } from "react";
import { Menu, X, Theater } from "lucide-react";
import { cn } from "@/utils/cn";

const navLinks = [
  { label: "Now Showing", href: "#now-showing" },
  { label: "Upcoming", href: "#upcoming" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm uppercase tracking-widest text-white/70 hover:text-amber-400 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#now-showing"
            className="ml-4 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors duration-300"
          >
            Book Tickets
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-6 pb-6 pt-4 space-y-4 animate-in fade-in slide-in-from-top-4"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm uppercase tracking-widest text-white/70 hover:text-amber-400 transition-colors"
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#now-showing"
            className="block text-center rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
            onClick={closeMobileMenu}
          >
            Book Tickets
          </a>
        </div>
      )}
    </nav>
  );
}
