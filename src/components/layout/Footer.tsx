import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import prmLogo from "@/assets/prm-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={prmLogo} alt="PRM Fotovoltaico" className="h-12 md:h-16 w-auto brightness-0 invert" width="160" height="64" loading="lazy" />
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Installiamo impianti fotovoltaici in Emilia-Romagna. 
              Contatto diretto, qualità artigianale, assistenza locale.
            </p>
          </div>

          {/* Servizi */}
          <div>
            <h4 className="font-heading font-medium text-base md:text-lg mb-3 md:mb-4">Servizi</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link to="/fotovoltaico-privati" className="hover:text-primary-foreground transition-colors py-1 inline-block">Fotovoltaico per Privati</Link></li>
              <li><Link to="/fotovoltaico-aziende" className="hover:text-primary-foreground transition-colors py-1 inline-block">Fotovoltaico per Aziende</Link></li>
              <li><Link to="/calcola-rendimento" className="hover:text-primary-foreground transition-colors py-1 inline-block">Calcola Rendimento</Link></li>
              <li><Link to="/agevolazioni" className="hover:text-primary-foreground transition-colors py-1 inline-block">Detrazioni e Agevolazioni</Link></li>
              <li><Link to="/lavori-realizzati" className="hover:text-primary-foreground transition-colors py-1 inline-block">Lavori Realizzati</Link></li>
            </ul>
          </div>

          {/* Azienda + Contatti combined on mobile */}
          <div>
            <h4 className="font-heading font-medium text-base md:text-lg mb-3 md:mb-4">Azienda</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80 mb-6">
              <li><Link to="/chi-siamo" className="hover:text-primary-foreground transition-colors py-1 inline-block">Chi Siamo</Link></li>
              <li><Link to="/contatti" className="hover:text-primary-foreground transition-colors py-1 inline-block">Contatti</Link></li>
            </ul>

            {/* Contatti inline on mobile, separate column on lg */}
            <div className="lg:hidden">
              <h4 className="font-heading font-medium text-base mb-3">Contatti</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="tel:+393356117388" className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 transition-colors py-1">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">335 611 7388</span>
                  </a>
                  <p className="text-primary-foreground/60 text-xs mt-0.5 ml-6">Ing. Navone Riccardo</p>
                </li>
                <li>
                  <a href="mailto:navonericcardo@hotmail.it" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors py-1 break-all">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">navonericcardo@hotmail.it</span>
                  </a>
                </li>
                <li className="flex items-start gap-2 text-primary-foreground/80">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>San Lazzaro di Savena (BO)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contatti - desktop only */}
          <div className="hidden lg:block">
            <h4 className="font-heading font-medium text-lg mb-4">Contatti</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+393356117388" className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">335 611 7388</span>
                </a>
                <p className="text-primary-foreground/60 text-xs mt-0.5 ml-6">Ing. Navone Riccardo</p>
              </li>
              <li>
                <a href="mailto:navonericcardo@hotmail.it" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                  navonericcardo@hotmail.it
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>San Lazzaro di Savena (BO)<br />Emilia-Romagna</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} PRM Fotovoltaico. Tutti i diritti riservati.</p>
            <p>Operiamo a Bologna, Modena, Ferrara, Ravenna</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
