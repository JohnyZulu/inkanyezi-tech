import { useState, useEffect } from "react";

const DEMO_SCRIPT = [
  { from: "bot", text: "Sawubona! 👋 I'm InkanyeziBot.\n\nI help South African businesses automate their operations with AI. What brings you here today?" },
  { from: "user", text: "We spend all day answering the same WhatsApp questions." },
  { from: "bot", text: "That's exactly what we solve. Our WhatsApp AI handles 80% of repetitive queries — 24/7, while your team focuses on real work.\n\nWhat industry are you in?" },
  { from: "user", text: "Plumbing supply — about 15 staff in Durban." },
  { from: "bot", text: "Perfect fit! We built this exact solution for Plumbkor in Durban.\n\nShall I show you how they automated their order enquiries and lead qualification? 📊" },
  { from: "user", text: "Yes, I'd love to see that." },
  { from: "bot", text: "Great! Let me book you a free 30-minute discovery call. I just need your name and best contact number 🗓️" },
];

const ChatDemoFixed = () => {
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (shown >= DEMO_SCRIPT.length) {
      const restart = setTimeout(() => setShown(1), 3000);
      return () => clearTimeout(restart);
    }
    const msg = DEMO_SCRIPT[shown];
    const delay = msg.from === "bot" ? 900 : 500;
    if (msg.from === "bot") setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setShown((s) => s + 1);
    }, delay + 1000);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <section id="demo" className="py-20 relative" style={{ background: "#07101f" }}>
      {/* Section separator glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-technical text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-accent">
            Live Demo
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Watch InkanyeziBot{" "}
            <span className="gradient-gold-text">
              Handle a Real Conversation
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
            This is exactly what your customers experience — intelligent, on-brand, always available.
          </p>
        </div>

        {/* Chat window */}
        <div className="max-w-md mx-auto">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #0f1f35, #0a1628)",
              border: "1px solid rgba(249,115,22,0.25)",
              boxShadow: "0 0 60px rgba(249,115,22,0.08), 0 25px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Chrome bar */}
            <div
              className="flex items-center gap-3 px-5 py-3.5"
              style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-primary/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold gradient-gold"
                >
                  ✦
                </div>
                <div>
                  <p className="text-foreground text-xs font-semibold leading-none">InkanyeziBot</p>
                  <p className="text-emerald-400 text-[10px] mt-0.5">● Online now</p>
                </div>
              </div>
              <div
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(249,115,22,0.15)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.2)" }}
              >
                LIVE
              </div>
            </div>

            {/* Messages */}
            <div className="px-4 py-5 space-y-3 min-h-[340px]">
              {DEMO_SCRIPT.slice(0, shown).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  style={{ animation: "fadeSlideUp 0.35s ease forwards" }}
                >
                  <div
                    className="max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line"
                    style={
                      msg.from === "bot"
                        ? {
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#e2e8f0",
                            borderTopLeftRadius: "4px",
                          }
                        : {
                            background: "linear-gradient(135deg, #f97316, #ea580c)",
                            color: "#fff",
                            borderTopRightRadius: "4px",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {[0, 1, 2].map((d) => (
                      <div
                        key={d}
                        className="w-2 h-2 rounded-full bg-accent/80 animate-bounce"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <div className="px-4 pb-4">
              <div
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <span className="text-muted-foreground text-sm flex-1 select-none">Type a message...</span>
                <button
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground text-sm font-bold gradient-gold"
                >
                  ↑
                </button>
              </div>
              <p className="text-center text-muted-foreground text-[10px] mt-2">
                This demo auto-plays a real client scenario
              </p>
            </div>
          </div>

          {/* CTA below chat */}
          <div className="mt-8 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-primary-foreground text-sm transition-all duration-200 gradient-gold glow-gold hover:opacity-90"
            >
              Deploy This for My Business →
            </a>
            <p className="text-muted-foreground text-xs mt-3">Free 30-min discovery call · No commitment</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default ChatDemoFixed;
