import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import villaSolar from "@/assets/villa-solar-sm.webp";
import industrialSolar from "@/assets/industrial-solar-sm.webp";

const ServicesSection = () => {
  return (
    <section className="section-padding bg-accent">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-4">
            Impianti fotovoltaici per abitazioni e aziende
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Seguiamo tutto il processo: sopralluogo, progettazione, installazione e pratiche.
            <br />
            Lavoriamo sul territorio, con un approccio tecnico e concreto.
            <br />
            Un solo referente, dall'inizio alla fine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Per Privati */}
          <div className="blue-card">
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-2xl h-56">
                <img src={villaSolar} alt="Fotovoltaico per privati" className="w-full h-full object-cover" width="533" height="300" loading="lazy" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-normal text-primary-foreground mb-3">
                  Per Privati
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed mb-4">
                  Ogni soluzione viene progettata partendo dal tetto, dai consumi reali e dalle esigenze della famiglia.
                  <br />
                  Ci occupiamo di tutto: sopralluogo, progettazione, installazione e pratiche.
                </p>
                <Button variant="outline" className="rounded-full border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
                  <Link to="/fotovoltaico-privati">Richiedi un sopralluogo</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Per Aziende */}
          <div className="blue-card">
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-2xl h-56">
                <img src={industrialSolar} alt="Fotovoltaico per aziende" className="w-full h-full object-cover" width="533" height="300" loading="lazy" />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-normal text-primary-foreground mb-3">
                  Per Aziende
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed mb-4">
                  Progettiamo l'impianto in base ai consumi dell'attività, agli orari di lavoro e alla struttura del capannone o dell'edificio.
                  <br />
                  Seguiamo direttamente tutte le fasi: sopralluogo tecnico, progettazione, installazione e pratiche.
                </p>
                <Button variant="outline" className="rounded-full border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
                  <Link to="/fotovoltaico-aziende">Richiedi un sopralluogo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
