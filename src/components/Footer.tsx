import { useState } from "react";
import { Mail, Clock, Theater, MessageSquare, X, AlertTriangle } from "lucide-react";

export function Footer() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSampleAlert, setShowSampleAlert] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSampleAlert(true);
  };

  return (
    <>
      <footer id="contact" className="relative bg-black border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Theater className="h-7 w-7 text-amber-400" />
                <div>
                  <div className="text-lg font-bold text-white font-serif">
                    The Grand Curtain
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60">
                    Theatre & Arts
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                This is a <span className="text-amber-400/80 font-semibold">sample landing page</span> showcasing
                a theatre website design. All content, shows, and details are
                fictional and for demonstration purposes only.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Current Season",
                  "Upcoming Shows",
                  "Membership",
                  "Gift Cards",
                  "Group Sales",
                  "Education",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/40 hover:text-amber-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                Contact Us
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-white/40">
                  <Mail className="h-4 w-4 flex-shrink-0 text-amber-400/60" />
                  <a
                    href="mailto:webstitch2026@gmail.com"
                    className="hover:text-amber-400 transition-colors"
                  >
                    webstitch2026@gmail.com
                  </a>
                </div>

                <div className="mt-2 p-3 rounded-xl border border-amber-500/10 bg-amber-500/5">
                  <p className="text-xs text-amber-400/60 leading-relaxed">
                    📌 This is a <span className="font-semibold text-amber-400/80">sample website</span>. 
                    For inquiries about web design & development, reach out via email above.
                  </p>
                </div>

                <button
                  onClick={() => setShowContactForm(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/60 hover:border-amber-500/30 hover:text-amber-400 transition-all mt-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Box Office Hours */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                Box Office Hours
              </h4>
              <div className="space-y-2.5 text-sm text-white/40">
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-400/60" />
                  <div>
                    <div>Mon – Sat: 10 AM – 8 PM</div>
                    <div>Sunday: 12 PM – 6 PM</div>
                    <div className="mt-1 text-amber-400/60 text-xs">
                      Opens 2 hrs before curtain
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {["𝕏", "f", "in", "▶"].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-xs text-white/40 hover:border-amber-500/30 hover:text-amber-400 transition-all"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/20">
              © 2025 The Grand Curtain Theatre — Sample Landing Page. All content is fictional.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Accessibility"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-xs text-white/20 hover:text-white/40 transition-colors"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => {
              setShowContactForm(false);
              setShowSampleAlert(false);
            }}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#1a1a1a] p-8 shadow-2xl">
            <button
              onClick={() => {
                setShowContactForm(false);
                setShowSampleAlert(false);
              }}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {!showSampleAlert ? (
              <>
                <h3 className="text-2xl font-bold text-white font-serif mb-1">
                  Send a Message
                </h3>
                <p className="text-sm text-white/40 mb-6">
                  We'd love to hear from you
                </p>

                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50 mb-1.5 block">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50 mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/50 mb-1.5 block">
                      Message
                    </label>
                    <textarea
                      placeholder="Write your message..."
                      rows={4}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20">
                  <AlertTriangle className="h-8 w-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white font-serif mb-3">
                  Sample Website
                </h3>
                <p className="text-white/50 leading-relaxed max-w-sm mx-auto">
                  This is a <span className="text-amber-400 font-semibold">sample landing page</span> created 
                  for demonstration purposes. The contact form is not functional.
                </p>
                <div className="mt-4 p-3 rounded-xl border border-white/10 bg-white/5">
                  <p className="text-sm text-white/40">
                    For real inquiries, please email:
                  </p>
                  <a
                    href="mailto:webstitch2026@gmail.com"
                    className="text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors"
                  >
                    webstitch2026@gmail.com
                  </a>
                </div>
                <button
                  onClick={() => {
                    setShowContactForm(false);
                    setShowSampleAlert(false);
                  }}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm text-white/60 hover:border-amber-500/30 hover:text-amber-400 transition-all"
                >
                  Got it, close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
