import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Preventivo chiaro e lavoro pulito. Ci hanno seguito dall'inizio alla fine e ci hanno spiegato tutto in modo semplice.",
    name: "M. R.",
    location: "San Lazzaro di Savena (BO)",
    tag: "Privati",
  },
  {
    quote:
      "Per noi contava avere un installatore vicino e reperibile. Sopralluogo rapido, tempi rispettati e assistenza presente.",
    name: "A. G.",
    location: "Bologna",
    tag: "Privati",
  },
  {
    quote:
      "Abbiamo valutato più soluzioni: qui abbiamo trovato serietà e numeri realistici. Impianto industriale gestito senza complicazioni.",
    name: "F. P.",
    location: "Castel San Pietro Terme (BO)",
    tag: "Aziende",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Cosa Dicono i Clienti
          </h2>
          <p className="text-lg text-muted-foreground">
            Alcune testimonianze raccolte da clienti in zona. Se vuoi, ti mettiamo in contatto con chi ha già installato.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span>Affidabilità, chiarezza, presenza locale</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={`${t.name}-${t.location}`}
              className="bg-card rounded-xl p-6 shadow-soft border border-border"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {t.tag}
                </div>
                <Quote className="h-5 w-5 text-primary/60" />
              </div>
              <blockquote className="text-foreground leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-border">
                <p className="font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
