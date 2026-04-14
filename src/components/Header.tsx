import { useState, useEffect } from "react";

interface HeaderProps {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
}

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
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.78rem', letterSpacing: '0.06em',
          textTransform: 'uppercase' as const, fontWeight: 700,
          color: dark ? GOLD : NAVY,
        }}>
        <span style={{ fontSize: 16 }}>{dark ? '☀️' : '🌙'}</span>
        <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    );
  }

  return (
    <button onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onTouchEnd={e => { e.preventDefault(); toggle(); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 12px 6px 8px', borderRadius: 24,
        border: dark
          ? '1.5px solid rgba(244,185,66,0.38)'
          : '1.5px solid rgba(10,22,40,0.20)',
        background: dark ? 'rgba(10,22,40,0.90)' : 'rgba(255,255,255,0.96)',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        boxShadow: dark
          ? '0 2px 16px rgba(244,185,66,0.14)'
          : '0 2px 12px rgba(10,22,40,0.08)',
        transition: 'all 0.3s ease', outline: 'none', flexShrink: 0,
      }}>
      <div style={{
        position: 'relative', width: 34, height: 18, borderRadius: 9,
        background: dark ? 'rgba(244,185,66,0.16)' : '#DCE2EA',
        border: dark ? '1px solid rgba(244,185,66,0.26)' : '1px solid #C5CDD6',
        transition: 'all 0.3s ease', flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute', top: 2, left: dark ? 15 : 2,
          width: 13, height: 13, borderRadius: '50%',
          background: dark ? `linear-gradient(135deg, ${GOLD}, ${ORANGE})` : '#FFFFFF',
          boxShadow: dark ? `0 0 8px rgba(244,185,66,0.7)` : '0 1px 4px rgba(0,0,0,0.22)',
          transition: 'left 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7,
        }}>
          {dark ? '🌙' : '☀️'}
        </div>
      </div>
      <span style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
        color: dark ? GOLD : NAVY,
        userSelect: 'none' as const, transition: 'color 0.3s ease',
        minWidth: 38, textAlign: 'left' as const,
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
        fontFamily: "'Syne', sans-serif",
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textDecoration: 'none',
        textTransform: 'uppercase' as const,
        padding: '5px 2px',
        whiteSpace: 'nowrap' as const,
        position: 'relative' as const,
        color: hov
          ? GOLD
          : dark
          ? 'rgba(255,255,255,0.72)'
          : 'rgba(10,22,40,0.65)',
        transition: 'color 0.2s ease',
      }}>
      {label}
      <span style={{
        position: 'absolute', bottom: 0, left: 0,
        width: hov ? '100%' : '0%', height: '1.5px',
        background: `linear-gradient(90deg, ${GOLD}, ${ORANGE})`,
        transition: 'width 0.22s ease', borderRadius: '1px', display: 'block',
      }} />
    </a>
  );
}

