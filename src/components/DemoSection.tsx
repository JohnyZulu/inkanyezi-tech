import { useState } from "react";

const DemoSection = () => {
  const [playing, setPlaying] = useState(false);

  const VIDEO_ID = "dkAKSondc8g";
  const EMBED_URL = `https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&color=white&iv_load_policy=3&autoplay=1`;
  const THUMB_URL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

  return (
    <section
      id="demo"
      className="relative py-24 bg-[#0A1628] overflow-hidden"
    >
      {/* Subtle constellation background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Section label */}
        <p className="text-center font-mono text-xs tracking-[0.3em] text-[#F4B942] opacity-70 mb-4 uppercase">
          [ While You Were Living ]
        </p>

        {/* Heading */}
        <h2 className="text-center font-serif text-4xl md:text-5xl text-white font-bold mb-4 leading-tight">
          See Inkanyezi in action.
        </h2>

        {/* Subheading */}
        <p className="text-center text-white/60 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          This is not a demo recording. This is a real system, running live,
          capturing leads and booking clients — while the founder sleeps.
        </p>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#F4B942] opacity-50" />
          <span className="text-[#F4B942] text-lg">✦</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#F4B942] opacity-50" />
        </div>

        {/* Video container */}
        <div className="relative mx-auto max-w-5xl">

          {/* Gold border glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#F4B942]/30 via-transparent to-[#00E5FF]/20 blur-sm" />

          {/* Video wrapper */}
          <div className="relative rounded-2xl overflow-hidden border border-[#F4B942]/20 shadow-2xl shadow-black/60">

            {!playing ? (
              /* Custom thumbnail + play button */
              <div
                className="relative cursor-pointer group"
                onClick={() => setPlaying(true)}
                style={{ paddingBottom: "56.25%", height: 0 }}
              >
                {/* Thumbnail */}
                <img
                  src={THUMB_URL}
                  alt="While You Were Living — Inkanyezi Technologies"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0A1628]/50 group-hover:bg-[#0A1628]/30 transition-colors duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Outer glow ring */}
                    <div className="absolute -inset-4 rounded-full bg-[#F4B942]/20 animate-ping" />
                    {/* Button */}
                    <button
                      className="relative w-20 h-20 rounded-full bg-[#F4B942] flex items-center justify-center shadow-lg shadow-[#F4B942]/40 transition-transform duration-200 group-hover:scale-110"
                      aria-label="Play video"
                    >
                      {/* Play triangle */}
                      <svg
                        className="w-8 h-8 text-[#0A1628] ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-mono px-2 py-1 rounded">
                  3:40
                </div>

                {/* Corner Inkanyezi mark */}
                <div className="absolute top-4 left-4 font-mono text-xs text-[#F4B942]/70 tracking-widest">
                  ✦ INKANYEZI TECHNOLOGIES
                </div>
              </div>
            ) : (
              /* YouTube iframe */
              <div style={{ paddingBottom: "56.25%", position: "relative", height: 0 }}>
                <iframe
                  src={EMBED_URL}
                  title="While You Were Living — Inkanyezi Technologies"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Below video — stats strip */}
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
          {[
            { value: "< 5 MIN", label: "Lead response time" },
            { value: "24/7", label: "Always working" },
            { value: "100%", label: "Automated pipeline" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-[#F4B942] font-serif text-2xl font-bold mb-1">
                {value}
              </p>
              <p className="text-white/40 text-xs font-mono tracking-wider uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/meet"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF6B35] text-white font-bold text-sm tracking-wider uppercase rounded-lg hover:bg-[#FF6B35]/90 transition-all duration-200 shadow-lg shadow-[#FF6B35]/30 hover:shadow-[#FF6B35]/50 hover:-translate-y-0.5"
          >
            <span>Book a Free Consultation</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="mt-3 text-white/30 text-xs font-mono">
            inkanyezitech.co.za/meet · +27 65 880 4122
          </p>
        </div>

      </div>
    </section>
  );
};

export default DemoSection;
