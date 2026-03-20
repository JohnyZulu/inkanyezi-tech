import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import ROICalculator from "@/components/ROICalculator";
import ChatDemoFixed from "@/components/ChatDemoFixed";
import PhilosophySection from "@/components/PhilosophySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import CustomCursor from "@/components/CustomCursor";
import GlobalStarfield from "@/components/GlobalStarfield";
import ShootingStars from "@/components/ShootingStars";

// ── WHATSAPP WIDGET ───────────────────────────────────────────────────────────
const WhatsAppWidget = () => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes waPulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); }
          70%  { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        @keyframes waFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        @keyframes waTooltipFade {
          from { opacity:0; transform:translateX(8px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .wa-btn {
          animation: waPulse 2.5s ease-out infinite, waFloat 3s ease-in-out infinite;
          transition: all 0.25s ease !important;
        }
        .wa-btn:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 8px 30px rgba(37,211,102,0.6) !important;
          animation: none !important;
        }
        .wa-tooltip {
          animation: waTooltipFade 0.2s ease forwards;
        }
      `}</style>

      <div style={{
        position: 'fixed',
        bottom: 96,
        right: 28,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.8)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}>
        {hovered && (
          <div className="wa-tooltip" style={{
            background: 'linear-gradient(135deg, rgba(10,22,40,0.98), rgba(4,8,15,0.98))',
            border: '1px solid rgba(37,211,102,0.3)',
            borderRadius: 10,
            padding: '8px 14px',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            position: 'relative',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: "'Syne', sans-serif", marginBottom: 2 }}>
              Chat with Sanele
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Mono', monospace" }}>
              +27 65 880 4122
            </div>
            <div style={{
              position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)',
              width: 0, height: 0,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderLeft: '6px solid rgba(37,211,102,0.3)',
            }} />
          </div>
        )}

        <a
          href="https://wa.me/27658804122?text=Sawubona%21%20I%20visited%20Inkanyezi%20Technologies%20and%20would%20like%20to%20know%20more%20about%20AI%20automation%20for%20my%20business."
          target="_blank"
          rel="noopener noreferrer"
          className="wa-btn"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', flexShrink: 0,
          }}
          aria-label="Chat with us on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="28" height="28">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </>
  );
};

// ── INKANYEZIBOT WIDGET ───────────────────────────────────────────────────────
// Uses the FULL page (not embed) so we get the bubble button,
// sliding door animation, proactive greeting, and all cosmic effects.
// The iframe is transparent and covers the full viewport — only the
// floating bubble and chat window are visible (rest is transparent).
const InkanyeziBotWidget = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <iframe
      src="https://inkanyezibot-v2.vercel.app"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        background: 'transparent',
        zIndex: 9000,
        pointerEvents: 'none', // Let clicks pass through to the site
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
      // Re-enable pointer events only over the bot area (bottom-right)
      // This is handled via the iframe's own internal click handling
      allow="clipboard-write microphone"
      title="InkanyeziBot"
      onLoad={() => setLoaded(true)}
    />
  );
};

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <CustomCursor />
      <GlobalStarfield />
      <ShootingStars />

      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <HowItWorks />
          <ROICalculator />
          <ChatDemoFixed />
          <PhilosophySection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      {/* InkanyeziBot — full page iframe with transparent bg */}
      {/* The bubble button + sliding door + greeting all live inside */}
      <InkanyeziBotWidget />

      {/* WhatsApp — sits above bot (z-index 10000) */}
      <WhatsAppWidget />
    </div>
  );
};

export default Index;
