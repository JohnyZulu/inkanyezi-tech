import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [showDoors, setShowDoors] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setShowDoors(true);
      setDoorsOpen(false);
      // Trigger animation next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setDoorsOpen(true));
      });
      // Remove doors after animation
      const timer = setTimeout(() => setShowDoors(false), 900);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-3rem)] h-[70vh] md:w-[420px] md:h-[580px] max-h-[calc(100vh-120px)] rounded-xl shadow-2xl overflow-hidden animate-fade-in-slow">
          <iframe
            src="https://inkanyezibot-v2-zttg.vercel.app/embed"
            className="w-full h-full border-0"
            title="Inkanyezi AI Assistant"
          />
          {showDoors && (
            <>
              <div
                className="absolute top-0 left-0 w-1/2 h-full z-10"
                style={{
                  backgroundColor: "#0B1120",
                  borderRight: "1px solid rgba(249,115,22,0.6)",
                  transform: doorsOpen ? "translateX(-100%)" : "translateX(0)",
                  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
              <div
                className="absolute top-0 right-0 w-1/2 h-full z-10"
                style={{
                  backgroundColor: "#0B1120",
                  borderLeft: "1px solid rgba(249,115,22,0.6)",
                  transform: doorsOpen ? "translateX(100%)" : "translateX(0)",
                  transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </>
          )}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full gradient-gold flex items-center justify-center glow-gold hover:scale-110 transition-transform shadow-lg"
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
