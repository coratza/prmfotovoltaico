import { Star, Quote } from "lucide-react";
import SectionCTA from "./SectionCTA";

const testimonials = [
  {
    quote: "Preventivo chiaro e lavoro pulito. Ci hanno seguito dall'inizio alla fine e ci hanno spiegato tutto in modo semplice.",
    name: "M. R.",
    location: "San Lazzaro di Savena (BO)",
    tag: "Privati",
  },
  {
    quote: "Per noi contava avere un installatore vicino e reperibile. Sopralluogo rapido, tempi rispettati e assistenza presente.",
    name: "A. G.",
    location: "Bologna",
    tag: "Privati",
  },
  {
    quote: "Abbiamo valutato più soluzioni: qui abbiamo trovato serietà e numeri realistici. Impianto industriale gestito senza complicazioni.",
    name: "F. P.",
    location: "Castel San Pietro Terme (BO)",
    tag: "Aziende",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-accent">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-primary mb-3 md:mb-4">
            Testimonianze
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Scopri come i nostri clienti descrivono l'esperienza con PRM Fotovoltaico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t) => (
            <figure
              key={`${t.name}-${t.location}`}
              className="bg-card rounded-2xl p-5 md:p-6 shadow-soft border border-border"
            >
              <div className="flex items-start justify-between gap-4 mb-3 md:mb-4">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-primary/40 flex-shrink-0" />
              </div>
              <blockquote className="text-foreground leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                "{t.quote}"
              </blockquote>
              <figcaption className="pt-3 md:pt-4 border-t border-border">
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{t.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <SectionCTA text="Richiedi il tuo sopralluogo gratuito" />
      </div>
    </section>
  );
};

export default TestimonialsSection;
