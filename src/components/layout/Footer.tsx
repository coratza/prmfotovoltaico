import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import prmLogo from "@/assets/prm-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img src={prmLogo} alt="PRM Fotovoltaico" className="h-12 md:h-16 w-auto brightness-0 invert" width="160" height="64" loading="lazy" />
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
              Installiamo impianti fotovoltaici in Emilia-Romagna. Contatto diretto con l'ingegnere, qualità artigianale, assistenza locale.
            </p>
            <a href="tel:+393356117388" className="inline-flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80 font-semibold">
              <Phone className="w-4 h-4" /> 335 611 7388
            </a>
          </div>

          {/* Fotovoltaico per città */}
          <div>
            <h4 className="font-heading font-medium text-base md:text-lg mb-3 md:mb-4">Fotovoltaico</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link to="/fotovoltaico-bologna" className="hover:text-primary-foreground transition-colors py-1 inline-block">Fotovoltaico Bologna</Link></li>
              <li><Link to="/fotovoltaico-modena" className="hover:text-primary-foreground transition-colors py-1 inline-block">Fotovoltaico Modena</Link></li>
              <li><Link to="/fotovoltaico-ferrara" className="hover:text-primary-foreground transition-colors py-1 inline-block">Fotovoltaico Ferrara</Link></li>
              <li><Link to="/fotovoltaico-ravenna" className="hover:text-primary-foreground transition-colors py-1 inline-block">Fotovoltaico Ravenna</Link></li>
              <li><Link to="/fotovoltaico-privati" className="hover:text-primary-foreground transition-colors py-1 inline-block">Impianti Privati</Link></li>
              <li><Link to="/fotovoltaico-aziende" className="hover:text-primary-foreground transition-colors py-1 inline-block">Impianti Aziende</Link></li>
            </ul>
          </div>

          {/* Agevolazioni */}
          <div>
            <h4 className="font-heading font-medium text-base md:text-lg mb-3 md:mb-4">Agevolazioni</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link to="/agevolazioni/detrazioni-privati" className="hover:text-primary-foreground transition-colors py-1 inline-block">Detrazioni Privati</Link></li>
              <li><Link to="/agevolazioni/agevolazioni-aziende" className="hover:text-primary-foreground transition-colors py-1 inline-block">Agevolazioni Aziende</Link></li>
              <li><Link to="/agevolazioni/detrazioni-privati-bologna" className="hover:text-primary-foreground transition-colors py-1 inline-block">Detrazioni Bologna</Link></li>
              <li><Link to="/agevolazioni/detrazioni-privati-modena" className="hover:text-primary-foreground transition-colors py-1 inline-block">Detrazioni Modena</Link></li>
              <li><Link to="/agevolazioni/detrazioni-privati-ferrara" className="hover:text-primary-foreground transition-colors py-1 inline-block">Detrazioni Ferrara</Link></li>
              <li><Link to="/agevolazioni/detrazioni-privati-ravenna" className="hover:text-primary-foreground transition-colors py-1 inline-block">Detrazioni Ravenna</Link></li>
            </ul>
          </div>

          {/* Approfondimenti */}
          <div>
            <h4 className="font-heading font-medium text-base md:text-lg mb-3 md:mb-4">Approfondimenti</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80">
              <li><Link to="/blog" className="hover:text-primary-foreground transition-colors py-1 inline-block">Blog</Link></li>
              <li><Link to="/blog/conviene-fotovoltaico" className="hover:text-primary-foreground transition-colors py-1 inline-block">Conviene il fotovoltaico?</Link></li>
              <li><Link to="/blog/quanto-costa-impianto-fotovoltaico" className="hover:text-primary-foreground transition-colors py-1 inline-block">Quanto costa</Link></li>
              <li><Link to="/blog/accumulo-fotovoltaico-conviene" className="hover:text-primary-foreground transition-colors py-1 inline-block">Accumulo sì o no?</Link></li>
              <li><Link to="/blog/roi-fotovoltaico" className="hover:text-primary-foreground transition-colors py-1 inline-block">ROI fotovoltaico</Link></li>
              <li><Link to="/calcola-rendimento" className="hover:text-primary-foreground transition-colors py-1 inline-block">Calcola risparmio</Link></li>
              <li><Link to="/lavori-realizzati" className="hover:text-primary-foreground transition-colors py-1 inline-block">Lavori realizzati</Link></li>
            </ul>
          </div>

          {/* Azienda + Contatti */}
          <div>
            <h4 className="font-heading font-medium text-base md:text-lg mb-3 md:mb-4">Azienda</h4>
            <ul className="space-y-2.5 text-sm text-primary-foreground/80 mb-6">
              <li><Link to="/chi-siamo" className="hover:text-primary-foreground transition-colors py-1 inline-block">Chi Siamo</Link></li>
              <li><Link to="/contatti" className="hover:text-primary-foreground transition-colors py-1 inline-block">Contatti</Link></li>
            </ul>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:navonericcardo@hotmail.it" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors break-all">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">navonericcardo@hotmail.it</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm">San Lazzaro di Savena (BO)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 md:mt-14 pt-6 md:pt-8 border-t border-primary-foreground/20">
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
