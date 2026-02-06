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
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium">Installatore locale</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6">
            Impianti Fotovoltaici a Bologna, Modena, Ferrara e Ravenna
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-light">
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
            <Button variant="ctaSecondary" size="xl" asChild>
              <Link to="/contatti">
                Richiedi un sopralluogo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
