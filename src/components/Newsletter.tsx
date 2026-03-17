import { useState } from "react";
import { Send, Check, AlertCircle } from "lucide-react";

type FormState = "idle" | "success" | "error";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    // Simulate submission (replace with real API call as needed)
    setFormState("success");
    setEmail("");
    setTimeout(() => setFormState("idle"), 4000);
  };

  return (
    <section className="relative py-24 bg-[#0d0d0d]" aria-labelledby="newsletter-heading">
      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-900/5 rounded-full blur-[200px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-12 sm:p-16">
          <span className="text-5xl mb-6 block" aria-hidden="true">🎪</span>

          <h2
            id="newsletter-heading"
            className="text-3xl sm:text-4xl font-bold text-white font-serif"
          >
            Never Miss a Performance
          </h2>

          <p className="mt-4 text-white/50 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive pre-sale access,
            behind-the-scenes content, and special member discounts.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            noValidate
            aria-label="Newsletter subscription form"
          >
            <div className="flex-1 relative">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                disabled={formState === "success"}
                className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-invalid={!!errorMsg}
                aria-describedby={errorMsg ? "newsletter-error" : undefined}
                autoComplete="email"
              />
            </div>

            <button
              type="submit"
              disabled={formState === "success"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black"
              aria-label={formState === "success" ? "Subscribed successfully" : "Subscribe to newsletter"}
            >
              {formState === "success" ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Subscribe
                </>
              )}
            </button>
          </form>

          {/* Error message */}
          {errorMsg && (
            <p
              id="newsletter-error"
              role="alert"
              className="mt-3 flex items-center justify-center gap-1.5 text-sm text-red-400"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              {errorMsg}
            </p>
          )}

          {/* Success message */}
          {formState === "success" && (
            <p
              role="status"
              className="mt-3 text-sm text-amber-400/80 flex items-center justify-center gap-1.5"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              Welcome aboard! Check your inbox for a confirmation.
            </p>
          )}

          <p className="mt-4 text-xs text-white/20">
            No spam, unsubscribe anytime. We respect your inbox.
          </p>
        </div>
      </div>
    </section>
  );
}
