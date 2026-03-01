import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validatePhone, validateEmail } from "@/lib/validation";

const Contatti = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const nome = formData.get("name") as string;
    const telefono = formData.get("phone") as string;
    const email = (formData.get("email") as string) || "";
    const message = (formData.get("message") as string) || "";

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
          tipologia: "privato",
          provincia: "bologna",
          tipo_immobile: "casa_singola",
          consumo_annuo: 3500,
          spesa_annua: 800,
          note: message || null,
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
    <Layout>
      <SEOHead
        title="Contatti PRM Fotovoltaico | Installatore Bologna Modena Ferrara Ravenna"
        description="Contatta PRM Fotovoltaico per un sopralluogo gratuito. Installazione impianti fotovoltaici a Bologna, Modena, Ferrara e Ravenna. Chiama il 335 611 7388."
        keywords="contatti PRM Fotovoltaico, installatore fotovoltaico Bologna, sopralluogo fotovoltaico gratuito, telefono fotovoltaico Bologna"
        canonicalPath="/contatti"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contatti", href: "/contatti" },
        ]}
      />
      {/* Hero */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-light text-foreground mb-6">
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
              <h2 className="text-2xl font-heading font-light text-foreground mb-6">
                Come Raggiungerci
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telefono</h3>
                    <a href="tel:+393356117388" className="phone-link">335 611 7388</a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ing. Navone Riccardo — rispondiamo di solito in giornata
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <a href="mailto:prm.navone@legalmail.it" className="text-primary hover:underline">
                      prm.navone@legalmail.it
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Per richieste scritte</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Sede</h3>
                    <p className="text-muted-foreground">San Lazzaro di Savena (BO)<br />Emilia-Romagna</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Orari</h3>
                    <p className="text-muted-foreground">Lunedì - Venerdì: 8:00 - 18:00<br />Sabato: 9:00 - 13:00</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-accent rounded-xl">
                <h3 className="font-semibold text-foreground mb-3">Area Geografica Servita</h3>
                <p className="text-muted-foreground text-sm mb-4">Installiamo impianti fotovoltaici in:</p>
                <div className="flex flex-wrap gap-2">
                  {["Bologna", "Modena", "Ferrara", "Ravenna"].map((city) => (
                    <span key={city} className="bg-card px-3 py-1 rounded-full text-sm text-foreground border border-border">{city}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-soft border border-border">
                <h2 className="text-2xl font-heading font-light text-foreground mb-2">
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
                    <h3 className="text-xl font-semibold text-foreground mb-2">Richiesta Inviata!</h3>
                    <p className="text-muted-foreground">Ti ricontatteremo al più presto per fissare un appuntamento.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Nome e Cognome *</label>
                      <Input id="name" name="name" required placeholder="Mario Rossi" className="h-12" maxLength={200} />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Telefono *</label>
                      <Input id="phone" name="phone" type="tel" required placeholder="333 1234567" className="h-12" maxLength={30} />
                      {phoneError && <p className="text-sm text-destructive mt-1">{phoneError}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email (opzionale)</label>
                      <Input id="email" name="email" type="email" placeholder="mario.rossi@email.it" className="h-12" />
                      {emailError && <p className="text-sm text-destructive mt-1">{emailError}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Note (opzionale)</label>
                      <Textarea id="message" name="message" placeholder="Es. Ho una casa indipendente a Bologna..." rows={4} />
                    </div>

                    <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isSubmitting}>
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
            <h2 className="text-3xl md:text-4xl font-heading font-light mb-4">Preferisci Chiamare?</h2>
            <p className="text-xl text-primary-foreground/90 mb-8">Siamo disponibili per rispondere alle tue domande.</p>
            <Button variant="cta" size="xl" asChild>
              <a href="tel:+393356117388">
                <Phone className="w-6 h-6" />
                Chiama Ora: 335 611 7388
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contatti;
