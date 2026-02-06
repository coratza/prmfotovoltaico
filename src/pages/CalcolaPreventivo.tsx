import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Calculator, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";
import { calcolaROI, type CalcoloInput, type CalcoloOutput } from "@/lib/roiCalculator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Step = "contatto" | "impianto" | "risultati";

const CalcolaPreventivo = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("contatto");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [risultati, setRisultati] = useState<CalcoloOutput | null>(null);

  // Contatto
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  // Impianto
  const [tipologia, setTipologia] = useState<"privato" | "azienda">("privato");
  const [provincia, setProvincia] = useState("bologna");
  const [tipoImmobile, setTipoImmobile] = useState<"casa_singola" | "condominio" | "capannone">("casa_singola");
  const [connessione, setConnessione] = useState<"connesso" | "offgrid">("connesso");
  const [potenza, setPotenza] = useState<3 | 6>(3);
  const [accumulo, setAccumulo] = useState(false);
  const [consumoAnnuo, setConsumoAnnuo] = useState("");
  const [spesaAnnua, setSpesaAnnua] = useState("");

  const handleCalcola = async () => {
    const input: CalcoloInput = {
      tipologia,
      provincia,
      tipoImmobile,
      connessione,
      potenza,
      accumulo,
      consumoAnnuo: Number(consumoAnnuo),
      spesaAnnua: Number(spesaAnnua),
    };

    const output = calcolaROI(input);
    setRisultati(output);
    setStep("risultati");

    // Invio dati al backend
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("save-lead", {
        body: {
          nome,
          telefono,
          email: email || null,
          tipologia,
          provincia,
          tipo_immobile: tipoImmobile,
          connessione,
          potenza,
          accumulo,
          consumo_annuo: Number(consumoAnnuo),
          spesa_annua: Number(spesaAnnua),
          ...output,
        },
      });
      if (error) console.error("Errore invio lead:", error);
    } catch (err) {
      console.error("Errore invio lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = nome.trim().length > 0 && telefono.trim().length >= 6;
  const canProceedStep2 = Number(consumoAnnuo) > 0 && Number(spesaAnnua) > 0;

  // Off-grid disabilitato per condominio
  const offgridDisabled = tipoImmobile === "condominio";

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-accent">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto">
            <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl md:text-5xl font-heading font-light text-primary mb-4">
              Calcola il Tuo Preventivo
            </h1>
            <p className="text-lg text-muted-foreground">
              Scopri quanto puoi risparmiare con un impianto fotovoltaico.
              Stima basata sui dati reali della tua bolletta.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {[
                { key: "contatto", label: "Dati" },
                { key: "impianto", label: "Impianto" },
                { key: "risultati", label: "Risultati" },
              ].map((s, i) => (
                <div key={s.key} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === s.key
                      ? "bg-primary text-primary-foreground"
                      : (["contatto", "impianto", "risultati"].indexOf(step) > i
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground")
                  }`}>
                    {["contatto", "impianto", "risultati"].indexOf(step) > i ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground hidden sm:block">{s.label}</span>
                  {i < 2 && <div className="w-8 h-px bg-border" />}
                </div>
              ))}
            </div>

            {/* Step 1: Contatto */}
            {step === "contatto" && (
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border animate-fade-in">
                <h2 className="text-2xl font-heading font-light text-primary mb-6">I tuoi dati di contatto</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Nome e Cognome *</label>
                    <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Mario Rossi" className="h-12" maxLength={200} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Telefono *</label>
                    <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} type="tel" placeholder="333 1234567" className="h-12" maxLength={30} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email (opzionale)</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="mario@email.it" className="h-12" maxLength={255} />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button variant="cta" size="lg" className="rounded-full" onClick={() => setStep("impianto")} disabled={!canProceedStep1}>
                    Avanti <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Impianto */}
            {step === "impianto" && (
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border animate-fade-in">
                <h2 className="text-2xl font-heading font-light text-primary mb-6">Dati del tuo impianto</h2>
                <div className="space-y-5">
                  {/* Tipologia */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sei un privato o un'azienda?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["privato", "azienda"] as const).map((t) => (
                        <button key={t} onClick={() => setTipologia(t)} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${tipologia === t ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                          {t === "privato" ? "Privato" : "Azienda"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Provincia */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Provincia</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["bologna", "modena", "ferrara", "ravenna"].map((p) => (
                        <button key={p} onClick={() => setProvincia(p)} className={`p-3 rounded-xl border text-sm font-medium transition-colors capitalize ${provincia === p ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tipo immobile */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tipo di immobile</label>
                    <div className="grid grid-cols-3 gap-3">
                      {([
                        { value: "casa_singola", label: "Casa singola" },
                        { value: "condominio", label: "Condominio" },
                        { value: "capannone", label: "Capannone" },
                      ] as const).map((t) => (
                        <button key={t.value} onClick={() => { setTipoImmobile(t.value); if (t.value === "condominio") setConnessione("connesso"); }} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${tipoImmobile === t.value ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Connessione */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Connessione alla rete</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setConnessione("connesso")} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${connessione === "connesso" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                        Connesso alla rete
                      </button>
                      <button onClick={() => !offgridDisabled && setConnessione("offgrid")} disabled={offgridDisabled} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${offgridDisabled ? "opacity-50 cursor-not-allowed border-border text-muted-foreground" : connessione === "offgrid" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                        Off-grid
                      </button>
                    </div>
                    {offgridDisabled && <p className="text-xs text-muted-foreground mt-1">Off-grid non disponibile per condomini</p>}
                  </div>

                  {/* Potenza */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Potenza impianto</label>
                    <div className="grid grid-cols-2 gap-3">
                      {([3, 6] as const).map((p) => (
                        <button key={p} onClick={() => setPotenza(p)} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${potenza === p ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                          {p} kW
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accumulo */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sistema di accumulo (batteria)</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setAccumulo(true)} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${accumulo ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                        Sì
                      </button>
                      <button onClick={() => setAccumulo(false)} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${!accumulo ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                        No
                      </button>
                    </div>
                  </div>

                  {/* Consumo annuo */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Consumo annuo (kWh) *</label>
                    <p className="text-xs text-muted-foreground mb-2">Lo trovi nella tua bolletta annuale o nella sintesi dei consumi</p>
                    <Input value={consumoAnnuo} onChange={(e) => setConsumoAnnuo(e.target.value.replace(/[^0-9]/g, ""))} type="text" inputMode="numeric" placeholder="Es. 3500" className="h-12" />
                  </div>

                  {/* Spesa annua */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Spesa annua bolletta (€) *</label>
                    <p className="text-xs text-muted-foreground mb-2">La spesa totale che paghi ogni anno di energia elettrica</p>
                    <Input value={spesaAnnua} onChange={(e) => setSpesaAnnua(e.target.value.replace(/[^0-9]/g, ""))} type="text" inputMode="numeric" placeholder="Es. 800" className="h-12" />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" size="lg" className="rounded-full" onClick={() => setStep("contatto")}>
                    <ArrowLeft className="w-4 h-4" /> Indietro
                  </Button>
                  <Button variant="cta" size="lg" className="rounded-full" onClick={handleCalcola} disabled={!canProceedStep2}>
                    Calcola Preventivo <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Risultati */}
            {step === "risultati" && risultati && (
              <div className="animate-fade-in space-y-6">
                {/* Card principale */}
                <div className="blue-card text-center">
                  <h2 className="text-2xl md:text-3xl font-heading font-light text-primary-foreground mb-8">
                    Il tuo ritorno sull'investimento
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-primary-foreground/70 text-sm mb-2">Ritorno sull'investimento</p>
                      <p className="text-5xl md:text-6xl font-heading font-light text-primary-foreground">
                        {risultati.roiAnnuo}%
                      </p>
                      <p className="text-primary-foreground/70 text-sm mt-1">annuo</p>
                    </div>
                    <div>
                      <p className="text-primary-foreground/70 text-sm mb-2">Rientro dell'investimento</p>
                      <p className="text-5xl md:text-6xl font-heading font-light text-primary-foreground">
                        {risultati.paybackAnni}
                      </p>
                      <p className="text-primary-foreground/70 text-sm mt-1">anni</p>
                    </div>
                  </div>
                  <p className="text-primary-foreground/90 text-lg leading-relaxed">
                    Con un ROI del <strong>{risultati.roiAnnuo}% annuo</strong>, rientrerai dal tuo investimento in circa <strong>{risultati.paybackAnni} anni</strong>.
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-accent rounded-xl p-5 border border-border">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong>Nota importante:</strong> Questa è una stima indicativa basata sui dati forniti e sul modello di calcolo standard.
                        I risultati reali dipendono da fattori specifici (orientamento del tetto, ombreggiamenti, tipologia di contratto energetico,
                        regime fiscale applicabile) che verranno valutati durante il sopralluogo gratuito.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <p className="text-lg text-foreground font-medium mb-4">
                    Vuoi una valutazione precisa e personalizzata?
                  </p>
                  <Button variant="cta" size="lg" className="rounded-full" asChild>
                    <a href="tel:+393246117388">
                      <Phone className="w-5 h-5" />
                      Chiamaci: 324 611 7388
                    </a>
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3">
                    Il sopralluogo è gratuito e senza impegno.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CalcolaPreventivo;
