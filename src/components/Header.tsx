import { useState, useEffect } from "react";

interface HeaderProps {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
}

// Brand tokens
const GOLD   = '#F4B942';
const ORANGE = '#FF6B35';
const NAVY   = '#0A1628';

const NAV_ITEMS = [
  { label: 'Services',     href: '#services'    },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Demo',         href: '#demo'         },
  { label: 'About',        href: '#about'        },
  { label: 'Contact',      href: '#contact'      },
];

// ── THEME TOGGLE ─────────────────────────────────────────────────────
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
          width: '100%', padding: '13px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: "'Space Mono', monospace",
          fontSize: '0.7rem', letterSpacing: '0.1em',
          textTransform: 'uppercase' as const, fontWeight: 700,
          color: dark ? GOLD : NAVY,
        }}>
        <span style={{ fontSize: 17 }}>{dark ? '☀️' : '🌙'}</span>
        <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    );
  }

  return (
    <button onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onTouchEnd={e => { e.preventDefault(); toggle(); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '6px 12px 6px 8px', borderRadius: 24,
        border: dark
          ? '1.5px solid rgba(244,185,66,0.40)'
          : `1.5px solid ${NAVY}30`,
        background: dark
          ? 'rgba(10,22,40,0.92)'
          : `rgba(10,22,40,0.08)`,
        cursor: 'pointer',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        boxShadow: dark
          ? '0 2px 16px rgba(244,185,66,0.15)'
          : `0 2px 12px rgba(10,22,40,0.10)`,
        transition: 'all 0.3s ease', outline: 'none', flexShrink: 0,
      }}>
      {/* Track */}
      <div style={{
        position: 'relative', width: 34, height: 18, borderRadius: 9,
        background: dark ? 'rgba(244,185,66,0.18)' : `rgba(10,22,40,0.15)`,
        border: dark ? '1px solid rgba(244,185,66,0.28)' : `1px solid rgba(10,22,40,0.20)`,
        transition: 'all 0.3s ease', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 2, left: dark ? 15 : 2,
          width: 13, height: 13, borderRadius: '50%',
          background: dark
            ? `linear-gradient(135deg, ${GOLD}, ${ORANGE})`
            : NAVY,
          boxShadow: dark ? `0 0 8px rgba(244,185,66,0.7)` : '0 1px 4px rgba(10,22,40,0.3)',
          transition: 'left 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7,
        }}>
          {dark ? '🌙' : '☀️'}
        </div>
      </div>
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em',
        color: dark ? GOLD : NAVY,
        userSelect: 'none' as const, transition: 'color 0.3s ease',
        minWidth: 34, textAlign: 'left' as const,
      }}>
        {dark ? 'DARK' : 'LIGHT'}
      </span>
    </button>
  );
}

// ── NAV LINK ─────────────────────────────────────────────────────────
function NavLink({ label, href, dark }: { label: string; href: string; dark: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em',
        textDecoration: 'none', textTransform: 'uppercase' as const,
        color: hov
          ? (dark ? GOLD : NAVY)
          : (dark ? 'rgba(255,255,255,0.65)' : 'rgba(10,22,40,0.60)'),
        transition: 'color 0.2s ease',
        position: 'relative' as const, padding: '4px 0',
        whiteSpace: 'nowrap' as const,
      }}>
      {label}
      {/* Gold underline on hover */}
      <span style={{
        position: 'absolute', bottom: 0, left: 0,
        width: hov ? '100%' : '0%', height: '1.5px',
        background: `linear-gradient(90deg, ${GOLD}, ${ORANGE})`,
        transition: 'width 0.22s ease', borderRadius: '1px',
        display: 'block',
      }} />
    </a>
  );
}

// ── HAMBURGER ────────────────────────────────────────────────────────
function Hamburger({ open, dark }: { open: boolean; dark: boolean }) {
  const c = dark ? GOLD : NAVY;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke={c} strokeWidth="2" strokeLinecap="round">
      {open ? (
        <><line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/></>
      ) : (
        <><line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/></>
      )}
    </svg>
  );
}

