import { useState } from "react";
import { Send, Check, AlertCircle } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { useToast } from "../hooks/useToast";

// Simple email validation regex (RFC 5322 simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  email: string;
  isLoading: boolean;
  isSubmitted: boolean;
  error?: string;
}

export function Newsletter() {
  const { newsletter } = siteConfig;
  const { show: showToast } = useToast();
  
  const [formState, setFormState] = useState<FormState>({
    email: "",
    isLoading: false,
    isSubmitted: false,
  });

  const validateEmail = (email: string): { valid: boolean; error?: string } => {
    const trimmed = email.trim().toLowerCase();

    if (!trimmed) {
      return { valid: false, error: "Email is required" };
    }

    if (trimmed.length > 254) {
      return { valid: false, error: "Email is too long" };
    }

    if (!EMAIL_REGEX.test(trimmed)) {
      return { valid: false, error: "Please enter a valid email address" };
    }

    return { valid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateEmail(formState.email);
    if (!validation.valid) {
      setFormState((prev) => ({
        ...prev,
        error: validation.error,
      }));
      showToast({
        message: validation.error || "Please enter a valid email",
        type: "error",
        duration: 3000,
      });
      return;
    }

    setFormState((prev) => ({
      ...prev,
      isLoading: true,
      error: undefined,
    }));

    try {
      // Simulate API call (replace with real endpoint)
      await new Promise((resolve) => setTimeout(resolve, 800));

      // In a real app, you'd send to a backend:
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: formState.email.trim().toLowerCase() })
      // });
      // if (!response.ok) throw new Error('Failed to subscribe');

      showToast({
        message: "Successfully subscribed! Check your email.",
        type: "success",
        duration: 4000,
      });

      setFormState({
        email: "",
        isLoading: false,
        isSubmitted: true,
        error: undefined,
      });

      setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          isSubmitted: false,
        }));
      }, 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Subscription failed";
      showToast({
        message: errorMessage,
        type: "error",
        duration: 4000,
      });

      setFormState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  return (
    <section 
      id="newsletter"
      className="relative py-24 bg-[#0d0d0d]"
      aria-labelledby="newsletter-title"
    >
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
          <h2 
            id="newsletter-title"
            className="text-3xl sm:text-4xl font-bold text-white font-serif"
          >
            {newsletter.title}
          </h2>
          <p className="mt-4 text-white/50 max-w-md mx-auto">
            {newsletter.subtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            noValidate
          >
            <div className="flex-1 relative">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder={newsletter.placeholder}
                value={formState.email}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    email: e.target.value,
                    error: undefined,
                  }))
                }
                disabled={formState.isLoading}
                aria-invalid={!!formState.error}
                aria-describedby={formState.error ? "email-error" : undefined}
                className={`w-full rounded-full border bg-white/5 px-6 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none transition-all ${
                  formState.error
                    ? "border-red-500/50 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30"
                    : "border-white/10 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                required
              />
              {formState.error && (
                <div
                  id="email-error"
                  className="absolute left-0 top-full mt-2 text-xs text-red-400 flex items-center gap-1"
                  role="alert"
                >
                  <AlertCircle className="h-3 w-3" />
                  {formState.error}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={formState.isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-busy={formState.isLoading}
            >
              {formState.isSubmitted ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Subscribed!
                </>
              ) : formState.isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
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
