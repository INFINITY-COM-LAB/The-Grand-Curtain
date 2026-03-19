import { siteConfig } from "../data/siteConfig";

export function NowShowing() {
  const { nowShowing } = siteConfig;

  return (
    <section
      id="now-showing"
      className="relative py-24 bg-[#0d0d0d]"
      aria-labelledby="now-showing-title"
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16">
          <h2
            id="now-showing-title"
            className="text-4xl sm:text-5xl font-bold text-white font-serif"
          >
            Now Showing
          </h2>
          <p className="text-white/50 mt-4">
            Experience our current season of world-class performances
          </p>
        </div>

        {/* Shows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nowShowing.map((show) => (
            <div
              key={show.id}
              className="group rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-colors bg-[#1a1a1a]"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-[#2a2a2a] aspect-[3/4]">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {show.title}
                </h3>
                <p className="text-amber-400 text-sm font-medium mb-3">
                  {show.composer}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {show.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/10 text-white/70 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <p className="text-sm text-white/60">Duration</p>
                  <p className="text-sm text-white font-medium">{show.duration}</p>
                </div>

                {/* CTA */}
                <button
                  className="w-full mt-4 rounded-full bg-amber-500 py-2.5 text-sm font-semibold text-black hover:bg-amber-400 transition-colors"
                  aria-label={`Book tickets for ${show.title}`}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
