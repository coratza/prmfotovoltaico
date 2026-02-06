import { Link } from "react-router-dom";
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-4">
            Cosa chiarire prima di installare un impianto
          </h2>
          <p className="text-muted-foreground">
            Molti clienti arrivano da noi dopo esperienze poco chiare.
            <br />
            Per questo mettiamo alcuni punti subito in evidenza.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {points.map((point) => (
            <div key={point.num} className="blue-card text-center">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center font-heading text-2xl font-light text-primary-foreground mx-auto mb-4">
                {point.num}
              </div>
              <p className="text-primary-foreground font-medium leading-snug">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-foreground font-medium mb-2">
            Il nostro lavoro parte dalla fattibilità reale, non dalle promesse.
          </p>
          <p className="text-muted-foreground mb-2">
            Calcoli precisi, impianti longevi e ritorno sull'investimento garantito.
          </p>
          <p className="text-foreground font-medium mb-8">
            Non farti fregare da chi ti fa promesse troppo belle per essere vere, perché molto spesso non lo sono.
          </p>

          <Button variant="cta" size="lg" className="rounded-full" asChild>
            <a href="tel:+393246117388">
              <Phone className="w-5 h-5" />
              Prenota una chiamata GRATIS
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClaritySection;
