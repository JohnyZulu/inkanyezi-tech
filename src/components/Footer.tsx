import InkanyeziLogo from "./InkanyeziLogo";

const Footer = () => (
  <footer className="border-t border-border px-6 py-12">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <InkanyeziLogo className="w-10 h-7" />
        <div>
          <span className="font-serif text-foreground font-semibold">Inkanyezi Technologies</span>
          <p className="text-xs text-muted-foreground">Illuminating the Future</p>
        </div>
      </div>
      <p className="font-sans text-sm text-muted-foreground">
        © {new Date().getFullYear()} Inkanyezi Technologies. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
