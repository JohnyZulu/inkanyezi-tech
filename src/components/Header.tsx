import { useState } from "react";

// ── PROPS ────────────────────────────────────────────────────────────
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

// ── INKANYEZI LOGO — real SVG paths extracted from brand file ────────
// The mark is the double-hourglass/star shape with speed lines.
// Paths are from Inkanyezi_Technologies_2026.svg, scaled to fit 44px height.
// Using gradient fill to match gold→orange brand colours.
function InkanyeziLogo({ isDark }: { isDark: boolean }) {
  // The original mark paths live in a 351×360 viewBox (clip region)
  // We display at height=48, width scales proportionally ≈ 47px
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      {/* Mark */}
      <svg
        viewBox="0 0 351 360"
        height="48"
        width="47"
        aria-hidden="true"
        style={{ flexShrink: 0, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="inkGrad" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%"   stopColor="#F4B942" />
            <stop offset="50%"  stopColor="#E8922A" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
          <filter id="inkGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Main star/hourglass mark — real path from brand SVG */}
        <path
          fill="url(#inkGrad)"
          filter="url(#inkGlow)"
          d="M 307.828125 244.488281 L 350.386719 195.550781 L 301.445312 238.105469 C 285.628906 251.863281 262.09375 251.863281 246.28125 238.105469 L 43.457031 41.664062 L 239.910156 244.488281 C 253.667969 260.304688 253.667969 283.839844 239.910156 299.652344 L 215.535156 327.671875 L 194.738281 305.316406 C 186.621094 295.984375 186.621094 282.105469 194.738281 272.777344 L 219.839844 243.914062 L 190.976562 269.019531 C 181.648438 277.132812 167.769531 277.132812 158.4375 269.019531 L 1.347656 115.6875 L 154.679688 272.785156 C 162.796875 282.113281 162.796875 295.992188 154.679688 305.320312 L 129.574219 334.1875 L 158.4375 309.082031 C 167.769531 300.964844 181.648438 300.964844 190.976562 309.082031 L 213.488281 330.023438 L 197.34375 348.582031 L 215.996094 332.359375 L 244.988281 359.335938 L 218.152344 330.492188 L 246.277344 306.03125 C 262.09375 292.277344 285.628906 292.277344 301.4375 306.03125 L 350.378906 348.589844 L 307.820312 299.652344 C 294.070312 283.832031 294.070312 260.300781 307.828125 244.488281 Z M 312.296875 196.609375 L 286.410156 174.097656 C 278.046875 166.820312 265.597656 166.820312 257.234375 174.097656 L 231.347656 196.609375 L 253.859375 170.722656 C 261.132812 162.359375 261.132812 149.90625 253.859375 141.542969 L 116.359375 0.675781 L 257.226562 138.175781 C 265.589844 145.453125 278.039062 145.453125 286.402344 138.175781 L 312.289062 115.664062 L 289.777344 141.550781 C 282.503906 149.914062 282.503906 162.363281 289.777344 170.726562 Z"
        />
      </svg>

      {/* Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, lineHeight: 1 }}>
        {/* INKANYEZI — Playfair serif, gold gradient */}
        <span style={{
          fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
          fontSize: '1.15rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          background: 'linear-gradient(135deg, #F4B942 0%, #FF6B35 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: '#F4B942', // fallback
        }}>
          INKANYEZI
        </span>
        {/* TECHNOLOGIES — wide extended sans */}
        <span style={{
          fontFamily: "'Montserrat', 'Arial', sans-serif",
          fontSize: '0.44rem',
          fontWeight: 700,
          letterSpacing: '0.3em',
          color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(10,22,40,0.50)',
          textTransform: 'uppercase' as const,
        }}>
          TECHNOLOGIES
        </span>
      </div>
    </div>
  );
}

// ── THEME TOGGLE — DARK / LIGHT with clear labels ────────────────────
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
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          width: '100%',
          padding: '12px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#F4B942',
          fontSize: 13,
          fontFamily: "'Space Mono', monospace",
          letterSpacing: '0.1em',
          textTransform: 'uppercase' as const,
          fontWeight: 700,
        }}
      >
        <span style={{ fontSize: 18 }}>{dark ? '☀️' : '🌙'}</span>
        <span>{dark ? 'Switch to Light' : 'Switch to Dark'}</span>
      </button>
    );
  }

  // Desktop: pill with DARK / LIGHT label + sliding thumb
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        padding: '5px 11px 5px 7px',
        borderRadius: 24,
        border: dark
          ? '1.5px solid rgba(244,185,66,0.35)'
          : '1.5px solid rgba(10,22,40,0.20)',
        background: dark
          ? 'rgba(10,22,40,0.90)'
          : 'rgba(255,255,255,0.95)',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: dark
          ? '0 2px 14px rgba(244,185,66,0.12)'
          : '0 2px 10px rgba(0,0,0,0.10)',
        transition: 'all 0.3s ease',
        outline: 'none',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = dark
          ? '0 2px 20px rgba(244,185,66,0.25)'
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
        position: 'relative',
        width: 32,
        height: 17,
        borderRadius: 9,
        background: dark ? 'rgba(244,185,66,0.15)' : '#DCE2EA',
        border: dark ? '1px solid rgba(244,185,66,0.25)' : '1px solid #C5CDD6',
        transition: 'all 0.3s ease',
        flexShrink: 0,
      }}>
        {/* Thumb */}
        <div style={{
          position: 'absolute',
          top: 1.5,
          left: dark ? 14 : 1.5,
          width: 13,
          height: 13,
          borderRadius: '50%',
          background: dark
            ? 'linear-gradient(135deg, #F4B942, #FF6B35)'
            : '#FFFFFF',
          boxShadow: dark
            ? '0 0 8px rgba(244,185,66,0.7)'
            : '0 1px 4px rgba(0,0,0,0.22)',
          transition: 'left 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 7,
        }}>
          {dark ? '🌙' : '☀️'}
        </div>
      </div>

      {/* Label — DARK or LIGHT */}
      <span style={{
        fontFamily: "'Space Mono', 'Courier New', monospace",
        fontSize: '0.62rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        color: dark ? '#F4B942' : '#0A1628',
        userSelect: 'none' as const,
        transition: 'color 0.3s ease',
        minWidth: 30,
        textAlign: 'left' as const,
      }}>
        {dark ? 'DARK' : 'LIGHT'}
      </span>
    </button>
  );
}

