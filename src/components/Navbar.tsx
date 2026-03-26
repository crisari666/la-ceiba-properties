import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Globe, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { t, lang, toggleLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.referrals, href: "/#referidos" },
    { label: t.nav.contact, href: "/#contacto" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/ceiba-icon.png" alt="La Ceiba" className="h-9 w-auto" />
          <span className="font-display text-xl font-bold text-foreground">La Ceiba</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
          >
            <Globe className="w-4 h-4" />
            {lang === "es" ? "EN" : "ES"}
          </button>
          <Button size="sm" className="bg-ceiba-terra hover:bg-ceiba-terra/90 text-primary-foreground gap-2">
            <MessageCircle className="w-4 h-4" />
            {t.nav.assistant}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-muted-foreground hover:text-foreground py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <button onClick={toggleLang} className="flex items-center gap-1 text-sm text-muted-foreground">
              <Globe className="w-4 h-4" />
              {lang === "es" ? "EN" : "ES"}
            </button>
            <Button size="sm" className="bg-ceiba-terra hover:bg-ceiba-terra/90 text-primary-foreground gap-2">
              <MessageCircle className="w-4 h-4" />
              {t.nav.assistant}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
