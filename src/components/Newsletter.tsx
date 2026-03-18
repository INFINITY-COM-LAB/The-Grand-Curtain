import { useState, useRef } from "react";
import { Send, Check, AlertCircle } from "lucide-react";
import { validateEmailWithFeedback, sanitizeEmail } from "@/utils/validation";

interface FormState {
  email: string;
  error: string | null;
  isSubmitting: boolean;
  isSuccess: boolean;
}

export function Newsletter() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    error: null,
    isSubmitting: false,
    isSuccess: false,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const successTimeoutRef = useRef<NodeJS.Timeout>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      email: e.target.value,
      error: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const validation = validateEmailWithFeedback(formState.email);
    if (!validation.valid) {
      setFormState((prev) => ({
        ...prev,
        error: validation.error || "Invalid email",
      }));
      inputRef.current?.focus();
      return;
    }

    // Simulate submission
    setFormState((prev) => ({
      ...prev,
      isSubmitting: true,
      error: null,
    }));

    try {
      // Simulate API call (500ms delay)
      await new Promise((resolve) => setTimeout(resolve, 500));

      const sanitized = sanitizeEmail(formState.email);
      console.log("Newsletter subscription:", sanitized);

      setFormState((prev) => ({
        ...prev,
        email: "",
        isSubmitting: false,
        isSuccess: true,
        error: null,
      }));

      // Auto-hide success message after 3 seconds
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      successTimeoutRef.current = setTimeout(() => {
        setFormState((prev) => ({
          ...prev,
          isSuccess: false,
        }));
      }, 3000);
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: "Subscription failed. Please try again.",
      }));
    }
  };

  const isButtonDisabled = formState.isSubmitting || formState.isSuccess;

  return (
    <section 
      className="relative py-24 bg-[#0d0d0d]"
      aria-labelledby="newsletter-heading"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-900/5 rounded-full blur-[200px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-12 sm:p-16">
          <span className="text-5xl mb-6 block" aria-hidden="true">
            🎪
          </span>
          <h2 
            id="newsletter-heading"
            className="text-3xl sm:text-4xl font-bold text-white font-serif"
          >
            Never Miss a Performance
          </h2>
          <p className="mt-4 text-white/50 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive pre-sale access, behind-the-scenes
            content, and special member discounts.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 max-w-md mx-auto"
            noValidate
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  ref={inputRef}
                  type="email"
                  placeholder="Enter your email"
                  value={formState.email}
                  onChange={handleChange}
                  disabled={formState.isSubmitting}
                  aria-label="Email address for newsletter subscription"
                  aria-describedby={formState.error ? "email-error" : undefined}
                  className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isButtonDisabled}
                aria-busy={formState.isSubmitting}
                aria-label={
                  formState.isSuccess
                    ? "Subscription successful"
                    : "Subscribe to newsletter"
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-500 whitespace-nowrap"
              >
                {formState.isSuccess ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Subscribed!
                  </>
                ) : formState.isSubmitting ? (
                  <>
                    <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Subscribe
                  </>
                )}
              </button>
            </div>

            {/* Error message */}
            {formState.error && (
              <div
                id="email-error"
                className="flex items-center gap-2 text-red-400 text-sm mt-2"
                role="alert"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>{formState.error}</span>
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
