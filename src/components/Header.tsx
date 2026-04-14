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
// INKANYEZI LOGO
// Layout matches original exactly:
//   - Mark (SVG) stacked above INKANYEZI / TECHNOLOGIES text
//   - Logo overflows the nav bar height (by design — same as original img)
//   - Mark: 3 diagonal speed lines + 2 four-pointed stars (bezier curves)
//   - Stars have animated glow/shimmer effect
// ─────────────────────────────────────────────────────────────────────
function InkanyeziLogo({ isDark }: { isDark: boolean }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
      // Allow logo to overflow nav bar, matching original h-[114px] behaviour
      position: 'relative',
    }}>

      {/* ── SVG MARK ── */}
      <svg
        viewBox="0 0 110 108"
        width="88"
        height="88"
        aria-hidden="true"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* Copper/gold gradient — matches brand exactly */}
          <linearGradient id="lg1" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%"   stopColor="#C8833A" />
            <stop offset="35%"  stopColor="#E8A855" />
            <stop offset="65%"  stopColor="#D4742A" />
            <stop offset="100%" stopColor="#A85C20" />
          </linearGradient>

          {/* Brighter highlight gradient for star centres */}
          <radialGradient id="rg1" cx="50%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="#FFE8A0" stopOpacity="1" />
            <stop offset="50%"  stopColor="#F4B942" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C8702A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rg2" cx="50%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="#FFE8A0" stopOpacity="1" />
            <stop offset="50%"  stopColor="#F4B942" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C8702A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── 3 SPEED LINES — thin, diagonal, from top-left ── */}
        {/* These converge toward the upper star, exactly as in the original */}
        <g opacity="0.82">
          {/* Thickest line */}
          <line x1="16" y1="4"  x2="70" y2="46"
            stroke="#D4883A" strokeWidth="1.8" strokeLinecap="round">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/>
          </line>
          {/* Mid line */}
          <line x1="27" y1="1"  x2="80" y2="40"
            stroke="#C8763A" strokeWidth="1.1" strokeLinecap="round">
            <animate attributeName="opacity" values="0.5;0.85;0.5" dur="3s" begin="0.3s" repeatCount="indefinite"/>
          </line>
          {/* Thinnest line */}
          <line x1="36" y1="0"  x2="88" y2="35"
            stroke="#B86830" strokeWidth="0.6" strokeLinecap="round">
            <animate attributeName="opacity" values="0.35;0.65;0.35" dur="3s" begin="0.6s" repeatCount="indefinite"/>
          </line>
        </g>

        {/* ── LOWER / LARGER STAR — 4-pointed, bezier curves ── */}
        {/*
          Centre (48, 80), r_outer=20, r_inner=5
          Tips:  Top(48,60) Right(68,80) Bottom(48,100) Left(28,80)
          Inner: NE(51.5,76.5) SE(51.5,83.5) SW(44.5,83.5) NW(44.5,76.5)
          Using quadratic bezier Q for concave organic waist between arms
        */}
        <g>
          {/* Glow halo */}
          <circle cx="48" cy="80" r="16" fill="url(#rg2)" opacity="0.5">
            <animate attributeName="r"       values="13;19;13" dur="3.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.8s" repeatCount="indefinite"/>
          </circle>

          {/* Star shape */}
          <path
            fill="url(#lg1)"
            d="M 48.00,60.00 Q 51.54,76.46 68.00,80.00 Q 51.54,83.54 48.00,100.00 Q 44.46,83.54 28.00,80.00 Q 44.46,76.46 48.00,60.00 Z"
          >
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3.8s" repeatCount="indefinite"/>
          </path>

          {/* Bright centre shine */}
          <circle cx="48" cy="80" r="4.5" fill="#FFE8B0" opacity="0.9">
            <animate attributeName="r"       values="3.5;5.5;3.5" dur="3.8s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;1;0.8"   dur="3.8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="48" cy="80" r="2" fill="white" opacity="1">
            <animate attributeName="r"       values="1.5;3;1.5" dur="3.8s" repeatCount="indefinite"/>
          </circle>
        </g>

        {/* ── UPPER / SMALLER STAR — 4-pointed, bezier curves ── */}
        {/*
          Centre (72, 40), r_outer=14, r_inner=3
          Tips:  Top(72,26) Right(86,40) Bottom(72,54) Left(58,40)
          Inner: NE(74.1,37.9) SE(74.1,42.1) SW(69.9,42.1) NW(69.9,37.9)
        */}
        <g>
          {/* Glow halo */}
          <circle cx="72" cy="40" r="12" fill="url(#rg1)" opacity="0.55">
            <animate attributeName="r"       values="9;15;9"   dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.45;0.75;0.45" dur="3s" repeatCount="indefinite"/>
          </circle>

          {/* Star shape */}
          <path
            fill="url(#lg1)"
            d="M 72.00,26.00 Q 74.12,37.88 86.00,40.00 Q 74.12,42.12 72.00,54.00 Q 69.88,42.12 58.00,40.00 Q 69.88,37.88 72.00,26.00 Z"
          >
            <animate attributeName="opacity" values="0.88;1;0.88" dur="3s" repeatCount="indefinite"/>
          </path>

          {/* Bright centre shine */}
          <circle cx="72" cy="40" r="3.5" fill="#FFE8B0" opacity="0.95">
            <animate attributeName="r"       values="2.8;4.5;2.8" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="72" cy="40" r="1.6" fill="white" opacity="1">
            <animate attributeName="r"       values="1.2;2.4;1.2" dur="3s" repeatCount="indefinite"/>
          </circle>

          {/* 4-ray cross flare (the "sparkle" effect on the brighter star) */}
          <g opacity="0.55">
            <animate attributeName="opacity" values="0.35;0.7;0.35" dur="3s" repeatCount="indefinite"/>
            <line x1="72" y1="33" x2="72" y2="47" stroke="white" strokeWidth="0.7" strokeLinecap="round"/>
            <line x1="65" y1="40" x2="79" y2="40" stroke="white" strokeWidth="0.7" strokeLinecap="round"/>
          </g>
        </g>
      </svg>

      {/* ── WORDMARK ── */}
      <div style={{ textAlign: 'center', lineHeight: 1, marginTop: '-4px' }}>
        {/* INKANYEZI */}
        <div style={{
          fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
          fontSize: '1.05rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          background: 'linear-gradient(135deg, #E8A030 0%, #D4742A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: '#D4882A',
        }}>
          INKANYEZI
        </div>
        {/* TECHNOLOGIES */}
        <div style={{
          fontFamily: "'Montserrat', 'Arial', sans-serif",
          fontSize: '0.40rem',
          fontWeight: 700,
          letterSpacing: '0.32em',
          color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(10,22,40,0.50)',
          textTransform: 'uppercase' as const,
          marginTop: '3px',
          paddingLeft: '0.32em', // compensate for letter-spacing on last char
        }}>
          TECHNOLOGIES
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// THEME TOGGLE — DARK / LIGHT labels
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
      <button onClick={toggle}
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
    <button onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onTouchEnd={e => { e.preventDefault(); toggle(); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '5px 11px 5px 7px', borderRadius: 24,
        border: dark ? '1.5px solid rgba(244,185,66,0.35)' : '1.5px solid rgba(10,22,40,0.20)',
        background: dark ? 'rgba(10,22,40,0.90)' : 'rgba(255,255,255,0.95)',
        cursor: 'pointer', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        boxShadow: dark ? '0 2px 14px rgba(244,185,66,0.12)' : '0 2px 10px rgba(0,0,0,0.10)',
        transition: 'all 0.3s ease', outline: 'none', flexShrink: 0,
      }}
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
          background: dark ? 'linear-gradient(135deg, #F4B942, #FF6B35)' : '#FFFFFF',
          boxShadow: dark ? '0 0 8px rgba(244,185,66,0.7)' : '0 1px 4px rgba(0,0,0,0.22)',
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
        userSelect: 'none' as const, transition: 'color 0.3s ease',
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
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke={c} strokeWidth="2" strokeLinecap="round">
      {open
        ? <><line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/></>
        : <><line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/></>
      }
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────
const Header = ({ dark, setDark }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  const navColor  = dark ? 'rgba(255,255,255,0.72)' : 'rgba(10,22,40,0.65)';
  const navHover  = dark ? '#F4B942' : '#0A1628';
  const headerBg  = dark ? 'rgba(10,22,40,0.82)' : 'rgba(255,255,255,0.92)';
  const headerBd  = dark ? 'rgba(244,185,66,0.12)' : 'rgba(10,22,40,0.10)';
  const mobileBg  = dark ? 'rgba(8,16,30,0.99)' : 'rgba(255,255,255,0.99)';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@700&family=Space+Mono:wght@700&display=swap');

        /* Desktop: show nav + cta, hide burger */
        .ink-nav    { display: flex !important; }
        .ink-cta    { display: inline-block !important; }
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
          color: #0A1628;
          box-shadow: 0 3px 16px rgba(244,185,66,0.30);
          white-space: nowrap;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          display: inline-block;
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
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        // overflow: visible so logo mark can bleed above/below nav bar
        overflow: 'visible',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 28px',
          // Nav bar height matches original — logo overflows this intentionally
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          overflow: 'visible',
        }}>

          {/* ── LOGO — overflows nav bar like original ── */}
          <a href="#" onClick={closeMobile}
            style={{ textDecoration: 'none', flexShrink: 0, display: 'block', overflow: 'visible' }}>
            <InkanyeziLogo isDark={dark} />
          </a>

          {/* ── DESKTOP NAV ── */}
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

          {/* ── RIGHT: toggle + CTA + mobile burger ── */}
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

        {/* ── MOBILE MENU ── */}
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
                  borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(10,22,40,0.06)'}`,
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
