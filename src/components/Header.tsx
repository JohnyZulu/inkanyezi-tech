import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoFull from "@/assets/inkanyezi-logo-full.png";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center">
          <img
            src={logoFull}
            alt="Inkanyezi Technologies"
            className="h-[50px] w-auto"
            style={{ mixBlendMode: "lighten" }}
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-technical text-sm text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="gradient-gold text-primary-foreground font-sans font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            Book a Call
          </a>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 pb-6 animate-fade-in-slow">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-technical text-sm text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block mt-4 gradient-gold text-primary-foreground font-sans font-semibold text-sm px-5 py-2.5 rounded-lg text-center"
          >
            Book a Call
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
