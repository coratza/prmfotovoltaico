import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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

    // Simula invio form
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Richiesta inviata!",
      description: "Ti ricontatteremo al più presto per una prima valutazione.",
    });
  };

  return (
    <section className="section-padding bg-accent">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Vuoi capire se il fotovoltaico è adatto al tuo caso?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Compila il modulo per una prima valutazione.<br />
                Ti ricontattiamo per analizzare la situazione in modo concreto.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Nessun impegno</span>
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Nessuna proposta standard</span>
                </li>
              </ul>
            </div>

            {/* Form */}
            <div className="bg-card rounded-xl p-6 md:p-8 shadow-soft border border-border">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Richiesta Inviata!
                  </h3>
                  <p className="text-muted-foreground">
                    Ti ricontatteremo al più presto per una prima valutazione.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="lead-name" className="text-foreground">
                      Nome *
                    </Label>
                    <Input
                      id="lead-name"
                      name="name"
                      required
                      placeholder="Mario Rossi"
                      className="h-12 mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lead-phone" className="text-foreground">
                      Telefono *
                    </Label>
                    <Input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="333 1234567"
                      className="h-12 mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lead-email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="lead-email"
                      name="email"
                      type="email"
                      placeholder="mario.rossi@email.it"
                      className="h-12 mt-1"
                    />
                  </div>

                  <div>
                    <Label className="text-foreground mb-3 block">Tipo cliente</Label>
                    <RadioGroup
                      value={clientType}
                      onValueChange={setClientType}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="privato" id="privato" />
                        <Label htmlFor="privato" className="cursor-pointer">Privato</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="azienda" id="azienda" />
                        <Label htmlFor="azienda" className="cursor-pointer">Azienda</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="lead-cap" className="text-foreground">
                      CAP immobile *
                    </Label>
                    <Input
                      id="lead-cap"
                      name="cap"
                      required
                      placeholder="40068"
                      maxLength={5}
                      className="h-12 mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="cta"
                    size="lg"
                    className="w-full mt-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Invio in corso..." : "Richiedi un sopralluogo"}
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
  );
};

export default LeadFormSection;
