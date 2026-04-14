import { useState, useRef } from "react";
import { Send, LoaderCircle } from "lucide-react";

// ── UNIFIED PIPELINE WEBHOOK ─────────────────────────────────────────────────
// Same webhook as InkanyeziBot lead capture (Make scenario 4975652, active)
// Replaces the old undocumented 79mjaa3... endpoint
const UNIFIED_WEBHOOK = "https://hook.eu1.make.com/f4g89bwx1cor5euqad24pknn2iqbrmum";

// ── INDUSTRY CODE MAP (mirrors route.js) ─────────────────────────────────────
const INDUSTRY_CODES: Record<string, string> = {
  healthcare: "HLTH", trades: "TRAD", "real-estate": "PROP",
  professional: "PROF", construction: "CONS", retail: "RETL",
  technology: "TECH", education: "EDUC", other: "MISC",
};

function generateRef(industry: string): string {
  const code = INDUSTRY_CODES[industry] || "MISC";
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `INK-${code}-${year}-${rand}`;
}

const INDUSTRIES = [
  { value: "healthcare",    label: "Healthcare" },
  { value: "trades",        label: "Plumbing / Trades" },
  { value: "real-estate",   label: "Real Estate" },
  { value: "professional",  label: "Professional Services" },
  { value: "construction",  label: "Construction" },
  { value: "retail",        label: "Retail & Wholesale" },
  { value: "technology",    label: "Technology" },
  { value: "education",     label: "Education & Training" },
  { value: "other",         label: "Other" },
];

const INPUT_CLS =
  "w-full bg-secondary border border-border rounded-lg px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

