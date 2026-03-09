import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import villaSolar from "@/assets/villa-solar-sm.webp";

const points = [
  "Progettiamo impianti che durano",
  "Utilizziamo componenti affidabili",
  "Evitiamo soluzioni forzate",
  "Valutiamo sempre il contesto reale",
];

const InvestmentSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <img
              src={villaSolar}
              alt="Impianto fotovoltaico finito e pulito"
              className="rounded-2xl sm:rounded-3xl shadow-medium w-full object-cover aspect-[4/3]"
              width="683"
              height="512"
              loading="lazy"
            />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-primary mb-4 md:mb-6">
              Un investimento da fare con criterio
            </h2>

            <p className="text-muted-foreground mb-2 leading-relaxed text-sm sm:text-base">
              Un impianto fotovoltaico non è una spesa impulsiva.
            </p>
            <p className="text-muted-foreground mb-6 md:mb-8 leading-relaxed text-sm sm:text-base">
              È una scelta tecnica ed economica.
            </p>

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {points.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm sm:text-base">{point}</span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground mb-2 leading-relaxed text-sm sm:text-base">
              Il nostro obiettivo non è vendere l'impianto ad ogni costo come fanno in molti.
            </p>
            <p className="text-foreground font-medium mb-6 md:mb-8 leading-relaxed text-sm sm:text-base">
              Il nostro obiettivo è quello di farti fare il miglior investimento possibile, che duri nel tempo.
            </p>

            <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
              <Link to="/contatti">Richiedi un sopralluogo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentSection;
