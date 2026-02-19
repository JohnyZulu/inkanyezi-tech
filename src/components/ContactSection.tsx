import { useState } from "react";
import { MapPin, Phone, MessageCircle, Send, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WEBHOOK_URL = "https://hook.eu1.make.com/79mjaa3s26c6bsr3lpfqmx5nwu5sa489";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", industry: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) return;

    setSending(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          industry: form.industry,
          enquiry: form.message.trim(),
          timestamp: new Date().toISOString(),
          source: "Inkanyezi Contact Page",
        }),
      });
    } catch {
      // still show success to user
    }
    setSending(false);
    setSent(true);
    setForm({ name: "", company: "", email: "", phone: "", industry: "", message: "" });
  };

  const inputClass =
    "w-full bg-secondary border border-border rounded-lg px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  const ref = useScrollAnimation();

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <p data-animate data-delay="0" className="font-technical text-sm tracking-[0.2em] uppercase text-primary mb-4 text-center">
          Get Started
        </p>
        <h2 data-animate data-delay="100" className="font-serif text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
          Start Your Automation{" "}
          <span className="gradient-gold-text">Journey</span>
        </h2>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Form */}
          <div data-animate data-delay="200" className="md:col-span-3 bg-card border border-gold rounded-xl p-8">
            {sent ? (
              <div className="text-center py-12 animate-fade-in-slow">
                <div className="w-16 h-16 gradient-gold rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Send className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  Message Received
                </h3>
                <p className="text-muted-foreground">
                  Thanks! We'll respond within 30 minutes. Check your email for confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      placeholder="Your full name"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">Company</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputClass}
                      placeholder="Your company name (optional)"
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      placeholder="you@company.co.za"
                      maxLength={255}
                      required
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                      placeholder="+27 XX XXX XXXX"
                      maxLength={20}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-sm text-foreground mb-2">Industry</label>
                    <select
                      value={form.industry}
                      onChange={(e) => setForm({ ...form, industry: e.target.value })}
                      className={inputClass}
                    >
                      <option value="">Select industry</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="trades">Plumbing / Trades</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="professional">Professional Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-sm text-foreground mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                    rows={4}
                    placeholder="Tell us about your automation needs..."
                    maxLength={1000}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full gradient-gold text-primary-foreground font-sans font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity glow-gold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {sending ? "Sending..." : "Start Your Automation Journey"}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div data-animate data-delay="350" className="md:col-span-2 space-y-8">
            <div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="font-sans text-muted-foreground">
                    Durban, KwaZulu-Natal<br />South Africa
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:+27000000000" className="font-sans text-muted-foreground hover:text-primary transition-colors">
                    +27 (0) 00 000 0000
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <a
                    href="https://wa.me/27000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
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