// ── HEADER ───────────────────────────────────────────────────────────
const Header = ({ dark, setDark }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // ── LIGHT MODE = deep navy background, NOT white ──────────────────
  // This makes the logo and stars visible in both modes
  const hdrBg = dark
    ? scrolled ? 'rgba(5,10,22,0.97)' : 'rgba(10,22,40,0.72)'
    : scrolled ? 'rgba(10,22,40,0.97)' : 'rgba(10,22,40,0.88)';

  const hdrBorder = dark
    ? scrolled ? 'rgba(244,185,66,0.18)' : 'rgba(244,185,66,0.08)'
    : scrolled ? 'rgba(244,185,66,0.25)' : 'rgba(244,185,66,0.12)';

  const mobileBg = 'rgba(5,10,22,0.99)';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap');

        .ink-hdr-nav    { display: flex !important; }
        .ink-hdr-cta    { display: inline-flex !important; }
        .ink-hdr-burger { display: none !important; }

        @media (max-width: 860px) {
          .ink-hdr-nav    { display: none !important; }
          .ink-hdr-cta    { display: none !important; }
          .ink-hdr-burger { display: flex !important; align-items: center; }
        }

        /* Nav accent dot on active */
        .ink-nav-pill:hover { background: rgba(244,185,66,0.08) !important; }

        /* CTA button */
        .ink-cta-btn {
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
          padding: 10px 20px; border-radius: 8px;
          text-decoration: none; text-transform: uppercase;
          background: linear-gradient(135deg, #F4B942 0%, #FF6B35 100%);
          color: #0A1628;
          box-shadow: 0 4px 0 rgba(180,120,10,0.4), 0 4px 20px rgba(244,185,66,0.30);
          white-space: nowrap;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          display: inline-flex; align-items: center;
        }
        .ink-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 0 rgba(180,120,10,0.4), 0 8px 28px rgba(244,185,66,0.45);
        }
        .ink-cta-btn:active {
          transform: translateY(2px);
          box-shadow: 0 2px 0 rgba(180,120,10,0.4), 0 2px 10px rgba(244,185,66,0.20);
        }

        /* Gold shimmer line at bottom of header */
        .ink-hdr-shimmer {
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(244,185,66,0.5), rgba(255,107,53,0.4), rgba(244,185,66,0.5), transparent);
          background-size: 200% 100%;
          animation: hdrShimmer 4s linear infinite;
        }
        @keyframes hdrShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
        background: hdrBg,
        borderBottom: `1px solid ${hdrBorder}`,
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none',
        transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
        // relative for shimmer line
        position: 'fixed' as const,
      }}>
        {/* Bottom shimmer line */}
        <div className="ink-hdr-shimmer" />

        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 28px',
          height: 72, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 20,
          overflow: 'visible',
        }}>

          {/* ── LOGO — always visible on dark nav bg ── */}
          <a href="#" onClick={closeMobile}
            style={{ textDecoration: 'none', flexShrink: 0, display: 'block', overflow: 'visible' }}>
            <img
              src="/lovable-uploads/inkanyezi-logo-transparent.png"
              alt="Inkanyezi Technologies"
              style={{
                height: '128px',
                width: 'auto',
                display: 'block',
                // Logo is white/gold — always visible on dark navy bg
                filter: 'drop-shadow(0 0 8px rgba(244,185,66,0.20))',
                transition: 'filter 0.3s ease',
              }}
            />
          </a>

          {/* ── DESKTOP NAV ── */}
          <nav className="ink-hdr-nav"
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 6 }}>
            {NAV_ITEMS.map(item => (
              <div key={item.href} className="ink-nav-pill"
                style={{
                  borderRadius: 8, padding: '0 4px',
                  transition: 'background 0.2s ease',
                }}>
                <NavLink label={item.label} href={item.href} dark={true} />
              </div>
            ))}
          </nav>

          {/* ── RIGHT ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <ThemeToggle dark={dark} setDark={setDark} />

            <a href="#contact" className="ink-hdr-cta ink-cta-btn">
              Book a Call
            </a>

            {/* Mobile hamburger */}
            <button className="ink-hdr-burger"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 0 }}>
              <Hamburger open={mobileOpen} dark={true} />
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div style={{
            background: mobileBg,
            borderTop: '1px solid rgba(244,185,66,0.15)',
            padding: '8px 28px 24px',
          }}>
            {/* SA flag accent strip */}
            <div style={{
              display: 'flex', height: 3, marginBottom: 16, borderRadius: 2, overflow: 'hidden',
            }}>
              {['#007A4D','#FFB612','#DE3831','#002395','#FFFFFF','#F4B942'].map((c, i) => (
                <div key={i} style={{ flex: 1, background: c }} />
              ))}
            </div>

            {NAV_ITEMS.map(item => (
              <a key={item.href} href={item.href} onClick={closeMobile}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.80)',
                  textDecoration: 'none', padding: '14px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  textTransform: 'uppercase' as const,
                  transition: 'color 0.2s',
                }}>
                <span>{item.label}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke={GOLD} strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                </svg>
              </a>
            ))}

            <div style={{ height: 1, background: 'rgba(244,185,66,0.12)', margin: '12px 0 8px' }} />
            <ThemeToggle dark={dark} setDark={setDark} mobile={true} />

            <a href="#contact" onClick={closeMobile}
              style={{
                display: 'block', textAlign: 'center' as const, marginTop: 14,
                padding: '14px 20px', borderRadius: 8,
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                textDecoration: 'none', textTransform: 'uppercase' as const,
                background: `linear-gradient(135deg, ${GOLD} 0%, ${ORANGE} 100%)`,
                color: NAVY,
                boxShadow: '0 4px 0 rgba(180,120,10,0.35), 0 4px 16px rgba(244,185,66,0.25)',
              }}>
              Book a Call
            </a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
