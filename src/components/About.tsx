import { siteConfig } from "../data/siteConfig";

export function About() {
  const { about } = siteConfig;

  return (
    <section
      id="about"
      className="relative py-24 bg-[#0d0d0d]"
      aria-labelledby="about-title"
    >
      {/* Decorative elements */}
      <div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[150px] -translate-y-1/2"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16">
          <h2
            id="about-title"
            className="text-4xl sm:text-5xl font-bold text-white font-serif mb-6"
          >
            {about.title}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
            {about.description}
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {about.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-8 hover:border-amber-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="h-2 w-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                <p className="text-white/80 leading-relaxed">{highlight}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-3xl border border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-red-900/5 p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to experience the magic?
          </h3>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Book your tickets today and join us for an unforgettable evening of theatre.
          </p>
          <a
            href="#now-showing"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-10 py-4 text-base font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
          >
            Browse Shows
          </a>
        </div>
      </div>
    </section>
  );
}
