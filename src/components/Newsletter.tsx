import { useState, useCallback } from "react";
import { Send, Check, AlertCircle } from "lucide-react";
import { isValidEmail, isNonEmpty } from "@/utils/validation";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Validate email and submit
   * Uses client-side validation (server-side validation required in production)
   */
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Reset previous errors
      setErrorMessage("");

      // Validate input
      if (!isNonEmpty(email)) {
        setErrorMessage("Email address is required");
        return;
      }

      if (!isValidEmail(email)) {
        setErrorMessage("Please enter a valid email address");
        return;
      }

      // Set loading state
      setStatus("loading");

      // Simulate API call (in production, send to backend)
      const timer = setTimeout(() => {
        setStatus("success");
        setEmail("");

        // Reset to idle after 3 seconds
        setTimeout(() => {
          setStatus("idle");
        }, 3000);
      }, 800);

      // Cleanup
      return () => clearTimeout(timer);
    },
    [email]
  );

  return (
    <section className="relative py-24 bg-[#0d0d0d]" aria-label="Newsletter signup">
      {/* Decorative elements */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-900/5 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-12 sm:p-16">
          <span className="text-5xl mb-6 block" aria-hidden="true">
            🎪
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
            Never Miss a Performance
          </h2>
          <p className="mt-4 text-white/50 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive pre-sale access, behind-the-scenes
            content, and special member discounts.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto" noValidate>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Email address"
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? "email-error" : undefined}
                required
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                aria-busy={status === "loading"}
              >
                {status === "loading" && (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                    Subscribing...
                  </>
                )}
                {status === "success" && (
                  <>
                    <Check className="h-4 w-4" />
                    Subscribed!
                  </>
                )}
                {status === "idle" && (
                  <>
                    <Send className="h-4 w-4" />
                    Subscribe
                  </>
                )}
              </button>
            </div>

            {/* Error message */}
            {status === "error" && errorMessage && (
              <div
                id="email-error"
                className="mt-3 flex items-center gap-2 text-red-400 text-sm"
                role="alert"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>

          <p className="mt-4 text-xs text-white/20">
            No spam, unsubscribe anytime. We respect your inbox.
          </p>
        </div>
      </div>
    </section>
  );
}
