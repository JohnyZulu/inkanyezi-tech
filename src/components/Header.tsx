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
          display: 'flex', alignItems: 'center', gap: 8,
          width: '100%', padding: '12px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#F4B942', fontSize: 13,
          fontFamily: 'Montserrat, sans-serif',
          letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 600,
        }}
      >
        <span style={{ fontSize: 16 }}>{dark ? '☀️' : '🌙'}</span>
        <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onTouchEnd={e => { e.preventDefault(); toggle(); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '5px 11px 5px 7px', borderRadius: 24,
        border: dark
          ? '1.5px solid rgba(244,185,66,0.35)'
          : '1.5px solid rgba(10,22,40,0.20)',
        background: dark ? 'rgba(10,22,40,0.90)' : 'rgba(255,255,255,0.95)',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        boxShadow: dark
          ? '0 2px 14px rgba(244,185,66,0.12)'
          : '0 2px 10px rgba(0,0,0,0.10)',
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
          background: dark
            ? 'linear-gradient(135deg, #F4B942, #FF6B35)'
            : '#FFFFFF',
          boxShadow: dark
            ? '0 0 8px rgba(244,185,66,0.7)'
            : '0 1px 4px rgba(0,0,0,0.22)',
          transition: 'left 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 7,
        }}>
          {dark ? '🌙' : '☀️'}
        </div>
      </div>
      {/* DARK / LIGHT label */}
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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

const Header = ({ dark, setDark }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl">

      {/* ── DESKTOP NAV ── */}
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 flex items-center justify-between h-16 md:h-20 2xl:h-24">

        {/* Original logo — exactly as it was before any changes */}
        <a href="#" className="flex items-center" onClick={closeMobile}>
          <img
            src="/inkanyezi-logo-transparent-BRuYXriy.png"
            alt="Inkanyezi Technologies"
            className="h-[114px] 2xl:h-[160px] w-auto"
          />
        </a>

        {/* Desktop: nav links + toggle + Book a Call */}
        <nav className="hidden md:flex items-center gap-8 2xl:gap-10">
          {NAV_ITEMS.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="font-technical text-sm 2xl:text-base text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
            >
              {item.label}
            </a>
          ))}

          {/* Theme toggle sits between nav links and CTA button */}
          <ThemeToggle dark={dark} setDark={setDark} />

          <a
            href="#contact"
            className="gradient-gold text-primary-foreground font-sans font-semibold text-sm 2xl:text-base px-5 py-2.5 2xl:px-7 2xl:py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Book a Call
          </a>
        </nav>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle dark={dark} setDark={setDark} />
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 pb-6 animate-fade-in-slow">
          {NAV_ITEMS.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              className="block py-3 font-technical text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              {item.label}
            </a>
          ))}

          <div style={{ height: 1, background: 'rgba(244,185,66,0.15)', margin: '8px 0' }} />

          <ThemeToggle dark={dark} setDark={setDark} mobile={true} />

          <a
            href="#contact"
            onClick={closeMobile}
            className="block mt-2 gradient-gold text-primary-foreground font-sans font-semibold text-sm px-5 py-3 rounded-lg hover:opacity-90 transition-opacity text-center"
          >
            Book a Call
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
