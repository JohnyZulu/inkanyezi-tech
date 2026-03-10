const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "transparent" }}>
      <div className="relative max-w-4xl 2xl:max-w-6xl mx-auto text-center px-6 pt-12 md:pt-16 2xl:pt-20" style={{ zIndex: 10 }}>
        <p className="font-technical text-sm md:text-base 2xl:text-lg tracking-[0.3em] uppercase text-primary mb-4 2xl:mb-6 animate-fade-in-slow">
          Inkanyezi Technologies
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-foreground leading-tight mb-6 2xl:mb-10 animate-slide-up">
          We are the <span className="gradient-gold-text">signal</span> in the noise
        </h1>
        <p className="font-sans text-lg md:text-xl 2xl:text-2xl text-muted-foreground max-w-2xl 2xl:max-w-3xl mx-auto mb-10 2xl:mb-14 leading-relaxed animate-fade-in-slow">
          In a digital universe defined by chaos and saturation, Inkanyezi Technologies stands as a fixed point of navigation — illuminating the future for South African businesses.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 2xl:gap-6 animate-fade-in-slow">
          <a href="#contact" className="gradient-gold text-primary-foreground font-sans font-semibold text-base 2xl:text-lg px-8 py-4 2xl:px-12 2xl:py-5 rounded-lg hover:opacity-90 transition-opacity glow-gold">Book Discovery Call</a>
          <a href="#demo" className="border border-gold text-foreground font-sans font-medium text-base 2xl:text-lg px-8 py-4 2xl:px-12 2xl:py-5 rounded-lg hover:bg-secondary transition-colors">Try Live Demo</a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" style={{ zIndex: 2 }} />
    </section>
  );
};

export default HeroSection;
