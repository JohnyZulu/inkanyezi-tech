import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-80 h-96 bg-card border border-gold rounded-xl shadow-2xl flex flex-col animate-fade-in-slow overflow-hidden">
          <div className="gradient-gold px-4 py-3 flex items-center justify-between">
            <span className="font-sans font-semibold text-primary-foreground text-sm">
              Inkanyezi AI Assistant
            </span>
            <button onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-6 text-center">
            <div>
              <MessageCircle className="w-10 h-10 text-primary mx-auto mb-3 icon-glow" />
              <p className="font-sans text-sm text-muted-foreground">
                AI chatbot coming soon. Connect your webhook to enable real-time conversations.
              </p>
            </div>
          </div>
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
