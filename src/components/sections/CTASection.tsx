import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding bg-primary">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Pronto a Ridurre i Costi Energetici?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Richiedi un sopralluogo gratuito. Ti spiegheremo cosa puoi ottenere con un impianto fotovoltaico, senza impegno.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="xl" asChild>
              <a href="tel:+39051123456">
                <Phone className="w-6 h-6" />
                Chiama Ora
              </a>
            </Button>
            <Button variant="ctaSecondary" size="xl" asChild>
              <Link to="/contatti">
                Richiedi Sopralluogo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/70">
            Operiamo a Bologna, Modena, Ferrara e Ravenna
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
