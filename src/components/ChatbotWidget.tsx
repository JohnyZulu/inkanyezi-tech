const ChatbotWidget = () => (
  <iframe
    src="https://inkanyezibot-v2.vercel.app/embed"
    style={{
      position: "fixed",
      bottom: 0,
      right: 0,
      width: 390,
      height: 620,
      border: "none",
      zIndex: 9999,
      background: "none",
    }}
    title="Inkanyezi AI Assistant"
  />
);

export default ChatbotWidget;
