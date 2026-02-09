import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contatti = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simula invio form
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Richiesta inviata!",
      description: "Ti ricontatteremo al più presto.",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Contattaci
            </h1>
            <p className="text-xl text-muted-foreground">
              Vuoi sapere se il fotovoltaico fa per te? Chiamaci o compila il form. Ti ricontattiamo noi.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                Come Raggiungerci
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telefono</h3>
                    <a
                      href="tel:+393246117388"
                      className="phone-link"
                    >
                      324 611 7388
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Il modo più veloce per parlarci (di solito rispondiamo in giornata)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a
                      href="mailto:info@solartech-bologna.it"
                      className="text-primary hover:underline"
                    >
                      info@solartech-bologna.it
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Per richieste scritte
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Sede</h3>
                    <p className="text-muted-foreground">
                      San Lazzaro di Savena (BO)<br />
                      Emilia-Romagna
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Orari</h3>
                    <p className="text-muted-foreground">
                      Lunedì - Venerdì: 8:00 - 18:00<br />
                      Sabato: 9:00 - 13:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Area servita */}
              <div className="mt-8 p-6 bg-accent rounded-xl">
                <h3 className="font-semibold text-foreground mb-3">Area Geografica Servita</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Installiamo impianti fotovoltaici in:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Bologna", "Modena", "Ferrara", "Ravenna"].map((city) => (
                    <span key={city} className="bg-card px-3 py-1 rounded-full text-sm text-foreground border border-border">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-soft border border-border">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                  Richiedi un Sopralluogo
                </h2>
                <p className="text-muted-foreground mb-6">
                  Compila il form con i tuoi dati. Ti ricontattiamo per fissare un appuntamento.
                </p>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Richiesta Inviata!
                    </h3>
                    <p className="text-muted-foreground">
                      Ti ricontatteremo al più presto per fissare un appuntamento.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                        Nome e Cognome *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Mario Rossi"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                        Telefono *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="333 1234567"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email (opzionale)
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="mario.rossi@email.it"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                        Note (opzionale)
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Es. Ho una casa indipendente a Bologna..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Invio in corso..." : "Invia Richiesta"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      I tuoi dati saranno usati solo per ricontattarti. Niente spam.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Preferisci Chiamare?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Siamo disponibili per rispondere alle tue domande.
            </p>
            <Button variant="cta" size="xl" asChild>
              <a href="tel:+393246117388">
                <Phone className="w-6 h-6" />
                Chiama Ora: 324 611 7388
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contatti;
