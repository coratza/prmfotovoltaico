import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Shield, Clock, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validatePhone, validateEmail } from "@/lib/validation";

const trustBadges = [
  { icon: Shield, text: "Nessun impegno" },
  { icon: Clock, text: "Risposta entro 24h" },
  { icon: Phone, text: "Sopralluogo gratuito" },
];

const LeadFormSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientType, setClientType] = useState("privato");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const nome = formData.get("name") as string;
    const telefono = formData.get("phone") as string;
    const email = (formData.get("email") as string) || "";
    const details = (formData.get("details") as string) || "";
    const company = (formData.get("company") as string) || "";

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
          note: [company && `Azienda: ${company}`, details].filter(Boolean).join(" — ") || null,
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

        // Google Ads conversion tracking via GTM dataLayer
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: "form_submission",
            conversionId: "AW-17965756122",
            conversionLabel: "-seBCPTI4JMcENrd3vZC",
          });
        }

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
            {/* Urgenza */}
            <p className="text-sm text-cta font-semibold mt-3">
              ⏳ Sopralluoghi gratuiti disponibili — Posti limitati questa settimana
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-10 md:py-12 bg-card rounded-2xl sm:rounded-3xl shadow-soft border border-border">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-cta/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-cta" />
              </div>
              <h3 className="text-lg md:text-xl font-heading text-foreground mb-2">Richiesta inviata!</h3>
              <p className="text-muted-foreground text-sm sm:text-base">Ti ricontatteremo entro 24 ore.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl sm:rounded-3xl shadow-soft border border-border p-5 sm:p-6 md:p-10 space-y-4 md:space-y-5">
              {/* Tipo cliente - primo per contestualizzare */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sei un privato o un'azienda?
                </label>
                <div className="flex gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => { setClientType("privato"); setShowDetails(false); }}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-colors ${
                      clientType === "privato"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    🏠 Privato
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
                    🏭 Azienda
                  </button>
                </div>
              </div>

              {/* Campi essenziali */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-foreground mb-1.5">
                    Nome e Cognome *
                  </label>
                  <Input id="lead-name" name="name" required placeholder="Mario Rossi" className="h-11 md:h-12 rounded-xl" maxLength={200} />
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
                <label htmlFor="lead-email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email <span className="text-muted-foreground font-normal">(opzionale)</span>
                </label>
                <Input id="lead-email" name="email" type="email" placeholder="mario@email.it" className="h-11 md:h-12 rounded-xl" />
                {emailError && <p className="text-sm text-destructive mt-1">{emailError}</p>}
              </div>

              {/* Nome azienda - solo se azienda */}
              {clientType === "azienda" && (
                <div>
                  <label htmlFor="lead-company" className="block text-sm font-medium text-foreground mb-1.5">
                    Nome dell'azienda
                  </label>
                  <Input id="lead-company" name="company" placeholder="La tua azienda S.r.l." className="h-11 md:h-12 rounded-xl" />
                </div>
              )}

              {/* Dettagli opzionali - nascosti di default */}
              {!showDetails ? (
                <button
                  type="button"
                  onClick={() => setShowDetails(true)}
                  className="text-sm text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  + Aggiungi dettagli sulla tua situazione
                </button>
              ) : (
                <div>
                  <label htmlFor="lead-details" className="block text-sm font-medium text-foreground mb-1.5">
                    Dettagli sulla tua situazione
                  </label>
                  <Textarea id="lead-details" name="details" rows={3} placeholder="Descrivi brevemente la tua situazione..." className="rounded-xl" />
                </div>
              )}

              <Button
                type="submit"
                variant="cta"
                size="lg"
                className="w-full rounded-full text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Invio in corso..." : "Richiedi Sopralluogo Gratuito →"}
              </Button>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2">
                {trustBadges.map((badge) => (
                  <div key={badge.text} className="flex items-center gap-1.5 text-muted-foreground">
                    <badge.icon className="w-3.5 h-3.5 text-cta flex-shrink-0" />
                    <span className="text-xs font-medium">{badge.text}</span>
                  </div>
                ))}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;
