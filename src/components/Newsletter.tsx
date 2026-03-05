import { useState } from "react";
import { Send, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="relative py-24 bg-[#0d0d0d]">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-900/5 rounded-full blur-[200px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-12 sm:p-16">
          <span className="text-5xl mb-6 block">🎪</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
            Never Miss a Performance
          </h2>
          <p className="mt-4 text-white/50 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive pre-sale access, behind-the-scenes
            content, and special member discounts.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
            >
              {submitted ? (
                <>
                  <Check className="h-4 w-4" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Subscribe
                </>
              )}
            </button>
          </form>

          <p className="mt-4 text-xs text-white/20">
            No spam, unsubscribe anytime. We respect your inbox.
          </p>
        </div>
      </div>
    </section>
  );
}