// ── HAMBURGER ────────────────────────────────────────────────────────
function Hamburger({ open, dark }: { open: boolean; dark: boolean }) {
  const stroke = dark ? GOLD : NAVY;
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="2" strokeLinecap="round">
      {open
        ? <><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></>
        : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
      }
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

  const hdrBg = dark
    ? scrolled ? 'rgba(5,10,22,0.97)'     : 'rgba(10,22,40,0.78)'
    : scrolled ? 'rgba(250,248,244,0.98)'  : 'rgba(255,253,248,0.86)';

  const mobileBg = dark ? 'rgba(5,10,22,0.99)' : 'rgba(250,248,244,0.99)';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Playfair+Display:wght@700&display=swap');

        .ink-nav-d  { display: flex !important; }
        .ink-cta-d  { display: inline-flex !important; }
        .ink-burg   { display: none !important; }

        @media (max-width: 860px) {
          .ink-nav-d { display: none !important; }
          .ink-cta-d { display: none !important; }
          .ink-burg  { display: flex !important; align-items: center; }
        }

        .ink-book {
          font-family: 'Syne', sans-serif;
          font-size: 0.78rem; font-weight: 800; letter-spacing: 0.06em;
          padding: 11px 22px; border-radius: 8px;
          text-decoration: none; text-transform: uppercase;
          background: linear-gradient(135deg, #F4B942 0%, #FF6B35 100%);
          color: #0A1628;
          box-shadow: 0 4px 0 rgba(160,100,8,0.42), 0 6px 20px rgba(244,185,66,0.26);
          white-space: nowrap;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          display: inline-flex; align-items: center;
        }
        .ink-book:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 0 rgba(160,100,8,0.42), 0 10px 28px rgba(244,185,66,0.40);
        }
        .ink-book:active {
          transform: translateY(3px);
          box-shadow: 0 1px 0 rgba(160,100,8,0.42), 0 2px 8px rgba(244,185,66,0.16);
        }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
        background: hdrBg,
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled
          ? dark ? '0 4px 40px rgba(0,0,0,0.50)' : '0 4px 20px rgba(0,0,0,0.07)'
          : 'none',
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
        overflow: 'visible',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '0 28px',
          height: 100,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 20,
          overflow: 'visible',
        }}>

          {/* LOGO */}
          <a href="#" onClick={closeMobile}
            style={{ textDecoration: 'none', flexShrink: 0, display: 'block', overflow: 'visible' }}>
            {/* Dark pill wrapper — logo is white/gold so needs dark bg in light mode */}
            <div style={{
              background: dark ? 'transparent' : 'rgba(10,22,40,0.96)',
              borderRadius: 12,
              padding: dark ? '0' : '6px 10px',
              transition: 'background 0.3s ease',
              display: 'inline-block',
              boxShadow: dark ? 'none' : '0 2px 16px rgba(10,22,40,0.25)',
            }}>
              <img
                src="/inkanyezi-logo-transparent-BRuYXriy.png"
                alt="Inkanyezi Technologies"
                style={{
                  height: '110px',
                  width: 'auto',
                  display: 'block',
                }}
              />
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="ink-nav-d"
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 36 }}>
            {NAV_ITEMS.map(item => (
              <NavLink key={item.href} label={item.label} href={item.href} dark={dark} />
            ))}
          </nav>

          {/* RIGHT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <ThemeToggle dark={dark} setDark={setDark} />
            <a href="#contact" className="ink-cta-d ink-book">Book a Call</a>
            <button className="ink-burg"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 0 }}>
              <Hamburger open={mobileOpen} dark={dark} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div style={{
            background: mobileBg,
            borderTop: dark ? '1px solid rgba(244,185,66,0.10)' : '1px solid rgba(10,22,40,0.08)',
            padding: '6px 28px 24px',
          }}>
            {/* SA flag strip */}
            <div style={{ display: 'flex', height: 3, marginBottom: 14, borderRadius: 2, overflow: 'hidden' }}>
              {['#007A4D','#FFB612','#DE3831','#002395','#FFFFFF','#F4B942'].map((c, i) => (
                <div key={i} style={{ flex: 1, background: c }} />
              ))}
            </div>

            {NAV_ITEMS.map(item => (
              <a key={item.href} href={item.href} onClick={closeMobile}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em',
                  color: dark ? 'rgba(255,255,255,0.82)' : NAVY,
                  textDecoration: 'none', padding: '14px 0',
                  borderBottom: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(10,22,40,0.07)',
                  textTransform: 'uppercase' as const,
                }}>
                <span>{item.label}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke={GOLD} strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                </svg>
              </a>
            ))}

            <div style={{ height: 1, background: 'rgba(244,185,66,0.10)', margin: '12px 0 8px' }} />
            <ThemeToggle dark={dark} setDark={setDark} mobile={true} />

            <a href="#contact" onClick={closeMobile}
              style={{
                display: 'block', textAlign: 'center' as const, marginTop: 14,
                padding: '14px 20px', borderRadius: 8,
                fontFamily: "'Syne', sans-serif",
                fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.06em',
                textDecoration: 'none', textTransform: 'uppercase' as const,
                background: `linear-gradient(135deg, ${GOLD} 0%, ${ORANGE} 100%)`,
                color: NAVY,
                boxShadow: '0 4px 0 rgba(160,100,8,0.35)',
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
