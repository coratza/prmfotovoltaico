import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Calculator, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { calcolaROI, type CalcoloInput, type CalcoloOutput } from "@/lib/roiCalculator";
import { validatePhone, validateEmail } from "@/lib/validation";
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
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Impianto
  const [tipologia, setTipologia] = useState<"privato" | "azienda">("privato");
  const [provincia, setProvincia] = useState("bologna");
  const [tipoImmobile, setTipoImmobile] = useState<"casa_singola" | "condominio" | "capannone">("casa_singola");
  const [consumoAnnuo, setConsumoAnnuo] = useState("");
  const [spesaAnnua, setSpesaAnnua] = useState("");

  // Solo aziende
  const [mqTetto, setMqTetto] = useState("");
  const [profiloAttivita, setProfiloAttivita] = useState<"diurno" | "misto" | "h24">("diurno");
  const [haImpiantoEsistente, setHaImpiantoEsistente] = useState(false);

  // Qualifica 180% (post-risultato, solo aziende)
  const [qualifica, setQualifica] = useState<Record<string, string>>({});

  const handleStep1Next = () => {
    const pErr = validatePhone(telefono);
    const eErr = validateEmail(email);
    setPhoneError(pErr);
    setEmailError(eErr);
    if (!pErr && !eErr) setStep("impianto");
  };

  const handleCalcola = async () => {
    if (tipologia === "azienda" && haImpiantoEsistente) return;

    const input: CalcoloInput = {
      tipologia,
      provincia,
      consumoAnnuo: Number(consumoAnnuo),
      spesaAnnua: Number(spesaAnnua),
      ...(tipologia === "azienda" && {
        mqTetto: Number(mqTetto),
        profiloAttivita,
      }),
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
          consumo_annuo: Number(consumoAnnuo),
          spesa_annua: Number(spesaAnnua),
          ...(tipologia === "azienda" && {
            mq_tetto: Number(mqTetto),
            profilo_attivita: profiloAttivita,
            ha_impianto_esistente: haImpiantoEsistente,
          }),
          kwp_calcolati: output.kwpCalcolati,
          produzione_annua: output.produzioneAnnua,
          autoconsumo_pct: output.autoconsumoPct,
          autoconsumo_kwh: output.autoconsumoKwh,
          immissione_kwh: output.immissioneKwh,
          prezzo_variabile: output.prezzoEvitato,
          capex_stimato: output.capexStimato,
          risparmio_annuo: output.risparmioAnnuo,
          ricavo_immissione: output.ricavoImmissione,
          irr_base: output.irrBase,
          irr_max: output.irrMax,
          beneficio_incentivi: output.beneficioAnnuo,
          costo_lordo: output.capexStimato,
          costo_netto: output.capexStimato,
          payback_anni: output.paybackAnni,
        },
      });
      if (error) console.error("Errore invio lead:", error);
    } catch (err) {
      console.error("Errore invio lead:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveQualifica = async () => {
    const esito = qualifica.q1 === "si" && qualifica.q2 === "si" && qualifica.q3 === "si" && (qualifica.q4 === "si" || qualifica.q4 === "non_so")
      ? "potenzialmente_idoneo"
      : "verifica_necessaria";

    try {
      // We save qualification result — in a real scenario we'd update the lead
      toast({
        title: esito === "potenzialmente_idoneo"
          ? "Potenzialmente idoneo all'agevolazione fiscale"
          : "Verifica necessaria",
        description: esito === "potenzialmente_idoneo"
          ? "Sulla base delle risposte fornite, l'investimento potrebbe beneficiare dell'agevolazione al 180%."
          : "Per verificare l'idoneità all'agevolazione, contattaci per un approfondimento.",
      });
    } catch (err) {
      console.error("Errore salvataggio qualifica:", err);
    }
  };

  const canProceedStep1 = nome.trim().length > 0 && telefono.trim().length >= 6;
  const canProceedStep2 = Number(consumoAnnuo) > 0 && Number(spesaAnnua) > 0 &&
    (tipologia === "privato" || Number(mqTetto) > 0);

  const isAzienda = tipologia === "azienda";

  // Auto-set tipo immobile when switching tipologia
  const handleTipologiaChange = (t: "privato" | "azienda") => {
    setTipologia(t);
    if (t === "azienda") setTipoImmobile("capannone");
    else if (tipoImmobile === "capannone") setTipoImmobile("casa_singola");
  };

  const qualificaCompleta = qualifica.q1 && qualifica.q2 && qualifica.q3 && qualifica.q4;

  return (
    <Layout>
      <SEOHead
        title="Calcola Rendimento Investimento Fotovoltaico | ROI, Payback e Risparmio | PRM Fotovoltaico"
        description="Calcola gratis il rendimento del tuo investimento fotovoltaico: ROI, tempo di rientro, risparmio annuo e IRR a 25 anni. Simulatore online per privati e aziende a Bologna, Modena, Ferrara e Ravenna."
        keywords="rendimento investimento fotovoltaico, ROI fotovoltaico, calcolo rendimento pannelli solari, tempo rientro investimento fotovoltaico, payback fotovoltaico, risparmio fotovoltaico, simulazione rendimento fotovoltaico, preventivo fotovoltaico gratuito, quanto rende fotovoltaico, investimento fotovoltaico conviene, fotovoltaico ritorno economico, IRR fotovoltaico, calcolo autoconsumo fotovoltaico, preventivo impianti fotovoltaici Emilia Romagna"
        canonicalPath="/calcola-rendimento"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Calcola Rendimento", href: "/calcola-rendimento" },
        ]}
      />
      {/* Hero con layout a 2 colonne */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Colonna sinistra: motivazioni */}
            <div className="lg:pt-4">
              <h1 className="text-3xl md:text-5xl font-heading font-light text-primary mb-4">
                Calcola il Rendimento del Tuo Investimento Fotovoltaico
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Scopri ROI, tempo di rientro e risparmio annuo del tuo impianto fotovoltaico. Simulazione gratuita e personalizzata.
              </p>
              <div className="space-y-4 hidden lg:block">
                {[
                  { icon: "📊", title: "Stima personalizzata", desc: "Basata sui tuoi consumi reali e sulla tua bolletta" },
                  { icon: "💰", title: "Calcolo del rendimento", desc: "Scopri il ritorno sull'investimento e i tempi di rientro" },
                  { icon: "🏠", title: "Per privati e aziende", desc: "Soluzioni su misura per ogni esigenza" },
                  { icon: "📞", title: "Sopralluogo gratuito", desc: "Dopo il calcolo, ti contattiamo per una valutazione precisa" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 bg-card rounded-xl p-4 border border-border">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Colonna destra: form step 1 inline (solo su desktop) */}
            <div className="lg:hidden" />
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
                    <Input value={telefono} onChange={(e) => { setTelefono(e.target.value); setPhoneError(null); }} type="tel" placeholder="333 1234567" className="h-12" maxLength={30} />
                    {phoneError && <p className="text-sm text-destructive mt-1">{phoneError}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email (opzionale)</label>
                    <Input value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(null); }} type="email" placeholder="mario@email.it" className="h-12" maxLength={255} />
                    {emailError && <p className="text-sm text-destructive mt-1">{emailError}</p>}
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button variant="cta" size="lg" className="rounded-full" onClick={handleStep1Next} disabled={!canProceedStep1}>
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
                        <button key={t} onClick={() => handleTipologiaChange(t)} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${tipologia === t ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
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
                    <div className={`grid gap-3 ${isAzienda ? "grid-cols-1" : "grid-cols-2"}`}>
                      {(isAzienda
                        ? [{ value: "capannone" as const, label: "Capannone / Stabilimento" }]
                        : [
                            { value: "casa_singola" as const, label: "Casa singola" },
                            { value: "condominio" as const, label: "Condominio" },
                          ]
                      ).map((t) => (
                        <button key={t.value} onClick={() => setTipoImmobile(t.value)} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${tipoImmobile === t.value ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                          {t.label}
                        </button>
                      ))}
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

                  {/* --- CAMPI SOLO AZIENDE --- */}
                  {isAzienda && (
                    <>
                      {/* m² tetto */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">m² di tetto disponibile *</label>
                        <p className="text-xs text-muted-foreground mb-2">Superficie utile per l'installazione dei pannelli</p>
                        <Input value={mqTetto} onChange={(e) => setMqTetto(e.target.value.replace(/[^0-9]/g, ""))} type="text" inputMode="numeric" placeholder="Es. 500" className="h-12" />
                      </div>

                      {/* Profilo attività */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Profilo attività</label>
                        <div className="grid grid-cols-3 gap-3">
                          {([
                            { value: "diurno" as const, label: "Diurno" },
                            { value: "misto" as const, label: "Misto" },
                            { value: "h24" as const, label: "H24" },
                          ]).map((p) => (
                            <button key={p.value} onClick={() => setProfiloAttivita(p.value)} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${profiloAttivita === p.value ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Impianto esistente */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Hai già un impianto fotovoltaico?</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button onClick={() => setHaImpiantoEsistente(false)} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${!haImpiantoEsistente ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                            No
                          </button>
                          <button onClick={() => setHaImpiantoEsistente(true)} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${haImpiantoEsistente ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                            Sì
                          </button>
                        </div>
                        {haImpiantoEsistente && (
                          <div className="mt-3 p-4 rounded-xl bg-accent border border-border">
                            <div className="flex items-start gap-3">
                              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-foreground mb-1">Ottimizzazione impianto esistente</p>
                                <p className="text-sm text-muted-foreground">
                                  Per valutare l'ottimizzazione del tuo impianto esistente, contattaci direttamente per una consulenza personalizzata.
                                </p>
                                <Button variant="cta" size="sm" className="rounded-full mt-3" asChild>
                                  <a href="tel:+393356117388">
                                    <Phone className="w-4 h-4" /> Chiamaci
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" size="lg" className="rounded-full" onClick={() => setStep("contatto")}>
                    <ArrowLeft className="w-4 h-4" /> Indietro
                  </Button>
                  <Button variant="cta" size="lg" className="rounded-full" onClick={handleCalcola} disabled={!canProceedStep2 || (isAzienda && haImpiantoEsistente)}>
                    Calcola Rendimento <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Risultati */}
            {step === "risultati" && risultati && (
              <div className="animate-fade-in space-y-6">
                {/* Avviso dati incoerenti */}
                {risultati.avvisoDati && (
                  <div className="bg-destructive/10 rounded-xl p-5 border border-destructive/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{risultati.avvisoDati}</p>
                    </div>
                  </div>
                )}

                {/* Card principale */}
                <div className="blue-card text-center">
                  <h2 className="text-2xl md:text-3xl font-heading font-light text-primary-foreground mb-8">
                    {isAzienda ? "Il rendimento stimato del tuo investimento" : "Il tuo ritorno sull'investimento"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-primary-foreground/70 text-sm mb-2">
                        {isAzienda ? "Rendimento stimato fino a" : "Rendimento stimato"}
                      </p>
                      <p className="text-5xl md:text-6xl font-heading font-light text-primary-foreground">
                        {isAzienda ? risultati.irrMax : risultati.irrBase}%
                      </p>
                      <p className="text-primary-foreground/70 text-sm mt-1">annuo (IRR)</p>
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
                    {isAzienda ? (
                      <>Con un rendimento <strong>fino al {risultati.irrMax}% annuo</strong> (scenario massimo con agevolazione fiscale), rientrerai dal tuo investimento in circa <strong>{risultati.paybackAnni} anni</strong>.</>
                    ) : (
                      <>Con un rendimento del <strong>{risultati.irrBase}% annuo</strong>, rientrerai dal tuo investimento in circa <strong>{risultati.paybackAnni} anni</strong>.</>
                    )}
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-accent rounded-xl p-5 border border-border">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong>Nota importante:</strong> Stima preliminare basata sui dati inseriti e su assunzioni standard.
                        {isAzienda && " L'accesso all'agevolazione fiscale (super ammortamento 180%) dipende da requisiti e capienza fiscale."}
                        {" "}I risultati reali dipendono da fattori specifici (orientamento del tetto, ombreggiamenti, tipologia di contratto energetico)
                        che verranno valutati durante il sopralluogo gratuito.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Qualifica 180% — solo aziende */}
                {isAzienda && (
                  <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border">
                    <h3 className="text-xl font-heading font-light text-primary mb-4">
                      Verifica idoneità agevolazione fiscale 180%
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Rispondi a queste domande per una prima valutazione dell'idoneità al super ammortamento.
                    </p>
                    <div className="space-y-4">
                      {[
                        { key: "q1", label: "L'impresa ha sede operativa in Italia?" },
                        { key: "q2", label: "L'investimento è nuovo e strumentale all'attività produttiva?" },
                        { key: "q3", label: "C'è disponibilità a documentazione tecnica e adempimenti (es. perizia/asseverazione)?" },
                        { key: "q4", label: "Prevedi utile/capienza fiscale nei prossimi anni?" },
                      ].map((q) => (
                        <div key={q.key}>
                          <p className="text-sm font-medium text-foreground mb-2">{q.label}</p>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { value: "si", label: "Sì" },
                              { value: "no", label: "No" },
                              { value: "non_so", label: "Non so" },
                            ].map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => setQualifica((prev) => ({ ...prev, [q.key]: opt.value }))}
                                className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                                  qualifica[q.key] === opt.value
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border text-muted-foreground hover:border-primary/50"
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {qualificaCompleta && (
                      <div className="mt-6">
                        <Button variant="cta" size="sm" className="rounded-full" onClick={handleSaveQualifica}>
                          Verifica idoneità
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* CTA */}
                <div className="text-center">
                  <p className="text-lg text-foreground font-medium mb-4">
                    Vuoi una valutazione precisa e personalizzata?
                  </p>
                  <Button variant="cta" size="lg" className="rounded-full" asChild>
                    <a href="tel:+393356117388">
                      <Phone className="w-5 h-5" />
                      Chiamaci: 335 611 7388
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
