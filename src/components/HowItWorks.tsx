import { Phone, Wrench, Rocket, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: Phone,
    title: "Discovery Call",
    time: "30 minutes",
    desc: "We understand your business, pain points, and goals.",
  },
  {
    icon: Wrench,
    title: "Custom Build",
    time: "2 weeks",
    desc: "We architect and build your tailored automation solution.",
  },
  {
    icon: Rocket,
    title: "Launch & Training",
    time: "1 week",
    desc: "Your team gets hands-on training with the new system.",
  },
  {
    icon: TrendingUp,
    title: "Ongoing Optimization",
    time: "Monthly",
    desc: "We monitor performance and improve continuously.",
  },
];

const HowItWorks = () => {
  const ref = useScrollAnimation();
  return (
    <section id="how-it-works" className="section-padding bg-secondary/30">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <p data-animate data-delay="0" className="font-technical text-sm tracking-[0.2em] uppercase text-primary mb-4 text-center">
          Our Process
        </p>
        <h2 data-animate data-delay="100" className="font-serif text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
          From Discovery to <span className="gradient-gold-text">Delivery</span>
        </h2>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0" />
          <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
            {steps.map((s, i) => (
              <div key={i} data-animate data-delay={200 + i * 150} className="relative text-center group">
                <div className="relative z-10 w-16 h-16 rounded-full bg-card border-2 border-gold mx-auto mb-4 flex items-center justify-center group-hover:glow-gold transition-all duration-500">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="font-technical text-xs text-primary tracking-wider uppercase">
                  {s.time}
                </span>
                <h3 className="font-serif text-lg font-semibold text-foreground mt-2 mb-2">
                  {s.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
