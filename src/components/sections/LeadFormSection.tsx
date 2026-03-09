import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validatePhone, validateEmail } from "@/lib/validation";

const LeadFormSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientType, setClientType] = useState("privato");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const nome = formData.get("name") as string;
    const telefono = formData.get("phone") as string;
    const email = (formData.get("email") as string) || "";
    const details = (formData.get("details") as string) || "";

    // Validate
    const pErr = validatePhone(telefono);
    const eErr = validateEmail(email);
    setPhoneError(pErr);
    setEmailError(eErr);
    if (pErr || eErr) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("save-lead", {
        body: {
          nome,
          telefono,
          email: email || null,
          tipologia: clientType,
          provincia: "bologna",
          tipo_immobile: clientType === "azienda" ? "capannone" : "casa_singola",
          consumo_annuo: 3500,
          spesa_annua: 800,
          ...(clientType === "azienda" && {
            mq_tetto: 100,
            profilo_attivita: "diurno",
          }),
          note: details || null,
        },
      });

      if (error) {
        console.error("Errore invio lead:", error);
        toast({
          title: "Errore nell'invio",
          description: "Si è verificato un problema. Riprova o chiamaci direttamente.",
          variant: "destructive",
        });
      } else {
        setIsSubmitted(true);
        toast({
          title: "Richiesta inviata!",
          description: "Ti ricontatteremo al più presto.",
        });
      }
    } catch (err) {
      console.error("Errore invio lead:", err);
      toast({
        title: "Errore nell'invio",
        description: "Si è verificato un problema. Riprova o chiamaci direttamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form-section" className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-primary mb-3 md:mb-4">
              Vuoi capire se il fotovoltaico è adatto al tuo caso?
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Compila il modulo per una prima valutazione.
              <br />
              Ti ricontattiamo per analizzare la situazione in modo concreto.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-10 md:py-12 bg-card rounded-2xl sm:rounded-3xl shadow-soft border border-border">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-heading text-foreground mb-2">Richiesta inviata!</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Ti ricontatteremo al più presto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl sm:rounded-3xl shadow-soft border border-border p-5 sm:p-6 md:p-10 space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-foreground mb-1.5">
                    Nome e Cognome *
                  </label>
                  <Input id="lead-name" name="name" required placeholder="Mario Rossi" className="h-11 md:h-12 rounded-xl" maxLength={200} />
                </div>
                <div>
                  <label htmlFor="lead-company" className="block text-sm font-medium text-foreground mb-1.5">
                    Nome dell'azienda
                  </label>
                  <Input id="lead-company" name="company" placeholder="(opzionale)" className="h-11 md:h-12 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email
                  </label>
                  <Input id="lead-email" name="email" type="email" placeholder="mario@email.it" className="h-11 md:h-12 rounded-xl" />
                  {emailError && <p className="text-sm text-destructive mt-1">{emailError}</p>}
                </div>
                <div>
                  <label htmlFor="lead-phone" className="block text-sm font-medium text-foreground mb-1.5">
                    Telefono *
                  </label>
                  <Input id="lead-phone" name="phone" type="tel" required placeholder="333 1234567" className="h-11 md:h-12 rounded-xl" maxLength={30} />
                  {phoneError && <p className="text-sm text-destructive mt-1">{phoneError}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Di quale servizio vuoi usufruire?
                </label>
                <div className="flex gap-3 sm:gap-4">
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
                <Textarea id="lead-details" name="details" rows={3} placeholder="Descrivi brevemente la tua situazione..." className="rounded-xl" />
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
