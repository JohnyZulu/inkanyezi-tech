import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

const timelineSteps = [
  { label: "Form submitted", delay: 0 },
  { label: "AI analyzing", delay: 2000 },
  { label: "Lead qualified", delay: 4000 },
  { label: "Notification sent", delay: 5000 },
];

const WEBHOOK_URL = "https://hook.eu1.make.com/79mjaa3s26c6bsr3lpfqmx5nwu5sa489";

const LiveDemo = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [need, setNeed] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const startTimeline = () => {
    setActiveStep(0);
    timelineSteps.forEach((_, i) => {
      if (i > 0) {
        setTimeout(() => setActiveStep(i), timelineSteps[i].delay);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) return;

    setError(null);
    setSending(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim(),
          email: email.trim(),
          phone: phone.trim(),
          enquiry: need.trim(),
          timestamp: new Date().toISOString(),
          source: "Inkanyezi Website",
        }),
      });

      if (response.ok || response.status === 410) {
        setSubmitted(true);
        startTimeline();
      } else {
        setError("Something went wrong. Please try again or call us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setActiveStep(-1);
    setError(null);
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setNeed("");
  };

  return (
    <section id="demo" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <p className="font-technical text-sm tracking-[0.2em] uppercase text-primary mb-4 text-center">
          See It In Action
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-center mb-4">
          Experience It <span className="gradient-gold-text">Yourself</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12 text-lg">
          Try our live demo and see how fast AI automation responds.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="bg-card border border-gold rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-sans text-sm text-foreground mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={submitted}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
                  placeholder="Enter your name"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block font-sans text-sm text-foreground mb-2">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={submitted}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
                  placeholder="Your company name (optional)"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block font-sans text-sm text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitted}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
                  placeholder="your.email@company.com"
                  maxLength={255}
                  required
                />
              </div>
              <div>
                <label className="block font-sans text-sm text-foreground mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={submitted}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
                  placeholder="+27 XX XXX XXXX"
                  maxLength={20}
                />
              </div>
              <div>
                <label className="block font-sans text-sm text-foreground mb-2">What do you need automated?</label>
                <textarea
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                  disabled={submitted}
                  rows={3}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none disabled:opacity-50"
                  placeholder="e.g., Lead capture, customer support..."
                  maxLength={500}
                />
              </div>
              {error && (
                <p className="text-sm text-destructive font-sans">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitted || sending || !name.trim() || !email.trim() || !phone.trim()}
                className="w-full gradient-gold text-primary-foreground font-sans font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {sending ? "Sending..." : "Submit Demo"}
              </button>
            </form>
          </div>

          {/* Timeline */}
          <div className="bg-card border border-gold rounded-xl p-8 min-h-[300px] flex flex-col justify-center">
            {!submitted ? (
              <div className="text-center text-muted-foreground font-sans">
                <p className="text-lg mb-2">⬅ Fill in the form</p>
                <p className="text-sm">Watch the automation timeline unfold in real time.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {timelineSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        i <= activeStep
                          ? "gradient-gold"
                          : "bg-secondary border border-border"
                      }`}
                    >
                      {i <= activeStep ? (
                        <Check className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-sans font-medium transition-colors duration-500 ${
                          i <= activeStep ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </p>
                      {i <= activeStep && (
                        <p className="text-xs text-primary font-technical">
                          {step.delay / 1000}s
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                {activeStep >= timelineSteps.length - 1 && (
                  <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20 animate-fade-in-slow">
                    <p className="font-serif text-foreground font-semibold mb-1">
                      That's automation.
                    </p>
                    <p className="font-sans text-sm text-muted-foreground">
                      In production, your team would already have the notification. Zero human effort required.
                    </p>
                    <button
                      onClick={reset}
                      className="mt-3 font-sans text-sm text-primary hover:underline"
                    >
                      Try again →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
