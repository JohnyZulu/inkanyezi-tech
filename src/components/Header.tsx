// PATCH FOR: src/components/Header.tsx
// This is the COMPLETE replacement file.
// It accepts dark + setDark props and adds the toggle button into the nav.

import { useState } from "react";

// ── PROPS INTERFACE ──────────────────────────────────────────────────
interface HeaderProps {
  dark: boolean;
  setDark: (fn: (d: boolean) => boolean) => void;
}

const NAV_ITEMS = [
  { label: 'Services',     href: '#services'   },
  { label: 'How It Works', href: '#how-it-works'},
  { label: 'Demo',         href: '#demo'        },
  { label: 'About',        href: '#about'       },
  { label: 'Contact',      href: '#contact'     },
];

// ── TOGGLE BUTTON — reusable in both desktop and mobile ──────────────
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
    // Mobile: full-width row with label
    return (
      <button
        onClick={toggle}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          padding: '12px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#F4B942',
          fontSize: 13,
          fontFamily: 'Montserrat, sans-serif',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 600,
          transition: 'opacity 0.2s',
        }}
      >
        <span style={{ fontSize: 16 }}>{dark ? '☀️' : '🌙'}</span>
        <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    );
  }

  // Desktop: compact circular icon button
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '1.5px solid rgba(244,185,66,0.35)',
        background: 'rgba(244,185,66,0.08)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        color: '#F4B942',
        transition: 'all 0.25s ease',
        flexShrink: 0,
        outline: 'none',
        // Works on all browsers — no WebKit-specific anything needed
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(244,185,66,0.18)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(244,185,66,0.7)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(244,185,66,0.08)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(244,185,66,0.35)';
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
      }}
      // Touch support — ensures tap works on mobile/tablet too
      onTouchEnd={e => { e.preventDefault(); toggle(); }}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}

// ── HAMBURGER ICON ───────────────────────────────────────────────────
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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

// ── HEADER COMPONENT ─────────────────────────────────────────────────
const Header = ({ dark, setDark }: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl">
      {/* ── DESKTOP NAV ── */}
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 flex items-center justify-between h-16 md:h-20 2xl:h-24">

        {/* Logo */}
        <a href="#" className="flex items-center" onClick={closeMobile}>
          <img
            src="/lovable-uploads/inkanyezi-logo-transparent.png"
            alt="Inkanyezi Technologies"
            className="h-[114px] 2xl:h-[160px] w-auto"
          />
        </a>

        {/* Desktop nav items + theme toggle + CTA */}
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

          {/* Theme toggle — sits between nav links and Book a Call */}
          <ThemeToggle dark={dark} setDark={setDark} />

          <a
            href="#contact"
            className="gradient-gold text-primary-foreground font-sans font-semibold text-sm 2xl:text-base px-5 py-2.5 2xl:px-7 2xl:py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Book a Call
          </a>
        </nav>

        {/* Mobile: theme toggle + hamburger */}
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

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(244,185,66,0.15)', margin: '8px 0' }} />

          {/* Mobile theme toggle row */}
          <ThemeToggle dark={dark} setDark={setDark} mobile={true} />

          {/* Book a Call */}
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
