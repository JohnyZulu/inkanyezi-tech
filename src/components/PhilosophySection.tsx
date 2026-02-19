import { Sparkles, Shield, Target } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const pillars = [
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "The spark that begins the movement. We embrace emerging technologies to solve real business problems.",
  },
  {
    icon: Shield,
    title: "Integrity",
    desc: "The unwavering path we follow. Transparent pricing, honest timelines, and genuine partnerships.",
  },
  {
    icon: Target,
    title: "Impact",
    desc: "The result of our arrival. Measurable outcomes that transform how your business operates.",
  },
];

const PhilosophySection = () => {
  const ref = useScrollAnimation();
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="max-w-5xl mx-auto text-center" ref={ref}>
        <p data-animate data-delay="0" className="font-technical text-sm tracking-[0.2em] uppercase text-primary mb-4">
          Our Philosophy
        </p>
        <h2 data-animate data-delay="100" className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
          The Trinity of <span className="gradient-gold-text">Impact</span>
        </h2>
        <p data-animate data-delay="150" className="text-muted-foreground max-w-2xl mx-auto mb-16 text-lg">
          Rooted in purpose. Named after the stars. Built for South African businesses ready to lead.
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {pillars.map((p, i) => (
            <div key={i} data-animate data-delay={200 + i * 150} className="group">
              <div className="w-20 h-20 rounded-full border-2 border-gold mx-auto mb-6 flex items-center justify-center group-hover:glow-gold transition-all duration-500">
                <p.icon className="w-9 h-9 text-primary icon-glow" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{p.title}</h3>
              <p className="font-sans text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
