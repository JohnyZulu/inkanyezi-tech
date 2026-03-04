import { useState, useEffect, useCallback } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "27658804122";
const WHATSAPP_MSG = encodeURIComponent("Hi Sanele, I'd like to learn more about AI automation for my business");

const QUICK_CHIPS = [
  { emoji: "🤖", label: "Show me what you've built" },
  { emoji: "💰", label: "What does it cost?" },
  { emoji: "📅", label: "Book a free demo" },
  { emoji: "💬", label: "Automate my WhatsApp" },
];

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [showDoors, setShowDoors] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [roiInteracted, setRoiInteracted] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null);

  // Proactive popup after 8 seconds
  useEffect(() => {
    if (popupDismissed || open) return;
    const timer = setTimeout(() => setShowPopup(true), 8000);
    return () => clearTimeout(timer);
  }, [popupDismissed, open]);

  // Listen for ROI calculator interaction
  useEffect(() => {
    const handleRoiInteraction = () => {
      if (!open && !popupDismissed) {
        setRoiInteracted(true);
        setShowPopup(true);
      }
    };

    window.addEventListener("roi-calculator-interaction", handleRoiInteraction);
    return () => window.removeEventListener("roi-calculator-interaction", handleRoiInteraction);
  }, [open, popupDismissed]);

  // Bay doors animation
  useEffect(() => {
    if (open) {
      setShowDoors(true);
      setDoorsOpen(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDoorsOpen(true));
      });
      const timer = setTimeout(() => setShowDoors(false), 900);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setShowPopup(false);
    setPopupDismissed(true);
    setShowChips(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleChipClick = useCallback((message: string) => {
    setShowChips(false);
    // Post message to iframe
    if (iframeRef) {
      iframeRef.contentWindow?.postMessage({ type: "send-message", message }, "*");
    }
  }, [iframeRef]);

  const popupMessage = roiInteracted
    ? "I see you just calculated your ROI — want me to show you exactly how we'd recover that amount for your business?"
    : "Sawubona! 👋 Wondering if AI automation is right for your business? I can show you in 2 minutes.";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Proactive popup */}
      {showPopup && !open && (
        <div className="absolute bottom-[8.5rem] right-0 w-72 animate-slide-up">
          <div className="relative rounded-xl border border-accent/20 bg-card p-4 shadow-2xl">
            <button
              onClick={() => { setShowPopup(false); setPopupDismissed(true); }}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="text-sm text-foreground leading-relaxed pr-4">{popupMessage}</p>
            <button
              onClick={handleOpen}
              className="mt-3 w-full text-sm font-semibold py-2 rounded-lg gradient-gold text-primary-foreground hover:scale-[1.02] transition-transform"
            >
              Let's chat →
            </button>
            {/* Speech bubble triangle */}
            <div
              className="absolute -bottom-2 right-6 w-4 h-4 rotate-45 border-r border-b border-accent/20 bg-card"
            />
          </div>
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div className="absolute bottom-24 md:bottom-16 right-0 w-[calc(100vw-3rem)] h-[60vh] md:w-[420px] md:h-[580px] max-h-[calc(100vh-120px)] rounded-xl shadow-2xl overflow-hidden animate-fade-in-slow flex flex-col">
          {/* Quick-reply chips overlay */}
          {showChips && (
            <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-card via-card/95 to-transparent">
              <p className="text-xs text-muted-foreground mb-2 text-center">Quick questions:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => handleChipClick(`${chip.emoji} ${chip.label}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-accent/30 bg-secondary/80 text-foreground hover:border-accent hover:bg-accent/10 transition-all duration-200"
                  >
                    <span>{chip.emoji}</span>
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <iframe
            ref={setIframeRef}
            src="https://inkanyezibot-v2-zttg.vercel.app/embed"
            className="w-full h-full border-0"
            title="Inkanyezi AI Assistant"
          />

          {/* Bay doors animation */}
          {showDoors && (
            <>
              <div
                className="absolute top-0 left-0 w-1/2 h-full z-10"
                style={{
                  backgroundColor: "hsl(218, 58%, 10%)",
                  borderRight: "1px solid hsl(17, 100%, 60%, 0.6)",
                  transform: doorsOpen ? "translateX(-100%)" : "translateX(0)",
                  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              <div
                className="absolute top-0 right-0 w-1/2 h-full z-10"
                style={{
                  backgroundColor: "hsl(218, 58%, 10%)",
                  borderLeft: "1px solid hsl(17, 100%, 60%, 0.6)",
                  transform: doorsOpen ? "translateX(100%)" : "translateX(0)",
                  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </>
          )}
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group block mb-20 md:mb-3 relative"
        aria-label="Chat with Sanele directly on WhatsApp"
      >
        <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        {/* Tooltip */}
        <div className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-card border border-border rounded-lg px-3 py-1.5 text-xs text-foreground shadow-lg">
            Chat with Sanele directly on WhatsApp
          </div>
        </div>
      </a>

      {/* Chat bubble with pulse */}
      <button
        onClick={() => open ? handleClose() : handleOpen()}
        className={`relative w-14 h-14 rounded-full gradient-gold flex items-center justify-center glow-gold hover:scale-110 transition-transform shadow-lg ${
          showPopup && !open ? "animate-chat-pulse" : ""
        }`}
        aria-label="Open chat"
      >
        {open ? (
          <X className="w-6 h-6 text-primary-foreground" />
        ) : (
          <MessageCircle className="w-6 h-6 text-primary-foreground" />
        )}
      </button>
    </div>
  );
};

export default ChatbotWidget;
