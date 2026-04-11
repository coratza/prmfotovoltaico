import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const points = [
  { num: "1", text: "Non esiste un prezzo valido per tutti" },
  { num: "2", text: "Un impianto sovradimensionato è un errore" },
  { num: "3", text: "Le stime teoriche non sono un risultato garantito" },
  { num: "4", text: "Gli incentivi vanno verificati prima, non dopo" },
];

const ClaritySection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-primary mb-3 md:mb-4">
            Cosa chiarire prima di installare un impianto
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Molti clienti arrivano da noi dopo esperienze poco chiare.
            <br className="hidden sm:block" />
            Per questo mettiamo alcuni punti subito in evidenza.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 md:mb-12">
          {points.map((point) => (
            <div key={point.num} className="blue-card text-center p-4 md:p-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center font-heading text-xl md:text-2xl font-light text-primary-foreground mx-auto mb-3 md:mb-4">
                {point.num}
              </div>
              <p className="text-primary-foreground font-medium leading-snug text-xs sm:text-sm md:text-base">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-foreground font-medium mb-2 text-sm sm:text-base">
            Il nostro lavoro parte dalla fattibilità reale, non dalle promesse.
          </p>
          <p className="text-muted-foreground mb-2 text-sm sm:text-base">
            Calcoli precisi, impianti longevi e ritorno sull'investimento garantito.
          </p>
          <p className="text-foreground font-medium mb-6 md:mb-8 text-sm sm:text-base">
            Non farti fregare da chi ti fa promesse troppo belle per essere vere, perché molto spesso non lo sono.
          </p>

          <Button variant="cta" size="lg" className="rounded-full text-sm sm:text-base" asChild>
            <a href="tel:+393356117388">
              <Phone className="w-5 h-5 flex-shrink-0" />
              Prenota una chiamata GRATIS
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClaritySection;
