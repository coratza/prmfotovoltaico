import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center">
      <div className="absolute inset-0">
        <img
          src="/images/hero-solar-home.jpg"
          alt="Casa con impianto fotovoltaico a Bologna"
          className="w-full h-full object-cover"
          width={1420}
          height={799}
          fetchPriority="high"
          decoding="sync"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/20" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl text-primary-foreground">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light leading-tight mb-6">
            Impianti Fotovoltaici a Bologna, Modena, Ferrara e Ravenna
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/85 mb-10 leading-relaxed font-light max-w-2xl">
            Riduci i costi energetici della tua casa o azienda. 
            Sopralluogo gratuito, installazione chiavi in mano, assistenza locale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="cta" size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 rounded-full px-8" asChild>
              <a href="tel:+393356117388">
                <Phone className="w-5 h-5" />
                CHIAMA ORA
              </a>
            </Button>
            <Button size="lg" className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8" asChild>
              <Link to="/contatti">
                RICHIEDI UN SOPRALLUOGO
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
