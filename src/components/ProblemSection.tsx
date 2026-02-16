import { Clock, Users, Zap } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Lost leads from slow response times",
    desc: "Every minute of delay costs you potential revenue. Your prospects move on to competitors who respond faster.",
  },
  {
    icon: Users,
    title: "Manual processes eating your team's time",
    desc: "Your best people spend hours on repetitive tasks instead of high-value work that grows your business.",
  },
  {
    icon: Zap,
    title: "Competitors with faster, smarter systems",
    desc: "While you deliberate, your competition is already automating. The gap widens every day.",
  },
];

const ProblemSection = () => (
  <section className="section-padding">
    <div className="max-w-6xl mx-auto">
      <p className="font-technical text-sm tracking-[0.2em] uppercase text-primary mb-4 text-center">
        The Challenge
      </p>
      <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
        Your Customers Expect{" "}
        <span className="gradient-gold-text">Instant Responses</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {problems.map((p, i) => (
          <div
            key={i}
            className="bg-card border border-gold rounded-xl p-8 hover:glow-gold transition-all duration-500 border-gold-hover group"
          >
            <div className="w-14 h-14 rounded-lg gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <p.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{p.title}</h3>
            <p className="font-sans text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
