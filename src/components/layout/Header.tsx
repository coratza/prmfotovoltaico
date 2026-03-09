import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import prmLogoRound from "@/assets/prm-logo-round.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/fotovoltaico-privati", label: "Per Privati" },
    { href: "/fotovoltaico-aziende", label: "Per Aziende" },
    { href: "/agevolazioni", label: "Agevolazioni" },
    { href: "/calcola-rendimento", label: "Calcola Rendimento" },
    { href: "/lavori-realizzati", label: "Lavori Realizzati" },
    { href: "/chi-siamo", label: "Chi Siamo" },
    { href: "/contatti", label: "Contatti" },
  ];

  const isActive = (href: string) => location.pathname === href || (href !== "/" && location.pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 md:h-20">
          <Link to="/" className="flex items-center">
            <img src={prmLogoRound} alt="PRM Fotovoltaico" className="h-12 w-12 md:h-20 md:w-20" width={80} height={80} />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+393356117388" className="flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">335 611 7388</span>
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-md hover:bg-accent" aria-label="Menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden py-3 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-md font-medium transition-colors text-sm ${
                    isActive(link.href) ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <Button variant="cta" size="lg" className="w-full rounded-full" asChild>
                <a href="tel:+393356117388">
                  <Phone className="w-5 h-5" />
                  Chiama Ora: 335 611 7388
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
