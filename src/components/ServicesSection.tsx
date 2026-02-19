import { Check, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const packages = [
  {
    name: "Basic Automation",
    setup: "R30,000",
    monthly: "R3,000/month",
    features: [
      "Lead capture automation",
      "Google Sheets CRM",
      "WhatsApp notifications",
      "2-week deployment",
    ],
    highlighted: false,
  },
  {
    name: "Full AI Service",
    setup: "R50,000",
    monthly: "R5,000/month",
    features: [
      "Everything in Basic",
      "AI chatbot (24/7)",
      "Lead qualification with AI",
      "Monthly optimization",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    setup: "R100,000+",
    monthly: "R10,000/month",
    features: [
      "Everything in Full",
      "Custom integrations",
      "Advanced analytics",
      "Dedicated support",
    ],
    highlighted: false,
  },
];

const ServicesSection = () => {
  const ref = useScrollAnimation();
  return (
    <section id="services" className="section-padding">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <p data-animate data-delay="0" className="font-technical text-sm tracking-[0.2em] uppercase text-primary mb-4 text-center">
          Packages
        </p>
        <h2 data-animate data-delay="100" className="font-serif text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
          Choose Your <span className="gradient-gold-text">Path Forward</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <div
              key={i}
              data-animate
              data-delay={200 + i * 150}
              className={`relative rounded-xl p-8 border transition-all duration-500 hover:scale-[1.02] ${
              pkg.highlighted
                ? "gradient-gold text-primary-foreground glow-gold border-transparent"
                : "bg-card border-gold border-gold-hover"
            }`}
          >
            {pkg.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background text-primary font-technical text-xs tracking-wider uppercase px-4 py-1 rounded-full border border-primary flex items-center gap-1">
                <Star className="w-3 h-3" /> Most Popular
              </div>
            )}
            <h3 className={`font-serif text-2xl font-bold mb-2 ${pkg.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
              {pkg.name}
            </h3>
            <div className="mb-6">
              <span className={`text-3xl font-bold font-sans ${pkg.highlighted ? "text-primary-foreground" : "gradient-gold-text"}`}>
                {pkg.setup}
              </span>
              <span className={`text-sm ml-2 ${pkg.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                setup
              </span>
              <p className={`text-sm mt-1 ${pkg.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                + {pkg.monthly}
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              {pkg.features.map((f, fi) => (
                <li key={fi} className="flex items-center gap-3">
                  <Check className={`w-4 h-4 flex-shrink-0 ${pkg.highlighted ? "text-primary-foreground" : "text-primary"}`} />
                  <span className={`font-sans text-sm ${pkg.highlighted ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`block text-center font-sans font-semibold text-sm px-6 py-3 rounded-lg transition-all ${
                pkg.highlighted
                  ? "bg-background text-primary hover:bg-foreground/90"
                  : "gradient-gold text-primary-foreground hover:opacity-90"
              }`}
            >
              Get Started
            </a>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
