import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Eleanor Hartwell",
    role: "Theatre Critic, The Daily Arts",
    quote:
      "The Grand Curtain continues to set the gold standard for live theatre. Their production of The Phantom's Waltz is nothing short of transcendent — a masterclass in staging and emotion.",
    rating: 5,
    avatar: "EH",
  },
  {
    name: "James Whitmore",
    role: "Season Ticket Holder",
    quote:
      "We've been subscribers for 15 years and every season surpasses the last. The intimacy of the venue combined with world-class performances makes every visit magical.",
    rating: 5,
    avatar: "JW",
  },
  {
    name: "Sofia Reyes",
    role: "Performing Arts Professor",
    quote:
      "I bring my students here every semester. The Grand Curtain doesn't just put on shows — they create transformative experiences that remind us why live theatre matters.",
    rating: 5,
    avatar: "SR",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative py-24 bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#0d0d0d]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            Audience Love
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white font-serif">
            Rave Reviews
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        {/* Reviews grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:border-amber-500/20 transition-all duration-300"
            >
              <Quote className="h-8 w-8 text-amber-500/20 mb-4" />

              <p className="text-white/60 leading-relaxed text-sm italic">
                "{review.quote}"
              </p>

              {/* Stars */}
              <div className="flex gap-1 mt-6">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-xs font-bold text-white">
                  {review.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {review.name}
                  </div>
                  <div className="text-xs text-white/40">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
