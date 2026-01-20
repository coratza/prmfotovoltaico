import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-solar-home.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Casa con impianto fotovoltaico in Emilia-Romagna"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-2xl text-primary-foreground">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-sm font-medium">Installatore locale dal 2010</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
            Impianti Fotovoltaici a Bologna e Provincia
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Riduci i costi energetici della tua casa o azienda. 
            Sopralluogo gratuito, installazione chiavi in mano, assistenza locale.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="cta" size="xl" asChild>
              <a href="tel:+39051123456">
                <Phone className="w-6 h-6" />
                Chiama Ora
              </a>
            </Button>
            <Button variant="ctaSecondary" size="xl" className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link to="/contatti">
                Richiedi Sopralluogo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/20">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-serif font-bold text-secondary">14+</p>
                <p className="text-sm text-primary-foreground/70">Anni di esperienza</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-secondary">200+</p>
                <p className="text-sm text-primary-foreground/70">Impianti installati</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-secondary">100%</p>
                <p className="text-sm text-primary-foreground/70">Clienti soddisfatti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
