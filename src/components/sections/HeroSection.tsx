import { Phone, ArrowRight, Shield, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const form = document.getElementById("lead-form-section");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center">
      <div className="absolute inset-0">
        <img
          src="/images/hero-solar-home-sm.webp"
          alt="Casa con impianto fotovoltaico a Bologna"
          className="w-full h-full object-cover"
          width={1024}
          height={576}
          fetchPriority="high"
          decoding="sync"
          loading="eager"
        />
        {/* Mobile: gradient covers full width for readability. Desktop: fade to right */}
        <div className="absolute inset-0 bg-foreground/60 md:bg-gradient-to-r md:from-foreground/65 md:via-foreground/50 md:to-foreground/10" />
      </div>

      <div className="container-custom relative z-10 py-12 md:py-0">
        <div className="max-w-3xl text-primary-foreground">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-light leading-tight mb-4 md:mb-6">
            Impianti Fotovoltaici a Bologna, Modena, Ferrara e Ravenna
          </h1>

          <p className="text-base md:text-xl text-primary-foreground/85 mb-6 md:mb-8 leading-relaxed font-light max-w-2xl">
            Riduci i costi energetici della tua casa o azienda. 
            Sopralluogo gratuito, installazione chiavi in mano, assistenza locale.
          </p>

          {/* Social proof bar */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-8 md:mb-10">
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">200+ impianti installati</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">Attivi dal 2010</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <Shield className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">Componenti di qualità certificata</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button variant="cta" size="lg" className="rounded-full px-6 sm:px-8 text-sm sm:text-base" asChild>
              <a href="#lead-form-section" onClick={scrollToForm}>
                Richiedi Sopralluogo Gratuito
                <ArrowRight className="w-5 h-5 flex-shrink-0" />
              </a>
            </Button>
            <Button size="lg" className="border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-6 sm:px-8 text-sm sm:text-base" asChild>
              <a href="tel:+393356117388">
                <Phone className="w-5 h-5 flex-shrink-0" />
                Chiama Ora
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
