import { Radio, Bot, Bell } from "lucide-react";

const solutions = [
  {
    icon: Radio,
    title: "Real-time lead capture & qualification",
    desc: "Every enquiry is instantly captured, categorised, and routed to the right person — no leads slip through the cracks.",
  },
  {
    icon: Bot,
    title: "24/7 AI customer service",
    desc: "An intelligent assistant that handles enquiries, books appointments, and answers FAQs around the clock.",
  },
  {
    icon: Bell,
    title: "Instant notifications to your team",
    desc: "Your sales team gets alerted immediately via WhatsApp, email, or SMS when a hot lead comes in.",
  },
];

const SolutionSection = () => (
  <section className="section-padding bg-secondary/30">
    <div className="max-w-6xl mx-auto">
      <p className="font-technical text-sm tracking-[0.2em] uppercase text-primary mb-4 text-center">
        The Solution
      </p>
      <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-center mb-6">
        AI-Powered Automation That Works{" "}
        <span className="gradient-gold-text">While You Sleep</span>
      </h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 text-lg">
        We build intelligent systems that transform how your business captures, qualifies, and converts leads.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {solutions.map((s, i) => (
          <div key={i} className="text-center group">
            <div className="w-20 h-20 rounded-2xl bg-card border border-gold mx-auto mb-6 flex items-center justify-center group-hover:glow-gold transition-all duration-500">
              <s.icon className="w-9 h-9 text-primary icon-glow" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{s.title}</h3>
            <p className="font-sans text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
