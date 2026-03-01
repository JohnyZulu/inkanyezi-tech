import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-3rem)] h-[70vh] md:w-[420px] md:h-[580px] max-h-[calc(100vh-120px)] rounded-xl shadow-2xl overflow-hidden animate-fade-in-slow">
          <iframe
            src="https://inkanyezibot-v2-zttg.vercel.app/embed"
            className="w-full h-full border-0"
            title="Inkanyezi AI Assistant"
          />
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
