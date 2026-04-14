import { useState } from "react";

interface HeaderProps {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
}

const NAV_ITEMS = [
  { label: 'Services',     href: '#services'    },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Demo',         href: '#demo'         },
  { label: 'About',        href: '#about'        },
  { label: 'Contact',      href: '#contact'      },
];

// ─────────────────────────────────────────────────────────────────────
// INKANYEZI LOGO MARK
// 2 four-pointed stars + 3 diagonal speed lines
// Matches the real brand mark exactly as seen in the live site
// ─────────────────────────────────────────────────────────────────────
function InkanyeziMark() {
  return (
    <>
      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes inkShimmer {
          0%   { stop-color: #F4B942; }
          25%  { stop-color: #FFD980; }
          50%  { stop-color: #FF6B35; }
          75%  { stop-color: #FFD980; }
          100% { stop-color: #F4B942; }
        }
        @keyframes inkPulse1 {
          0%,100% { opacity: 0.85; filter: drop-shadow(0 0 3px #F4B942); }
          50%     { opacity: 1;    filter: drop-shadow(0 0 9px #FFD060) drop-shadow(0 0 18px #FF6B3560); }
        }
        @keyframes inkPulse2 {
          0%,100% { opacity: 0.75; filter: drop-shadow(0 0 2px #F4B942); }
          50%     { opacity: 1;    filter: drop-shadow(0 0 7px #FFD060) drop-shadow(0 0 14px #FF6B3560); }
        }
        @keyframes inkLineFade {
          0%,100% { opacity: 0.55; }
          50%     { opacity: 0.85; }
        }
        @keyframes inkCentreFlare {
          0%,100% { r: 2.5; opacity: 0.9; }
          50%      { r: 4;   opacity: 1;   filter: drop-shadow(0 0 5px #fff); }
        }
      `}</style>

      {/*
        viewBox: 0 0 100 105
        Upper star:  centre at (62, 36), r_outer=24, r_inner=6
        Lower star:  centre at (38, 70), r_outer=17, r_inner=4.5
        3 speed lines running top-left → bottom-right
      */}
      <svg
        viewBox="0 0 100 105"
        width="62"
        height="65"
        aria-hidden="true"
        style={{ flexShrink: 0, overflow: 'visible' }}
      >
        <defs>
          {/* Main gradient — gold→orange */}
          <linearGradient id="mkG" x1="15%" y1="5%" x2="85%" y2="95%">
            <stop offset="0%"   stopColor="#F4B942">
              <animate attributeName="stop-color"
                values="#F4B942;#FFD980;#FF8C42;#F4B942"
                dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%"  stopColor="#E8922A" />
            <stop offset="100%" stopColor="#FF6B35">
              <animate attributeName="stop-color"
                values="#FF6B35;#FF9A60;#FF6B35"
                dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          {/* Lighter version for highlights */}
          <linearGradient id="mkH" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#FFE9A0" />
            <stop offset="100%" stopColor="#FFB060" />
          </linearGradient>

          {/* Radial glow for star centres */}
          <radialGradient id="mkC1" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="40%"  stopColor="#FFE8A0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F4B942"  stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mkC2" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%"  stopColor="#FFE8A0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F4B942"  stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── 3 DIAGONAL SPEED LINES (top-left → bottom-right) ── */}
        {/* These run from upper-left, angled ~45°, through both stars */}
        <g style={{ animation: 'inkLineFade 3s ease-in-out infinite' }}>
          {/* Thickest / brightest line */}
          <line x1="4"  y1="10" x2="74" y2="98"
            stroke="url(#mkG)" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
          {/* Mid line */}
          <line x1="13" y1="3"  x2="83" y2="91"
            stroke="url(#mkG)" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
          {/* Thinnest line */}
          <line x1="22" y1="0"  x2="92" y2="78"
            stroke="url(#mkG)" strokeWidth="0.7" strokeLinecap="round" opacity="0.38" />
        </g>

        {/* ── LOWER / SECONDARY STAR (bottom-left, drawn first so upper is on top) ── */}
        {/*
          Centre: (38, 70), r_outer=17, r_inner=4.5
          4-pointed star points:
          Top:   (38, 53)   Right: (55, 70)   Bottom: (38, 87)   Left: (21, 70)
          Inner corners at 45° with r=4.5:
          NE: (41.2, 66.8)  SE: (41.2, 73.2)  SW: (34.8, 73.2)  NW: (34.8, 66.8)
        */}
        <g style={{ animation: 'inkPulse2 3.5s ease-in-out infinite', animationDelay: '0.8s' }}>
          <path
            fill="url(#mkG)"
            d="M 38,53 L 41.2,66.8 L 55,70 L 41.2,73.2 L 38,87 L 34.8,73.2 L 21,70 L 34.8,66.8 Z"
          />
          {/* Inner highlight */}
          <path
            fill="url(#mkH)"
            opacity="0.35"
            d="M 38,53 L 41.2,66.8 L 55,70 L 41.2,73.2 L 38,87 L 34.8,73.2 L 21,70 L 34.8,66.8 Z"
          />
          {/* Centre glow halo */}
          <circle cx="38" cy="70" r="9" fill="url(#mkC2)" opacity="0.7">
            <animate attributeName="r" values="7;10;7" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3.5s" repeatCount="indefinite" />
          </circle>
          {/* Bright centre dot */}
          <circle cx="38" cy="70" r="2.2" fill="white" opacity="0.95">
            <animate attributeName="r" values="2;3.2;2" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ── UPPER / PRIMARY STAR (top-right, drawn on top) ── */}
        {/*
          Centre: (62, 36), r_outer=24, r_inner=6
          4 tips: Top(62,12) Right(86,36) Bottom(62,60) Left(38,36)
          Inner corners: NE(66.2,31.8) SE(66.2,40.2) SW(57.8,40.2) NW(57.8,31.8)
        */}
        <g style={{ animation: 'inkPulse1 3s ease-in-out infinite' }}>
          <path
            fill="url(#mkG)"
            d="M 62,12 L 66.2,31.8 L 86,36 L 66.2,40.2 L 62,60 L 57.8,40.2 L 38,36 L 57.8,31.8 Z"
          />
          {/* Inner highlight layer */}
          <path
            fill="url(#mkH)"
            opacity="0.4"
            d="M 62,12 L 66.2,31.8 L 86,36 L 66.2,40.2 L 62,60 L 57.8,40.2 L 38,36 L 57.8,31.8 Z"
          />
          {/* Centre glow halo */}
          <circle cx="62" cy="36" r="11" fill="url(#mkC1)" opacity="0.8">
            <animate attributeName="r" values="9;14;9" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Bright centre dot — the "star" shining point */}
          <circle cx="62" cy="36" r="2.8" fill="white" opacity="1">
            <animate attributeName="r" values="2.5;4;2.5" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* 4-ray cross flare on centre */}
          <g opacity="0.7">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
            <line x1="62" y1="29" x2="62" y2="43" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
            <line x1="55" y1="36" x2="69" y2="36" stroke="white" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          </g>
        </g>
      </svg>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// FULL LOGO (mark + wordmark)
// ─────────────────────────────────────────────────────────────────────
function InkanyeziLogo({ isDark }: { isDark: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
      <InkanyeziMark />
      {/* INKANYEZI wordmark */}
      <span style={{
        fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
        fontSize: '1.05rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        lineHeight: 1,
        marginTop: '2px',
        background: 'linear-gradient(135deg, #F4B942 0%, #FF6B35 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: '#F4B942',
      }}>
        INKANYEZI
      </span>
      {/* TECHNOLOGIES subtext */}
      <span style={{
        fontFamily: "'Montserrat', 'Arial', sans-serif",
        fontSize: '0.42rem',
        fontWeight: 700,
        letterSpacing: '0.28em',
        lineHeight: 1,
        marginTop: '3px',
        color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(10,22,40,0.45)',
        textTransform: 'uppercase' as const,
      }}>
        TECHNOLOGIES
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// THEME TOGGLE — DARK / LIGHT
// ─────────────────────────────────────────────────────────────────────
function ThemeToggle({ dark, setDark, mobile = false }: {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
  mobile?: boolean;
}) {
  const toggle = () => {
    setDark(d => {
      const next = !d;
      localStorage.setItem('ink_site_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  if (mobile) {
    return (
      <button
        onClick={toggle}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', padding: '12px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#F4B942', fontSize: 13,
          fontFamily: "'Space Mono', monospace",
          letterSpacing: '0.1em', textTransform: 'uppercase' as const, fontWeight: 700,
        }}
      >
        <span style={{ fontSize: 18 }}>{dark ? '☀️' : '🌙'}</span>
        <span>{dark ? 'Switch to Light' : 'Switch to Dark'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '5px 11px 5px 7px',
        borderRadius: 24,
        border: dark
          ? '1.5px solid rgba(244,185,66,0.35)'
          : '1.5px solid rgba(10,22,40,0.20)',
        background: dark ? 'rgba(10,22,40,0.90)' : 'rgba(255,255,255,0.95)',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: dark
          ? '0 2px 14px rgba(244,185,66,0.12)'
          : '0 2px 10px rgba(0,0,0,0.10)',
        transition: 'all 0.3s ease',
        outline: 'none', flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = dark
          ? '0 2px 20px rgba(244,185,66,0.28)'
          : '0 2px 16px rgba(0,0,0,0.18)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = dark
          ? '0 2px 14px rgba(244,185,66,0.12)'
          : '0 2px 10px rgba(0,0,0,0.10)';
      }}
      onTouchEnd={e => { e.preventDefault(); toggle(); }}
    >
      {/* Sliding track */}
      <div style={{
        position: 'relative', width: 32, height: 17, borderRadius: 9,
        background: dark ? 'rgba(244,185,66,0.15)' : '#DCE2EA',
        border: dark ? '1px solid rgba(244,185,66,0.25)' : '1px solid #C5CDD6',
        transition: 'all 0.3s ease', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 1.5,
          left: dark ? 14 : 1.5,
          width: 13, height: 13, borderRadius: '50%',
          background: dark
            ? 'linear-gradient(135deg, #F4B942, #FF6B35)'
            : '#FFFFFF',
          boxShadow: dark
            ? '0 0 8px rgba(244,185,66,0.7)'
            : '0 1px 4px rgba(0,0,0,0.22)',
          transition: 'left 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7,
        }}>
          {dark ? '🌙' : '☀️'}
        </div>
      </div>
      {/* Label */}
      <span style={{
        fontFamily: "'Space Mono', 'Courier New', monospace",
        fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em',
        color: dark ? '#F4B942' : '#0A1628',
        userSelect: 'none' as const,
        transition: 'color 0.3s ease',
        minWidth: 32, textAlign: 'left' as const,
      }}>
        {dark ? 'DARK' : 'LIGHT'}
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────
// HAMBURGER
// ─────────────────────────────────────────────────────────────────────
function MenuIcon({ open, isDark }: { open: boolean; isDark: boolean }) {
  const c = isDark ? '#F4B942' : '#0A1628';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      {open ? (
        <><line x1="4" y1="4" x2="18" y2="18" /><line x1="18" y1="4" x2="4" y2="18" /></>
      ) : (
        <><line x1="3" y1="6" x2="19" y2="6" /><line x1="3" y1="11" x2="19" y2="11" /><line x1="3" y1="16" x2="19" y2="16" /></>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────
const Header = ({ dark, setDark }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  const navColor    = dark ? 'rgba(255,255,255,0.72)' : 'rgba(10,22,40,0.65)';
  const navHover    = dark ? '#F4B942' : '#0A1628';
  const headerBg    = dark ? 'rgba(10,22,40,0.82)' : 'rgba(255,255,255,0.92)';
  const headerBd    = dark ? 'rgba(244,185,66,0.12)' : 'rgba(10,22,40,0.10)';
  const mobileBg    = dark ? 'rgba(8,16,30,0.99)' : 'rgba(255,255,255,0.99)';
  const mobileDivider = dark ? 'rgba(255,255,255,0.05)' : 'rgba(10,22,40,0.06)';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@700&family=Space+Mono:wght@700&display=swap');
        .ink-nav   { display: flex !important; }
        .ink-cta   { display: inline-block !important; }
        .ink-burger { display: none !important; }
        @media (max-width: 860px) {
          .ink-nav    { display: none !important; }
          .ink-cta    { display: none !important; }
          .ink-burger { display: flex !important; align-items: center; }
        }
        .ink-nl {
          font-family: 'Space Mono', monospace;
          font-size: 0.64rem; font-weight: 700;
          letter-spacing: 0.1em; text-decoration: none;
          padding: 4px 0; position: relative;
          transition: color 0.2s ease; white-space: nowrap;
        }
        .ink-nl::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #F4B942, #FF6B35);
          transition: width 0.22s ease; border-radius: 1px;
        }
        .ink-nl:hover::after { width: 100%; }
        .ink-book {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.07em;
          padding: 10px 18px; border-radius: 6px; text-decoration: none;
          background: linear-gradient(135deg, #F4B942 0%, #FF6B35 100%);
          color: #0A1628; box-shadow: 0 3px 16px rgba(244,185,66,0.30);
          white-space: nowrap; transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .ink-book:hover {
          box-shadow: 0 5px 26px rgba(244,185,66,0.52);
          transform: translateY(-1px);
        }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
        background: headerBg,
        borderBottom: `1px solid ${headerBd}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 28px',
          height: 72,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 20,
        }}>

          {/* LOGO */}
          <a href="#" onClick={closeMobile}
            style={{ textDecoration: 'none', flexShrink: 0, display: 'block' }}>
            <InkanyeziLogo isDark={dark} />
          </a>

          {/* DESKTOP NAV */}
          <nav className="ink-nav"
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 28 }}>
            {NAV_ITEMS.map(item => (
              <a key={item.href} href={item.href}
                className="ink-nl"
                style={{ color: navColor }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = navHover}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = navColor}
              >
                {item.label.toUpperCase()}
              </a>
            ))}
          </nav>

          {/* RIGHT: toggle + CTA + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <ThemeToggle dark={dark} setDark={setDark} />
            <a href="#contact" className="ink-cta ink-book">Book a Call</a>
            <button
              className="ink-burger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 0 }}
            >
              <MenuIcon open={mobileOpen} isDark={dark} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div style={{
            background: mobileBg,
            borderTop: `1px solid ${headerBd}`,
            padding: '8px 28px 24px',
          }}>
            {NAV_ITEMS.map(item => (
              <a key={item.href} href={item.href} onClick={closeMobile}
                style={{
                  display: 'block',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                  color: dark ? 'rgba(255,255,255,0.80)' : 'rgba(10,22,40,0.75)',
                  textDecoration: 'none', padding: '13px 0',
                  borderBottom: `1px solid ${mobileDivider}`,
                  textTransform: 'uppercase' as const,
                }}
              >{item.label}</a>
            ))}
            <div style={{ height: 1, background: 'rgba(244,185,66,0.15)', margin: '10px 0' }} />
            <ThemeToggle dark={dark} setDark={setDark} mobile={true} />
            <a href="#contact" onClick={closeMobile}
              style={{
                display: 'block', textAlign: 'center' as const,
                marginTop: 12, padding: '14px 20px', borderRadius: 6,
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.07em',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #F4B942 0%, #FF6B35 100%)',
                color: '#0A1628',
              }}
            >Book a Call</a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
