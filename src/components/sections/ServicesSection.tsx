import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import villaSolar from "@/assets/villa-solar.jpg";
import industrialSolar from "@/assets/industrial-solar.jpg";

const ServicesSection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
            Impianti fotovoltaici per abitazioni e aziende
          </h2>
          <p className="text-lg text-primary">
            Seguiamo tutto il processo: sopralluogo, progettazione, installazione e pratiche.<br />
            Lavoriamo sul territorio, con un approccio tecnico e concreto.<br />
            Un solo referente, dall'inizio alla fine.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Per Privati */}
          <div className="bg-primary rounded-3xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-2/5 h-64 md:h-auto">
                <img
                  src={villaSolar}
                  alt="Fotovoltaico per privati"
                  className="w-full h-full object-cover p-6 rounded-3xl"
                />
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                  Per Privati
                </h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  Ogni soluzione viene progettata partendo dal tetto, dai consumi reali e dalle esigenze della famiglia.<br />
                  Ci occupiamo di tutto: sopralluogo, progettazione, installazione e pratiche.
                </p>
                <div>
                  <Button variant="cardCta" size="lg" asChild>
                    <Link to="/fotovoltaico-privati">
                      Scopri di più
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Per Aziende */}
          <div className="bg-primary rounded-3xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-2/5 h-64 md:h-auto">
                <img
                  src={industrialSolar}
                  alt="Fotovoltaico per aziende"
                  className="w-full h-full object-cover p-6 rounded-3xl"
                />
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
                  Per Aziende
                </h3>
                <p className="text-white/90 leading-relaxed mb-6">
                  Progettiamo l'impianto in base ai consumi dell'attività, agli orari di lavoro e alla struttura del capannone o dell'edificio.<br />
                  Seguiamo direttamente tutte le fasi: sopralluogo tecnico, progettazione, installazione e pratiche.
                </p>
                <div>
                  <Button variant="cardCta" size="lg" asChild>
                    <Link to="/fotovoltaico-aziende">
                      Scopri di più
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
