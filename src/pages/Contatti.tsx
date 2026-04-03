import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, CheckCircle, Shield, Users, Calendar } from "lucide-react";
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

      {/* Form-first layout */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form - takes more space, comes first visually */}
            <div className="lg:col-span-3 order-1">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-medium border border-border">
                <h1 className="text-3xl md:text-4xl font-heading font-light text-foreground mb-2">
                  Richiedi un Sopralluogo Gratuito
                </h1>
                <p className="text-muted-foreground mb-6">
                  Compila il form. Ti ricontattiamo per fissare un appuntamento senza impegno.
                </p>

                {/* Trust badges inline */}
                <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Nessun impegno</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>200+ clienti soddisfatti</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Risposta entro 24h</span>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">Richiesta Inviata!</h2>
                    <p className="text-muted-foreground">Ti ricontatteremo al più presto per fissare un appuntamento.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Nome e Cognome *</label>
                        <Input id="name" name="name" required placeholder="Mario Rossi" className="h-12 rounded-xl" maxLength={200} />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Telefono *</label>
                        <Input id="phone" name="phone" type="tel" required placeholder="333 1234567" className="h-12 rounded-xl" maxLength={30} />
                        {phoneError && <p className="text-sm text-destructive mt-1">{phoneError}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email (opzionale)</label>
                      <Input id="email" name="email" type="email" placeholder="mario.rossi@email.it" className="h-12 rounded-xl" />
                      {emailError && <p className="text-sm text-destructive mt-1">{emailError}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Note (opzionale)</label>
                      <Textarea id="message" name="message" placeholder="Es. Ho una casa indipendente a Bologna..." rows={3} className="rounded-xl" />
                    </div>

                    <Button type="submit" variant="cta" size="lg" className="w-full rounded-full" disabled={isSubmitting}>
                      {isSubmitting ? "Invio in corso..." : "Invia Richiesta di Sopralluogo"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      I tuoi dati saranno usati solo per ricontattarti. Niente spam.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2 order-2">
              <div className="space-y-6">
                {/* Phone CTA card */}
                <div className="bg-gradient-hero rounded-2xl p-6 text-primary-foreground">
                  <h2 className="text-xl font-heading font-light mb-3">Preferisci chiamare?</h2>
                  <a href="tel:+393356117388" className="text-2xl font-bold hover:opacity-80 transition-opacity">
                    335 611 7388
                  </a>
                  <p className="text-primary-foreground/80 text-sm mt-2">
                    Ing. Navone Riccardo — rispondiamo di solito in giornata
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-0.5">Email</h3>
                      <a href="mailto:prm.navone@legalmail.it" className="text-primary hover:underline text-sm">
                        prm.navone@legalmail.it
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-0.5">Sede</h3>
                      <p className="text-muted-foreground text-sm">San Lazzaro di Savena (BO)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-0.5">Orari</h3>
                      <p className="text-muted-foreground text-sm">Lun-Ven: 8:00-18:00 | Sab: 9:00-13:00</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-accent rounded-xl">
                  <h3 className="font-semibold text-foreground text-sm mb-3">Area Servita</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Bologna", "Modena", "Ferrara", "Ravenna"].map((city) => (
                      <span key={city} className="bg-card px-3 py-1 rounded-full text-sm text-foreground border border-border">{city}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contatti;