// ── HAMBURGER ICON ───────────────────────────────────────────────────
function MenuIcon({ open, isDark }: { open: boolean; isDark: boolean }) {
  const c = isDark ? '#F4B942' : '#0A1628';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" />
          <line x1="18" y1="4" x2="4" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6"  x2="19" y2="6"  />
          <line x1="3" y1="11" x2="19" y2="11" />
          <line x1="3" y1="16" x2="19" y2="16" />
        </>
      )}
    </svg>
  );
}

// ── HEADER ───────────────────────────────────────────────────────────
const Header = ({ dark, setDark }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  const navLinkColor    = dark ? 'rgba(255,255,255,0.72)' : 'rgba(10,22,40,0.65)';
  const navLinkHover    = dark ? '#F4B942' : '#0A1628';
  const headerBg        = dark ? 'rgba(10,22,40,0.82)' : 'rgba(255,255,255,0.92)';
  const headerBorder    = dark ? 'rgba(244,185,66,0.12)' : 'rgba(10,22,40,0.10)';
  const mobileBg        = dark ? 'rgba(8,16,30,0.99)' : 'rgba(255,255,255,0.99)';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@700&family=Space+Mono:wght@700&display=swap');

        .ink-hdr-nav   { display: flex !important; }
        .ink-hdr-cta   { display: inline-block !important; }
        .ink-hdr-burger { display: none !important; }

        @media (max-width: 860px) {
          .ink-hdr-nav    { display: none !important; }
          .ink-hdr-cta    { display: none !important; }
          .ink-hdr-burger { display: flex !important; align-items: center; }
        }

        .ink-nav-link {
          font-family: 'Space Mono', monospace;
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-decoration: none;
          padding: 4px 0;
          position: relative;
          transition: color 0.2s ease;
          white-space: nowrap;
        }
        .ink-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: linear-gradient(90deg, #F4B942, #FF6B35);
          transition: width 0.22s ease;
          border-radius: 1px;
        }
        .ink-nav-link:hover::after { width: 100%; }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
        background: headerBg,
        borderBottom: `1px solid ${headerBorder}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 28px',
          height: 66, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 20,
        }}>

          {/* ── LOGO ── */}
          <a href="#" onClick={closeMobile} style={{ textDecoration: 'none', flexShrink: 0 }}>
            <InkanyeziLogo isDark={dark} />
          </a>

          {/* ── DESKTOP NAV ── */}
          <nav className="ink-hdr-nav" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 28 }}>
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                className="ink-nav-link"
                style={{ color: navLinkColor }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = navLinkHover}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = navLinkColor}
              >
                {item.label.toUpperCase()}
              </a>
            ))}
          </nav>

          {/* ── RIGHT CONTROLS ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {/* Toggle */}
            <ThemeToggle dark={dark} setDark={setDark} />

            {/* Book a Call CTA */}
            <a
              href="#contact"
              className="ink-hdr-cta"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.07em',
                padding: '10px 18px',
                borderRadius: 6,
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #F4B942 0%, #FF6B35 100%)',
                color: '#0A1628',
                boxShadow: '0 3px 16px rgba(244,185,66,0.30)',
                whiteSpace: 'nowrap',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 5px 26px rgba(244,185,66,0.52)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 3px 16px rgba(244,185,66,0.30)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              Book a Call
            </a>

            {/* Mobile hamburger */}
            <button
              className="ink-hdr-burger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 0 }}
            >
              <MenuIcon open={mobileOpen} isDark={dark} />
            </button>
          </div>
        </div>

        {/* ── MOBILE DROPDOWN ── */}
        {mobileOpen && (
          <div style={{
            background: mobileBg,
            borderTop: `1px solid ${headerBorder}`,
            padding: '8px 28px 24px',
          }}>
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                style={{
                  display: 'block',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: dark ? 'rgba(255,255,255,0.80)' : 'rgba(10,22,40,0.75)',
                  textDecoration: 'none',
                  padding: '13px 0',
                  borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(10,22,40,0.06)'}`,
                  textTransform: 'uppercase' as const,
                }}
              >
                {item.label}
              </a>
            ))}

            <div style={{ height: 1, background: 'rgba(244,185,66,0.15)', margin: '10px 0' }} />

            {/* Mobile theme toggle */}
            <ThemeToggle dark={dark} setDark={setDark} mobile={true} />

            {/* Mobile Book a Call */}
            <a
              href="#contact"
              onClick={closeMobile}
              style={{
                display: 'block',
                textAlign: 'center' as const,
                marginTop: 12,
                padding: '14px 20px',
                borderRadius: 6,
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.07em',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #F4B942 0%, #FF6B35 100%)',
                color: '#0A1628',
              }}
            >
              Book a Call
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
