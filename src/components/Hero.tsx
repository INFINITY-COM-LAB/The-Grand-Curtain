import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a0a0a] to-[#0d0d0d]" />

      {/* Decorative curtain pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-1/3 h-full"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(180,50,50,0.3) 30px, rgba(180,50,50,0.3) 32px)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-1/3 h-full"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(180,50,50,0.3) 30px, rgba(180,50,50,0.3) 32px)",
          }}
        />
      </div>

      {/* Spotlight effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
      <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-red-900/10 rounded-full blur-[100px]" />
      <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-red-900/10 rounded-full blur-[100px]" />

      {/* Top drape SVG decoration */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full text-red-900/30">
          <path
            fill="currentColor"
            d="M0,0 C240,100 480,40 720,80 C960,120 1200,20 1440,0 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Small label */}
        <div className="inline-flex items-center gap-2 mb-8 border border-amber-500/30 rounded-full px-5 py-2 bg-amber-500/5">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            Season 2025 Now Open
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white font-serif leading-tight mb-6">
          Where Stories
          <br />
          Come{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
            Alive
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Experience the magic of live theatre at The Grand Curtain. World-class
          performances, breathtaking productions, and unforgettable nights await
          you under our historic proscenium.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#now-showing"
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-10 py-4 text-base font-bold uppercase tracking-wider text-black hover:from-amber-400 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-amber-500/25"
          >
            View Current Shows
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto rounded-full border border-white/20 bg-white/5 px-10 py-4 text-base font-semibold uppercase tracking-wider text-white hover:bg-white/10 transition-all duration-300"
          >
            Explore the Theatre
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "127", label: "Years of Legacy" },
            { value: "50+", label: "Shows per Season" },
            { value: "98%", label: "Audience Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-400 font-serif">
                {stat.value}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#now-showing"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-amber-400 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
