import InkanyeziHeroCanvas from "./InkanyeziHeroCanvas";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "hsl(218, 58%, 10%)" }}>
      <InkanyeziHeroCanvas />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(6,14,26,0.52)", zIndex: 1 }} />
      <div className="relative max-w-4xl mx-auto text-center px-6 pt-12 md:pt-16" style={{ zIndex: 10 }}>
        <p className="font-technical text-sm tracking-[0.3em] uppercase text-primary mb-4 animate-fade-in-slow">
          Inkanyezi Technologies
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-slide-up">
          We are the <span className="gradient-gold-text">signal</span> in the noise
        </h1>
        <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-slow">
          In a digital universe defined by chaos and saturation, Inkanyezi Technologies stands as a fixed point of navigation — illuminating the future for South African businesses.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-slow">
          <a href="#contact" className="gradient-gold text-primary-foreground font-sans font-semibold text-base px-8 py-4 rounded-lg hover:opacity-90 transition-opacity glow-gold">Book Discovery Call</a>
          <a href="#demo" className="border border-gold text-foreground font-sans font-medium text-base px-8 py-4 rounded-lg hover:bg-secondary transition-colors">Try Live Demo</a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" style={{ zIndex: 2 }} />
    </section>
  );
};

export default HeroSection;
