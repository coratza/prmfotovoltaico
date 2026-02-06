import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LeadFormSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientType, setClientType] = useState("privato");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Richiesta inviata!",
      description: "Ti ricontatteremo al più presto.",
    });
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-4">
              Vuoi capire se il fotovoltaico è adatto al tuo caso?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Compila il modulo per una prima valutazione.
              <br />
              Ti ricontattiamo per analizzare la situazione in modo concreto.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12 bg-card rounded-3xl shadow-soft border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading text-foreground mb-2">Richiesta inviata!</h3>
              <p className="text-muted-foreground">Ti ricontatteremo al più presto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card rounded-3xl shadow-soft border border-border p-6 md:p-10 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-foreground mb-1.5">
                    Nome e Cognome *
                  </label>
                  <Input id="lead-name" name="name" required placeholder="Mario Rossi" className="h-12 rounded-xl" />
                </div>
                <div>
                  <label htmlFor="lead-company" className="block text-sm font-medium text-foreground mb-1.5">
                    Nome dell'azienda
                  </label>
                  <Input id="lead-company" name="company" placeholder="(opzionale)" className="h-12 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email *
                  </label>
                  <Input id="lead-email" name="email" type="email" required placeholder="mario@email.it" className="h-12 rounded-xl" />
                </div>
                <div>
                  <label htmlFor="lead-phone" className="block text-sm font-medium text-foreground mb-1.5">
                    Telefono *
                  </label>
                  <Input id="lead-phone" name="phone" type="tel" required placeholder="333 1234567" className="h-12 rounded-xl" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Di quale servizio vuoi usufruire?
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setClientType("privato")}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-colors ${
                      clientType === "privato"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    Privato
                  </button>
                  <button
                    type="button"
                    onClick={() => setClientType("azienda")}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-colors ${
                      clientType === "azienda"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    Azienda
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="lead-details" className="block text-sm font-medium text-foreground mb-1.5">
                  Fornisci maggiori dettagli sulla tua attività e su come possiamo aiutarti
                </label>
                <Textarea id="lead-details" name="details" rows={4} placeholder="Descrivi brevemente la tua situazione..." className="rounded-xl" />
              </div>

              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="w-full rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Invio in corso..." : "Invia"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                I tuoi dati saranno usati solo per ricontattarti. Nessun impegno.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;
