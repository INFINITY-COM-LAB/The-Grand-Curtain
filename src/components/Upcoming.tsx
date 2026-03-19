import { siteConfig } from "../data/siteConfig";

export function Upcoming() {
  const { upcoming } = siteConfig;

  return (
    <section
      id="upcoming"
      className="relative py-24 bg-black"
      aria-labelledby="upcoming-title"
    >
      {/* Decorative elements */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16">
          <h2
            id="upcoming-title"
            className="text-4xl sm:text-5xl font-bold text-white font-serif"
          >
            Coming Soon
          </h2>
          <p className="text-white/50 mt-4">
            Mark your calendar for our upcoming productions
          </p>
        </div>

        {/* Shows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcoming.map((show) => (
            <div
              key={show.id}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-colors"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-[#1a1a1a] aspect-[16/10]">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{show.title}</h3>
                <p className="text-amber-400 text-lg font-semibold">{show.date}</p>

                {/* Hover CTA */}
                <button
                  className="mt-4 rounded-full bg-amber-500 py-2.5 text-sm font-semibold text-black hover:bg-amber-400 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label={`Notify me about ${show.title}`}
                >
                  Notify Me
                </button>
              </div>

              {/* "Coming Soon" badge */}
              <div
                className="absolute top-4 right-4 bg-amber-500 text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                aria-label="Coming Soon"
              >
                Coming Soon
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-6">
            Want to be notified about these shows?
          </p>
          <a
            href="#newsletter"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-10 py-4 text-base font-bold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
          >
            Subscribe to Updates
          </a>
        </div>
      </div>
    </section>
  );
}
