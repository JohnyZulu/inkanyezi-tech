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
// Mark layout (viewBox 0 0 90 95):
//   3 diagonal lines from top-left → upper star
//   Upper star: small, 4-pointed, centre (58,48)
//   Lower star: larger, 4-pointed, centre (38,70)
//   Copper/bronze gradient
//   Wordmark below: INKANYEZI / TECHNOLOGIES
//   Entire logo sized to fit INSIDE nav bar (no overflow)
// ─────────────────────────────────────────────────────────────────────
function InkanyeziLogo({ isDark }: { isDark: boolean }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
    }}>

      {/* SVG mark — fixed size, stays inside nav */}
      <svg
        viewBox="0 0 90 95"
        width="60"
        height="63"
        aria-hidden="true"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* Copper/bronze — matches reference exactly */}
          <linearGradient id="cg" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%"   stopColor="#C07830" />
            <stop offset="35%"  stopColor="#E09848" />
            <stop offset="70%"  stopColor="#C06820" />
            <stop offset="100%" stopColor="#904815" />
          </linearGradient>
          {/* Slightly lighter version for top highlight */}
          <linearGradient id="hl" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#EFB870" />
            <stop offset="100%" stopColor="#D07030" />
          </linearGradient>
          {/* Radial glow for star centres */}
          <radialGradient id="gc1" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FFE8B0" stopOpacity="1" />
            <stop offset="50%"  stopColor="#ECA040" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C06820"  stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gc2" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FFE8B0" stopOpacity="1" />
            <stop offset="50%"  stopColor="#ECA040" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C06820"  stopOpacity="0" />
          </radialGradient>
        </defs>

        {/*
          ── 3 SPEED LINES ──
          Parallel diagonals, from top-left, ending at/near upper star (58,48).
          Computed at 42° from horizontal.
          Line 1 (thickest): M 19.0,7.0  L 59.7,44.0
          Line 2 (medium):   M 17.0,9.2  L 57.7,46.3
          Line 3 (thinnest): M 15.0,11.4 L 55.7,48.5
        */}
        <g>
          <line x1="19.0" y1="7.0"  x2="59.7" y2="44.0"
            stroke="#C07830" strokeWidth="1.5" strokeLinecap="round" opacity="0.88">
            <animate attributeName="opacity" values="0.7;0.95;0.7" dur="3s" repeatCount="indefinite"/>
          </line>
          <line x1="17.0" y1="9.2"  x2="57.7" y2="46.3"
            stroke="#A86020" strokeWidth="0.9" strokeLinecap="round" opacity="0.65">
            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" begin="0.3s" repeatCount="indefinite"/>
          </line>
          <line x1="15.0" y1="11.4" x2="55.7" y2="48.5"
            stroke="#905015" strokeWidth="0.5" strokeLinecap="round" opacity="0.42">
            <animate attributeName="opacity" values="0.28;0.55;0.28" dur="3s" begin="0.6s" repeatCount="indefinite"/>
          </line>
        </g>

        {/*
          ── LOWER STAR (larger) ──
          Centre (38, 70), r_out=17, r_in=3.5
          4-pointed compass shape using quadratic bezier for concave waist.
          Tips:  N(38,53)  E(55,70)  S(38,87)  W(21,70)
          Waist: NE(41.5,66.5) SE(41.5,73.5) SW(34.5,73.5) NW(34.5,66.5)
          Path:  M N Q NE E Q SE S Q SW W Q NW N Z
        */}
        <g>
          {/* Glow halo */}
          <circle cx="38" cy="70" r="14" fill="url(#gc2)" opacity="0.42">
            <animate attributeName="r"       values="11;17;11" dur="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.32;0.58;0.32" dur="4s" repeatCount="indefinite"/>
          </circle>
          {/* Star body */}
          <path fill="url(#cg)"
            d="M 38.0,53.0 Q 41.5,66.5 55.0,70.0 Q 41.5,73.5 38.0,87.0 Q 34.5,73.5 21.0,70.0 Q 34.5,66.5 38.0,53.0 Z">
            <animate attributeName="opacity" values="0.88;1;0.88" dur="4s" repeatCount="indefinite"/>
          </path>
          {/* Highlight overlay on top-left arm (gives the 3D copper look) */}
          <path fill="url(#hl)" opacity="0.35"
            d="M 38.0,53.0 Q 41.5,66.5 55.0,70.0 Q 41.5,73.5 38.0,87.0 Q 34.5,73.5 21.0,70.0 Q 34.5,66.5 38.0,53.0 Z"/>
          {/* Centre glow */}
          <circle cx="38" cy="70" r="4" fill="#FFE8A0" opacity="0.75">
            <animate attributeName="r"       values="3;5.5;3"   dur="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.65;0.95;0.65" dur="4s" repeatCount="indefinite"/>
          </circle>
          {/* White centre dot */}
          <circle cx="38" cy="70" r="1.6" fill="white" opacity="0.95">
            <animate attributeName="r" values="1.2;2.4;1.2" dur="4s" repeatCount="indefinite"/>
          </circle>
        </g>

        {/*
          ── UPPER STAR (smaller) ──
          Centre (58, 48), r_out=12, r_in=2.5
          Tips:  N(58,36)  E(70,48)  S(58,60)  W(46,48)
          Waist: NE(60.5,45.5) SE(60.5,50.5) SW(55.5,50.5) NW(55.5,45.5)
          Path:  M N Q NE E Q SE S Q SW W Q NW N Z
        */}
        <g>
          {/* Glow halo */}
          <circle cx="58" cy="48" r="10" fill="url(#gc1)" opacity="0.48">
            <animate attributeName="r"       values="8;13;8"    dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.38;0.70;0.38" dur="3s" repeatCount="indefinite"/>
          </circle>
          {/* Star body */}
          <path fill="url(#cg)"
            d="M 58.0,36.0 Q 60.5,45.5 70.0,48.0 Q 60.5,50.5 58.0,60.0 Q 55.5,50.5 46.0,48.0 Q 55.5,45.5 58.0,36.0 Z">
            <animate attributeName="opacity" values="0.90;1;0.90" dur="3s" repeatCount="indefinite"/>
          </path>
          {/* Highlight */}
          <path fill="url(#hl)" opacity="0.4"
            d="M 58.0,36.0 Q 60.5,45.5 70.0,48.0 Q 60.5,50.5 58.0,60.0 Q 55.5,50.5 46.0,48.0 Q 55.5,45.5 58.0,36.0 Z"/>
          {/* Centre glow */}
          <circle cx="58" cy="48" r="3.2" fill="#FFE8A0" opacity="0.85">
            <animate attributeName="r"       values="2.5;4.5;2.5" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.75;1;0.75"  dur="3s" repeatCount="indefinite"/>
          </circle>
          {/* White centre dot */}
          <circle cx="58" cy="48" r="1.4" fill="white" opacity="1">
            <animate attributeName="r" values="1.0;2.0;1.0" dur="3s" repeatCount="indefinite"/>
          </circle>
          {/* 4-ray cross flare */}
          <g opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.65;0.3" dur="3s" repeatCount="indefinite"/>
            <line x1="58" y1="42" x2="58" y2="54" stroke="white" strokeWidth="0.6" strokeLinecap="round"/>
            <line x1="52" y1="48" x2="64" y2="48" stroke="white" strokeWidth="0.6" strokeLinecap="round"/>
          </g>
        </g>
      </svg>

      {/* WORDMARK */}
      <div style={{ textAlign: 'center', lineHeight: 1, marginTop: '1px' }}>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '0.88rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          background: 'linear-gradient(135deg, #D08828 0%, #B06018 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: '#D08828',
        }}>
          INKANYEZI
        </div>
        <div style={{
          fontFamily: "'Montserrat', Arial, sans-serif",
          fontSize: '0.36rem',
          fontWeight: 700,
          letterSpacing: '0.28em',
          color: isDark ? 'rgba(255,255,255,0.50)' : 'rgba(10,22,40,0.45)',
          textTransform: 'uppercase' as const,
          marginTop: '2px',
        }}>
          TECHNOLOGIES
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// THEME TOGGLE
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
        }}>
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
      }}>
      <div style={{
        position: 'relative', width: 32, height: 17, borderRadius: 9,
        background: dark ? 'rgba(244,185,66,0.15)' : '#DCE2EA',
        border: dark ? '1px solid rgba(244,185,66,0.25)' : '1px solid #C5CDD6',
        transition: 'all 0.3s ease', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 1.5, left: dark ? 14 : 1.5,
          width: 13, height: 13, borderRadius: '50%',
          background: dark ? 'linear-gradient(135deg, #F4B942, #FF6B35)' : '#FFFFFF',
          boxShadow: dark ? '0 0 8px rgba(244,185,66,0.7)' : '0 1px 4px rgba(0,0,0,0.22)',
          transition: 'left 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7,
        }}>
          {dark ? '🌙' : '☀️'}
        </div>
      </div>
      <span style={{
        fontFamily: "'Space Mono', monospace",
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
        : <><line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/></>}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────
// HEADER
// Nav height: 64px. Logo fits inside — no overflow, no box expansion.
// ─────────────────────────────────────────────────────────────────────
const Header = ({ dark, setDark }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  const navColor = dark ? 'rgba(255,255,255,0.72)' : 'rgba(10,22,40,0.65)';
  const navHover = dark ? '#F4B942' : '#0A1628';
  const headerBg = dark ? 'rgba(10,22,40,0.82)' : 'rgba(255,255,255,0.92)';
  const headerBd = dark ? 'rgba(244,185,66,0.12)' : 'rgba(10,22,40,0.10)';
  const mobileBg = dark ? 'rgba(8,16,30,0.99)' : 'rgba(255,255,255,0.99)';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@700&family=Space+Mono:wght@700&display=swap');

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
          content: ''; position: absolute;
          bottom: 0; left: 0; width: 0; height: 1.5px;
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
        // NO overflow:visible — logo is sized to fit inside
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 24px',
          // Fixed height — logo sized to fit this exactly
          height: 64,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 20,
        }}>

          {/* LOGO — sized to fit inside 64px height */}
          <a href="#" onClick={closeMobile}
            style={{
              textDecoration: 'none', flexShrink: 0,
              display: 'flex', alignItems: 'center',
              // Clip to nav height — no overflow
              overflow: 'hidden',
              height: '64px',
            }}>
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

          {/* RIGHT: toggle + CTA + burger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <ThemeToggle dark={dark} setDark={setDark} />
            <a href="#contact" className="ink-cta ink-book">Book a Call</a>
            <button className="ink-burger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 0 }}>
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
                  borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(10,22,40,0.06)'}`,
                  textTransform: 'uppercase' as const,
                }}>{item.label}</a>
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
              }}>Book a Call</a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
