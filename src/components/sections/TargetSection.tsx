import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import villaSolar from "@/assets/villa-solar.webp";
import industrialSolar from "@/assets/industrial-solar.webp";

const TargetSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Per Chi Lavoriamo
          </h2>
          <p className="text-lg text-muted-foreground">
            Ogni cliente ha esigenze diverse. Ecco perché offriamo soluzioni personalizzate per privati e aziende.
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Privati */}
          <div className="group relative overflow-hidden rounded-2xl">
            <img
              src={villaSolar}
              alt="Villa con impianto fotovoltaico"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-primary-foreground">
              <h3 className="text-2xl font-serif font-bold mb-3">Privati e Famiglie</h3>
              <p className="text-primary-foreground/90 mb-4">
                Hai una casa indipendente? Il fotovoltaico ti permette di ridurre le bollette e diventare più indipendente dalla rete.
              </p>
              <Button variant="ctaSecondary" className="w-fit border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/fotovoltaico-privati">
                  Scopri di più
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Aziende */}
          <div className="group relative overflow-hidden rounded-2xl">
            <img
              src={industrialSolar}
              alt="Capannone industriale con pannelli solari"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-primary-foreground">
              <h3 className="text-2xl font-serif font-bold mb-3">Aziende e Imprese</h3>
              <p className="text-primary-foreground/90 mb-4">
                I costi energetici pesano sul bilancio? Un impianto fotovoltaico è un investimento che si ripaga in pochi anni.
              </p>
              <Button variant="ctaSecondary" className="w-fit border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/fotovoltaico-aziende">
                  Scopri di più
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetSection;