const ContactSection = () => {
  const sessionId = useRef(`contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", industry: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.name.trim() || !form.email.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const now = new Date();
    const sast = now.toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" });
    const referenceNumber = generateRef(form.industry);

    // Full unified payload — same structure as bot lead capture
    // so Make scenario 4975652 processes it identically
    const payload = {
      // Core contact fields
      name:                 form.name.trim(),
      email:                form.email.trim(),
      phone:                form.phone.trim(),
      company:              form.company.trim(),
      industry:             form.industry,
      service_interest:     "",                     // not collected on static form
      message:              form.message.trim(),

      // Contact availability flags
      has_email:            form.email.trim() ? "true" : "false",
      has_whatsapp:         form.phone.trim() ? "true" : "false",

      // Source & session tracking
      source:               "inkanyezi-contact-page",
      session_id:           sessionId.current,
      message_count:        0,                      // not a bot conversation

      // Conversation context (empty for static form)
      conversation_summary: form.message.trim()
        ? `Contact form enquiry: ${form.message.trim()}`
        : "Direct contact form submission — no chat conversation.",
      pain_point:           form.message.trim(),

      // Qualification (static form = unscored, Gemini will qualify on follow-up)
      qualification_stage:  "new",
      budget_signal:        "",
      trigger_score:        0,
      demo_booked:          false,

      // Reference
      reference_number:     referenceNumber,

      // Timestamps
      timestamp:            now.toISOString(),
      sast_time:            sast,
    };

    try {
      await fetch(UNIFIED_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSubmittedEmail(form.email.trim());
      setSubmitted(true);
      setForm({ name: "", company: "", email: "", phone: "", industry: "", message: "" });
    } catch {
      setError("Something went wrong — please try again or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <p className="font-technical text-sm tracking-[0.2em] uppercase text-primary mb-4 text-center">
          Get Started
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
          Start Your Automation{" "}
          <span className="gradient-gold-text">Journey</span>
        </h2>

        <div className="grid md:grid-cols-5 gap-12">

          {/* ── FORM ── */}
          <div className="md:col-span-3 bg-card border border-gold rounded-xl p-8">
            {submitted ? (
              <div className="text-center py-10 animate-fade-in-slow">
                {/* Icon */}
                <div className="w-16 h-16 gradient-gold rounded-full mx-auto mb-5 flex items-center justify-center shadow-[0_0_28px_rgba(244,185,66,0.4)]">
                  <Send className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Heading */}
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  Enquiry Received!
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Thank you — Sanele will personally follow up within{" "}
                  <span className="text-foreground font-semibold">30 minutes</span> during
                  business hours.
                </p>

                {/* Email callout box */}
                <div
                  className="rounded-xl border border-gold/40 p-5 text-left mb-5"
                  style={{ background: "rgba(244,185,66,0.06)" }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl leading-none mt-0.5">✉️</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-1">
                        Check your inbox now
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        A confirmation email has been sent to{" "}
                        <span className="text-primary font-medium break-all">
                          {submittedEmail || "your email address"}
                        </span>
                        . It contains your reference number and next steps.
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-2">
                        Don't see it? Check your spam / junk folder.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reference badge */}
                <p className="text-xs text-muted-foreground/50 font-mono">
                  Your enquiry is now inside the Inkanyezi pipeline · Durban, KZN [ZA]
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Row 1: Name + Company */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">Name *</label>
                    <input
                      type="text" value={form.name} onChange={set("name")}
                      className={INPUT_CLS} placeholder="Your full name"
                      maxLength={100} required
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">Company</label>
                    <input
                      type="text" value={form.company} onChange={set("company")}
                      className={INPUT_CLS} placeholder="Your company name"
                      maxLength={100}
                    />
                  </div>
                </div>

                {/* Row 2: Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">Email *</label>
                    <input
                      type="email" value={form.email} onChange={set("email")}
                      className={INPUT_CLS} placeholder="you@company.co.za"
                      maxLength={255} required
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">Phone / WhatsApp</label>
                    <input
                      type="tel" value={form.phone} onChange={set("phone")}
                      className={INPUT_CLS} placeholder="+27 XX XXX XXXX"
                      maxLength={20}
                    />
                  </div>
                </div>

                {/* Row 3: Industry */}
                <div>
                  <label className="block font-sans text-sm text-foreground mb-2">Industry</label>
                  <select
                    value={form.industry} onChange={set("industry")}
                    className={INPUT_CLS}
                  >
                    <option value="">Select your industry</option>
                    {INDUSTRIES.map(i => (
                      <option key={i.value} value={i.value}>{i.label}</option>
                    ))}
                  </select>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className="block font-sans text-sm text-foreground mb-2">
                    What's your biggest automation challenge?
                  </label>
                  <textarea
                    value={form.message} onChange={set("message")}
                    className={`${INPUT_CLS} resize-none`}
                    rows={4}
                    placeholder="Tell us what's slowing your business down..."
                    maxLength={1000}
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-gold text-primary-foreground font-sans font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity glow-gold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <><LoaderCircle className="w-4 h-4 animate-spin" />Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" />Start Your Automation Journey</>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground/60">
                  POPIA compliant · Your data is safe with us · Durban, KZN [ZA]
                </p>
              </form>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Get in Touch</h3>
              <p className="font-sans text-sm text-muted-foreground mb-5">
                Sanele Sishange — Founder &amp; CEO
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">📍</span>
                  <p className="font-sans text-muted-foreground">
                    Cato Manor, Mayville, Durban, 4091<br />
                    KwaZulu-Natal, South Africa
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">💬</span>
                  <a
                    href="https://wa.me/27658804122"
                    target="_blank" rel="noopener noreferrer"
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                  >
                    +27 65 880 4122 (WhatsApp)
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-primary">✉️</span>
                  <a
                    href="mailto:inkanyeziaisolutions3@gmail.com"
                    className="font-sans text-muted-foreground hover:text-primary transition-colors break-all"
                  >
                    inkanyeziaisolutions3@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">🕐</span>
                  <div>
                    <p className="font-sans text-muted-foreground">
                      Monday – Friday, 8:00 AM – 5:00 PM (SAST)
                    </p>
                    <p className="font-sans text-sm mt-2 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                      </span>
                      <span className="text-accent">
                        Outside office hours? InkanyeziBot is available 24/7 to answer your questions and book appointments instantly.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-gold rounded-xl p-6">
              <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                Free Discovery Call
              </h4>
              <p className="font-sans text-sm text-muted-foreground mb-4">
                30 minutes to understand your business and map your automation journey.
              </p>
              <a
                href="#contact"
                className="gradient-gold text-primary-foreground font-sans font-semibold text-sm px-6 py-3 rounded-lg inline-block hover:opacity-90 transition-opacity"
              >
                Book Now
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
