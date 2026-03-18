import { Calendar, Clock, Star } from "lucide-react";

const shows = [
  {
    id: "phantom-waltz",
    title: "The Phantom's Waltz",
    genre: "Musical Drama",
    image: "🎭",
    gradient: "from-rose-900/40 to-purple-900/40",
    dates: "Mar 15 – Apr 20",
    time: "7:30 PM",
    rating: 4.9,
    description:
      "A haunting tale of love and obsession set beneath the grand opera house of Vienna.",
    featured: true,
  },
  {
    id: "midnight-paris",
    title: "Midnight in Paris",
    genre: "Romantic Comedy",
    image: "🌹",
    gradient: "from-blue-900/40 to-indigo-900/40",
    dates: "Apr 1 – May 10",
    time: "8:00 PM",
    rating: 4.7,
    description:
      "A whimsical journey through the city of lights, where past and present collide.",
    featured: false,
  },
  {
    id: "last-emperor",
    title: "The Last Emperor",
    genre: "Historical Epic",
    image: "👑",
    gradient: "from-amber-900/40 to-red-900/40",
    dates: "Apr 15 – Jun 1",
    time: "7:00 PM",
    rating: 4.8,
    description:
      "The rise and fall of a dynasty told through breathtaking choreography and song.",
    featured: false,
  },
];

export function NowShowing() {
  return (
    <section id="now-showing" className="relative py-24 bg-[#0d0d0d]" aria-labelledby="now-showing-title">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/5 rounded-full blur-[150px] aria-hidden='true'" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            On Stage Now
          </span>
          <h2 id="now-showing-title" className="mt-3 text-4xl sm:text-5xl font-bold text-white font-serif">
            Now Showing
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" aria-hidden="true" />
        </div>

        {/* Shows Grid */}
        <div className="grid gap-8 md:grid-cols-3" role="list">
          {shows.map((show) => (
            <article
              key={show.id}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1"
              role="listitem"
            >
              {/* Card top gradient area */}
              <div
                className={`relative h-56 bg-gradient-to-br ${show.gradient} flex items-center justify-center`}
                aria-hidden="true"
              >
                <span className="text-7xl group-hover:scale-110 transition-transform duration-500 will-change-transform">
                  {show.image}
                </span>

                {show.featured && (
                  <div className="absolute top-4 left-4 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                    Featured
                  </div>
                )}

                <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                  <span className="text-xs text-white font-medium" aria-label={`Rating: ${show.rating} stars`}>
                    {show.rating}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80">
                    {show.genre}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-white font-serif">
                    {show.title}
                  </h3>
                </div>

                <p className="text-sm text-white/50 leading-relaxed">
                  {show.description}
                </p>

                <div className="flex items-center gap-4 text-white/40 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{show.dates}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{show.time}</span>
                  </div>
                </div>

                <button 
                  className="w-full rounded-full border border-amber-500/30 bg-amber-500/10 py-3 text-sm font-semibold uppercase tracking-wider text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black"
                  aria-label={`Get tickets for ${show.title}`}
                >
                  Get Tickets
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
