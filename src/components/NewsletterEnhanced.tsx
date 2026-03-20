import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useState } from 'react';
import { useEmailSubmit } from '../hooks/useEmailSubmit';
import { useAnalytics } from '../hooks/useAnalytics';

export function NewsletterEnhanced() {
  const [email, setEmail] = useState('');
  const { isLoading, error, success, submitEmail, reset } = useEmailSubmit();
  const { trackEmailSignup, trackEmailError } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await submitEmail(email);
    
    if (success) {
      trackEmailSignup(email);
      setEmail('');
      // Reset success message after 3 seconds
      setTimeout(() => reset(), 3000);
    } else {
      trackEmailError(error || 'Unknown error');
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-[#0d0d0d] to-black">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-amber-900/10 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border border-amber-500/20 bg-black/40 backdrop-blur-sm p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="h-6 w-6 text-amber-400" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              Stay Updated
            </h2>
          </div>

          <p className="text-white/60 mb-8">
            Get exclusive previews, special offers, and theatre news delivered to your inbox. Never miss a show.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) reset();
                }}
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Email address"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm rounded-lg bg-red-500/10 p-3 border border-red-500/20">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm rounded-lg bg-emerald-500/10 p-3 border border-emerald-500/20">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span>Thanks for subscribing! Check your email soon.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !email.trim() || success}
              className="w-full rounded-lg bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-black font-semibold py-3 px-6 transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : success ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Subscribed!
                </>
              ) : (
                'Subscribe to Newsletter'
              )}
            </button>
          </form>

          <p className="text-xs text-white/40 text-center mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
