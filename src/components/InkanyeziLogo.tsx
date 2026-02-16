const InkanyeziLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(40, 89%, 61%)" />
        <stop offset="100%" stopColor="hsl(17, 100%, 60%)" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Three star nodes */}
    <circle cx="15" cy="20" r="4" fill="url(#goldGrad)" filter="url(#glow)" />
    <circle cx="30" cy="10" r="5" fill="url(#goldGrad)" filter="url(#glow)" />
    <circle cx="45" cy="20" r="4" fill="url(#goldGrad)" filter="url(#glow)" />
    {/* Connecting lines */}
    <line x1="19" y1="18" x2="25" y2="12" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.6" />
    <line x1="35" y1="12" x2="41" y2="18" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.6" />
    <line x1="19" y1="22" x2="41" y2="22" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.3" />
    {/* Small star points */}
    <circle cx="22" cy="15" r="1" fill="url(#goldGrad)" opacity="0.5" />
    <circle cx="38" cy="15" r="1" fill="url(#goldGrad)" opacity="0.5" />
    <circle cx="30" cy="28" r="1.5" fill="url(#goldGrad)" opacity="0.4" />
    <line x1="15" y1="24" x2="30" y2="28" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.2" />
    <line x1="45" y1="24" x2="30" y2="28" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.2" />
  </svg>
);

export default InkanyeziLogo;
