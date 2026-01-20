import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-serif font-bold text-xl">S</span>
              </div>
              <div>
                <p className="font-serif font-semibold text-lg">SolarTech</p>
                <p className="text-xs text-primary-foreground/70">Bologna e provincia</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Installiamo impianti fotovoltaici in Emilia-Romagna dal 2010. 
              Contatto diretto, qualità artigianale, assistenza locale.
            </p>
          </div>

          {/* Servizi */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Servizi</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/fotovoltaico-privati" className="hover:text-primary-foreground transition-colors">
                  Fotovoltaico per Privati
                </Link>
              </li>
              <li>
                <Link to="/fotovoltaico-aziende" className="hover:text-primary-foreground transition-colors">
                  Fotovoltaico per Aziende
                </Link>
              </li>
              <li>
                <Link to="/lavori-realizzati" className="hover:text-primary-foreground transition-colors">
                  Lavori Realizzati
                </Link>
              </li>
            </ul>
          </div>

          {/* Azienda */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Azienda</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/chi-siamo" className="hover:text-primary-foreground transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link to="/contatti" className="hover:text-primary-foreground transition-colors">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Contatti</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+39051123456"
                  className="flex items-center gap-2 text-primary-foreground hover:text-secondary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">051 123 456</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@solartech-bologna.it"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@solartech-bologna.it
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  San Lazzaro di Savena (BO)<br />
                  Emilia-Romagna
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>© 2024 SolarTech. Tutti i diritti riservati.</p>
            <p>Operiamo a Bologna, Modena, Ferrara, Ravenna</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
