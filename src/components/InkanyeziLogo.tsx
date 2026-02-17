const InkanyeziLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="starGoldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8C97A" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
      <linearGradient id="starGoldInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C17F24" />
        <stop offset="50%" stopColor="#D4903A" />
        <stop offset="100%" stopColor="#C17F24" />
      </linearGradient>
      <linearGradient id="streakGold" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
        <stop offset="30%" stopColor="#E8C97A" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#E8C97A" stopOpacity="0.1" />
      </linearGradient>
      <filter id="starGlow">
        <feGaussianBlur stdDeviation="0.8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Granular texture */}
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
        <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="textured" />
      </filter>
    </defs>

    {/* Diagonal streak lines */}
    <line x1="18" y1="72" x2="58" y2="8" stroke="url(#streakGold)" strokeWidth="0.8" />
    <line x1="26" y1="74" x2="66" y2="10" stroke="url(#streakGold)" strokeWidth="0.8" />
    <line x1="34" y1="76" x2="74" y2="12" stroke="url(#streakGold)" strokeWidth="0.8" />

    {/* Bottom-left star — medium */}
    <g filter="url(#starGlow)">
      {/* Outer points */}
      <polygon points="28,52 22,48 28,44 34,48" fill="url(#starGoldOuter)" />
      <polygon points="28,52 24,48 28,44 32,48" fill="url(#starGoldInner)" filter="url(#grain)" />
      {/* Extended points */}
      <polygon points="28,38 27,47 28,44 29,47" fill="url(#starGoldOuter)" />
      <polygon points="28,58 27,49 28,52 29,49" fill="url(#starGoldOuter)" />
      <polygon points="18,48 27,47 22,48 27,49" fill="url(#starGoldOuter)" />
      <polygon points="38,48 29,47 34,48 29,49" fill="url(#starGoldOuter)" />
    </g>

    {/* Center star — largest */}
    <g filter="url(#starGlow)">
      <polygon points="46,38 38,32 46,26 54,32" fill="url(#starGoldOuter)" />
      <polygon points="46,38 40,32 46,26 52,32" fill="url(#starGoldInner)" filter="url(#grain)" />
      <polygon points="46,18 44.5,30 46,26 47.5,30" fill="url(#starGoldOuter)" />
      <polygon points="46,46 44.5,34 46,38 47.5,34" fill="url(#starGoldOuter)" />
      <polygon points="32,32 44,30.5 38,32 44,33.5" fill="url(#starGoldOuter)" />
      <polygon points="60,32 48,30.5 54,32 48,33.5" fill="url(#starGoldOuter)" />
    </g>

    {/* Top-right star — smallest */}
    <g filter="url(#starGlow)">
      <polygon points="58,22 54,19.5 58,17 62,19.5" fill="url(#starGoldOuter)" />
      <polygon points="58,22 55,19.5 58,17 61,19.5" fill="url(#starGoldInner)" filter="url(#grain)" />
      <polygon points="58,12 57,18.5 58,17 59,18.5" fill="url(#starGoldOuter)" />
      <polygon points="58,25 57,20.5 58,22 59,20.5" fill="url(#starGoldOuter)" />
      <polygon points="50,19.5 56.5,18.8 54,19.5 56.5,20.2" fill="url(#starGoldOuter)" />
      <polygon points="66,19.5 59.5,18.8 62,19.5 59.5,20.2" fill="url(#starGoldOuter)" />
    </g>
  </svg>
);

export default InkanyeziLogo;
