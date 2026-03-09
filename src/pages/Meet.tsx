// src/pages/Meet.tsx
// Digital business card for Sanele Sishange

const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Sanele Sishange
N:Sishange;Sanele;;;
ORG:Inkanyezi Technologies
TITLE:Founder & AI Automation Consultant
TEL:+27658804122
EMAIL:inkanyeziaisolutions3@gmail.com
URL:https://inkanyezi-tech.lovable.app
END:VCARD`;

const downloadVCard = () => {
  const blob = new Blob([VCARD], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sanele-inkanyezi.vcf";
  a.click();
  URL.revokeObjectURL(url);
};

const InkanyeziLogo = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="36" y1="14" x2="54" y2="40" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.4"/>
    <line x1="36" y1="14" x2="18" y2="40" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.4"/>
    <line x1="18" y1="40" x2="54" y2="40" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.4"/>
    <line x1="36" y1="14" x2="36" y2="58" stroke="url(#goldGrad)" strokeWidth="0.6" opacity="0.25"/>
    <line x1="18" y1="40" x2="36" y2="58" stroke="url(#goldGrad)" strokeWidth="0.6" opacity="0.25"/>
    <line x1="54" y1="40" x2="36" y2="58" stroke="url(#goldGrad)" strokeWidth="0.6" opacity="0.25"/>
    <circle cx="36" cy="14" r="7" fill="url(#goldGrad)" opacity="0.15"/>
    <path d="M36 7 L37.8 12.2 L43.2 12.2 L38.9 15.4 L40.6 20.6 L36 17.4 L31.4 20.6 L33.1 15.4 L28.8 12.2 L34.2 12.2 Z" fill="url(#goldGrad)"/>
    <circle cx="18" cy="40" r="5.5" fill="url(#goldGrad)" opacity="0.15"/>
    <path d="M18 34.5 L19.4 38.6 L23.7 38.6 L20.3 41.1 L21.6 45.2 L18 42.7 L14.4 45.2 L15.7 41.1 L12.3 38.6 L16.6 38.6 Z" fill="url(#goldGrad)" opacity="0.85"/>
    <circle cx="54" cy="40" r="5.5" fill="url(#goldGrad)" opacity="0.15"/>
    <path d="M54 34.5 L55.4 38.6 L59.7 38.6 L56.3 41.1 L57.6 45.2 L54 42.7 L50.4 45.2 L51.7 41.1 L48.3 38.6 L52.6 38.6 Z" fill="url(#goldGrad)" opacity="0.85"/>
    <circle cx="36" cy="58" r="3.5" fill="url(#goldGrad)" opacity="0.15"/>
    <circle cx="36" cy="58" r="2.5" fill="url(#goldGrad)" opacity="0.7"/>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F4B942"/>
        <stop offset="100%" stopColor="#FF6B35"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function Meet() {
  const handleWhatsApp = () => window.open("https://wa.me/27658804122?text=Hi%20Sanele%2C%20I%27d%20like%20to%20learn%20more%20about%20Inkanyezi%20Technologies.", "_blank");
  const handleWebsite = () => window.open("https://inkanyezi-tech.lovable.app", "_blank");
  const handleChatbot = () => window.open("https://inkanyezi-tech.lovable.app/#chat", "_blank");
  const handleLinkedIn = () => window.open("https://www.linkedin.com/company/inkanyezi-technologies", "_blank");
  const handleEmail = () => window.open("mailto:inkanyeziaisolutions3@gmail.com", "_blank");

  const dots = [[10,15],[85,10],[20,70],[90,60],[50,85],[70,30],[30,45],[60,15],[15,55],[80,80]];

  return (
    <div className="min-h-screen bg-[#060e1a] relative overflow-hidden flex items-center justify-center p-4">

      {/* Constellation background dots */}
      <div className="absolute inset-0 pointer-events-none">
        {dots.map(([x, y], i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/20"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-accent/10 bg-[#0a1628]/80 backdrop-blur-xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="relative h-28 bg-gradient-to-br from-[#0a1628] to-[#111d33] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--accent)),transparent_70%)]" />
            <div className="relative text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-lg font-bold tracking-[0.35em] bg-gradient-to-r from-[#F4B942] to-[#FF6B35] bg-clip-text text-transparent">
                  INKANYEZI
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                <span className="text-[10px] tracking-[0.5em] text-muted-foreground font-light uppercase">
                  TECHNOLOGIES
                </span>
              </div>
            </div>
          </div>

          {/* Logo Avatar */}
          <div className="flex justify-center -mt-10 relative z-20">
            <div className="w-20 h-20 rounded-full border-2 border-accent/30 bg-[#0a1628] flex items-center justify-center shadow-lg shadow-accent/10">
              <InkanyeziLogo />
            </div>
          </div>

          {/* Identity */}
          <div className="text-center mt-4 px-6">
            <h1 className="text-xl font-bold text-foreground">Sanele Sishange</h1>
            <p className="text-sm text-accent mt-1">Founder & AI Automation Consultant</p>
            <p className="text-xs text-muted-foreground mt-1">Durban, KwaZulu-Natal · South Africa</p>
          </div>

          {/* Tagline */}
          <div className="text-center mt-4 px-6">
            <p className="text-sm italic text-muted-foreground/70">
              "We are the signal in the noise"
            </p>
          </div>

          {/* Services */}
          <div className="flex justify-center gap-4 mt-5 px-6">
            {[["⚡", "WhatsApp AI"], ["🤖", "Chatbots"], ["🔄", "Automation"]].map(([icon, s]) => (
              <div key={s} className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-accent/5 border border-accent/10">
                <span className="text-lg">{icon}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{s}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-6 mt-6 border-t border-accent/10" />

          {/* Buttons */}
          <div className="px-6 pt-5 pb-6 space-y-2.5">
            <button
              onClick={downloadVCard}
              className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#F4B942] to-[#FF6B35] text-[#060e1a] hover:opacity-90 transition-opacity"
            >
              👤 Save Contact
            </button>
            <button
              onClick={handleWhatsApp}
              className="w-full py-3 rounded-xl text-sm font-semibold border border-green-500/30 text-green-400 hover:bg-green-500/10 transition-colors"
            >
              💬 Chat on WhatsApp
            </button>
            <button
              onClick={handleWebsite}
              className="w-full py-3 rounded-xl text-sm font-semibold border border-accent/20 text-accent hover:bg-accent/10 transition-colors"
            >
              🌐 Visit Website
            </button>
            <button
              onClick={handleChatbot}
              className="w-full py-3 rounded-xl text-sm font-semibold border border-accent/20 text-accent hover:bg-accent/10 transition-colors"
            >
              🤖 Chat with our AI
            </button>
            <div className="flex gap-2.5">
              <button
                onClick={handleEmail}
                className="flex-1 py-3 rounded-xl text-sm font-semibold border border-accent/20 text-accent hover:bg-accent/10 transition-colors"
              >
                ✉️ Email
              </button>
              <button
                onClick={handleLinkedIn}
                className="flex-1 py-3 rounded-xl text-sm font-semibold border border-accent/20 text-accent hover:bg-accent/10 transition-colors"
              >
                💼 LinkedIn
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground/40 mt-4">
          Inkanyezi Technologies · We are the signal in the noise
        </p>
      </div>
    </div>
  );
}
