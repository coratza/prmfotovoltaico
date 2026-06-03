import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Phone, Calculator, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle,
  Info, Zap, TrendingUp, Clock, Sun, Shield, Award, Users, BarChart3
} from "lucide-react";
import { calcolaROI, type CalcoloInput, type CalcoloOutput } from "@/lib/roiCalculator";
import { validatePhone, validateEmail } from "@/lib/validation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import FAQSection from "@/components/sections/FAQSection";

type Step = "impianto" | "contatto" | "risultati";

const seoFaqs = [
  {
    question: "Quanto produce un impianto fotovoltaico da 6 kW?",
    answer: "Un impianto fotovoltaico da 6 kW in Emilia-Romagna produce mediamente tra 7.200 e 7.600 kWh all'anno, a seconda della provincia, dell'orientamento e dell'inclinazione dei pannelli. A Bologna la producibilità media è di circa 1.250 kWh per kWp installato.",
  },
  {
    question: "Quanto si risparmia con il fotovoltaico?",
    answer: "Il risparmio dipende dai consumi, dalla quota di autoconsumo e dal costo dell'energia. Mediamente una famiglia italiana risparmia tra il 50% e il 70% sulla bolletta elettrica. Per un'azienda con consumi diurni il risparmio può superare l'80%. Usa il nostro simulatore per un calcolo personalizzato.",
  },
  {
    question: "Quanto costa installare un impianto fotovoltaico?",
    answer: "Il costo di un impianto fotovoltaico varia in base alla potenza e alla complessità dell'installazione. Per ottenere un preventivo accurato basato sulle tue esigenze specifiche, utilizza il nostro calcolatore gratuito o contattaci per un sopralluogo senza impegno.",
  },
  {
    question: "Quanto dura un impianto fotovoltaico?",
    answer: "I pannelli fotovoltaici moderni hanno una vita utile di 25-30 anni con garanzia di produzione all'80% dopo 25 anni. Gli inverter durano mediamente 10-15 anni. La manutenzione ordinaria è minima: pulizia periodica e controllo dell'impianto.",
  },
  {
    question: "Conviene ancora installare il fotovoltaico nel 2025?",
    answer: "Sì, il fotovoltaico conviene ancora nel 2025. Il costo dei pannelli è sceso del 70% negli ultimi 10 anni, le detrazioni fiscali del 50% sono ancora attive per i privati, e le aziende possono beneficiare del super ammortamento al 180%. Il tempo di rientro dell'investimento è mediamente tra 5 e 8 anni.",
  },
  {
    question: "Cosa succede all'energia che non consumo?",
    answer: "L'energia prodotta e non autoconsumata viene immessa in rete e remunerata attraverso lo Scambio Sul Posto (SSP) o il Ritiro Dedicato (RID). Il ricavo è inferiore al prezzo di acquisto, per questo è importante massimizzare l'autoconsumo, eventualmente con un sistema di accumulo a batterie.",
  },
];

const CalcolaPreventivo = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("impianto");
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

  // Step 1: Impianto → Step 2: Contatto
  const handleStep1Next = () => {
    if (canProceedStep1) setStep("contatto");
  };

  // Step 2: Contatto → Calcola e mostra risultati
  const handleCalcola = async () => {
    const pErr = validatePhone(telefono);
    const eErr = validateEmail(email);
    setPhoneError(pErr);
    setEmailError(eErr);
    if (pErr || eErr) return;

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
      if (error) {
        console.error("Errore invio lead:", error);
      } else {
        // Google Ads conversion tracking via GTM dataLayer
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: "form_submission",
            conversionId: "AW-17965756122",
            conversionLabel: "bjZICKmLw58cENrd3vZC",
          });
        }
        fireGoogleAdsLeadConversion();
      }
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

  const canProceedStep1 = Number(consumoAnnuo) > 0 && Number(spesaAnnua) > 0 &&
    (tipologia === "privato" || Number(mqTetto) > 0);
  const canProceedStep2 = nome.trim().length > 0 && telefono.trim().length >= 6;

  const isAzienda = tipologia === "azienda";

  const handleTipologiaChange = (t: "privato" | "azienda") => {
    setTipologia(t);
    if (t === "azienda") setTipoImmobile("capannone");
    else if (tipoImmobile === "capannone") setTipoImmobile("casa_singola");
  };

  const qualificaCompleta = qualifica.q1 && qualifica.q2 && qualifica.q3 && qualifica.q4;

  const scrollToCalc = () => {
    document.getElementById("calcolatore")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <SEOHead
        title="Calcolo Rendimento Fotovoltaico Gratis | Simulatore ROI Online | PRM Fotovoltaico"
        description="Calcola gratis il rendimento del tuo impianto fotovoltaico: produzione kWh, risparmio annuo, ROI e payback. Simulatore online per privati e aziende in Emilia-Romagna."
        keywords="calcolo rendimento fotovoltaico, rendimento fotovoltaico, simulatore fotovoltaico gratis, quanto rende fotovoltaico, calcolo ROI fotovoltaico, quanto produce impianto fotovoltaico, quanto si risparmia con pannelli solari, simulazione fotovoltaico online, preventivo fotovoltaico gratuito, rendimento pannelli solari, calcolo risparmio fotovoltaico, fotovoltaico conviene"
        canonicalPath="/calcola-rendimento"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Calcolo Rendimento Fotovoltaico", href: "/calcola-rendimento" },
        ]}
        faqs={seoFaqs}
        softwareApp={{
          name: "Calcolo Rendimento Fotovoltaico – Simulatore Gratuito PRM",
          description: "Calcola gratis il rendimento del tuo impianto fotovoltaico: produzione annua in kWh, risparmio in bolletta, ROI e tempo di rientro dell'investimento. Simulatore online per privati e aziende.",
          url: "https://prmfotovoltaico.com/calcola-rendimento",
          category: "UtilitiesApplication",
        }}
      />

      {/* ══════════ HERO ══════════ */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="container-custom relative z-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div className="text-primary-foreground">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/15 rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
                <Calculator className="w-4 h-4" />
                Calcolo gratuito — risultato immediato
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light leading-tight mb-5">
                Calcola il rendimento del fotovoltaico sul tuo tetto
              </h1>
              <p className="text-lg text-primary-foreground/85 mb-8 leading-relaxed max-w-xl">
                Inserisci i dati del tuo immobile e scopri subito produzione, risparmio e tempo di rientro dell'investimento.
              </p>

              {/* Micro-benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Sun, text: "Quanta energia produce il tuo tetto" },
                  { icon: TrendingUp, text: "Quanto risparmi ogni anno" },
                  { icon: BarChart3, text: "Quanto costa l'impianto" },
                  { icon: Clock, text: "Quando rientra l'investimento" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-primary-foreground/90">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button
                size="xl"
                className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-strong font-semibold"
                onClick={scrollToCalc}
              >
                <Calculator className="w-5 h-5" />
                Calcola il tuo rendimento
              </Button>
            </div>

            {/* Right: social proof summary */}
            <div className="hidden lg:block">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 border border-primary-foreground/15">
                <p className="text-primary-foreground/70 text-sm uppercase tracking-wider mb-6 font-medium">Con il calcolo scopri:</p>
                <div className="space-y-5">
                  {[
                    { icon: Zap, title: "Produzione energetica", desc: "Stima personalizzata basata sulla tua posizione e consumi reali" },
                    { icon: TrendingUp, title: "Risparmio in bolletta", desc: "Calcolo preciso della riduzione della tua spesa energetica" },
                    { icon: Clock, title: "Tempo di rientro", desc: "Scopri in quanti anni recuperi l'investimento" },
                    { icon: BarChart3, title: "ROI a 25 anni", desc: "Rendimento annuo del tuo investimento fotovoltaico" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-foreground/15 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary-foreground text-sm">{item.title}</h3>
                        <p className="text-xs text-primary-foreground/70 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CALCULATOR ══════════ */}
      <section id="calcolatore" className="section-padding scroll-mt-4">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {[
                { key: "impianto", label: "Immobile" },
                { key: "contatto", label: "Contatto" },
                { key: "risultati", label: "Risultati" },
              ].map((s, i) => (
                <div key={s.key} className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step === s.key
                      ? "bg-primary text-primary-foreground"
                      : (["impianto", "contatto", "risultati"].indexOf(step) > i
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground")
                  }`}>
                    {["impianto", "contatto", "risultati"].indexOf(step) > i ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground hidden sm:block">{s.label}</span>
                  {i < 2 && <div className="w-10 h-px bg-border" />}
                </div>
              ))}
            </div>

            {/* ══════════ Step 1: Dati Immobile ══════════ */}
            {step === "impianto" && (
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-medium border border-border animate-fade-in">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-heading font-light text-primary mb-2">Inserisci i dati del tuo immobile</h2>
                  <p className="text-sm text-muted-foreground">Trovi questi dati sulla tua bolletta elettrica. Ci vogliono 30 secondi.</p>
                </div>
                <div className="space-y-5">
                  {/* Tipologia */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sei un privato o un'azienda?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {(["privato", "azienda"] as const).map((t) => (
                        <button key={t} onClick={() => handleTipologiaChange(t)} className={`p-3 rounded-xl border text-sm font-medium transition-colors ${tipologia === t ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                          {t === "privato" ? "🏠 Privato" : "🏭 Azienda"}
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
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Info className="w-3 h-3" /> Puoi trovare questo dato nella tua bolletta elettrica o nella sintesi dei consumi.
                    </p>
                    <Input value={consumoAnnuo} onChange={(e) => setConsumoAnnuo(e.target.value.replace(/[^0-9]/g, ""))} type="text" inputMode="numeric" placeholder="Es. 3500" className="h-12" />
                  </div>

                  {/* Spesa annua */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Spesa annua bolletta (€) *</label>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Info className="w-3 h-3" /> La spesa totale annua che paghi per l'energia elettrica.
                    </p>
                    <Input value={spesaAnnua} onChange={(e) => setSpesaAnnua(e.target.value.replace(/[^0-9]/g, ""))} type="text" inputMode="numeric" placeholder="Es. 800" className="h-12" />
                  </div>

                  {/* --- CAMPI SOLO AZIENDE --- */}
                  {isAzienda && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">m² di tetto disponibile *</label>
                        <p className="text-xs text-muted-foreground mb-2">Superficie utile per l'installazione dei pannelli</p>
                        <Input value={mqTetto} onChange={(e) => setMqTetto(e.target.value.replace(/[^0-9]/g, ""))} type="text" inputMode="numeric" placeholder="Es. 500" className="h-12" />
                      </div>

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

                <div className="mt-8 flex justify-end">
                  <Button variant="cta" size="lg" className="rounded-full w-full sm:w-auto" onClick={handleStep1Next} disabled={!canProceedStep1 || (isAzienda && haImpiantoEsistente)}>
                    Avanti <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ══════════ Step 2: Contatto ══════════ */}
            {step === "contatto" && (
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-medium border border-border animate-fade-in">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-heading font-light text-primary mb-2">Ultimo passaggio: i tuoi dati</h2>
                  <p className="text-sm text-muted-foreground">Inserisci il tuo contatto per ricevere il calcolo del rendimento e il report personalizzato.</p>
                </div>

                {/* Anticipazione valore */}
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Il tuo calcolo è quasi pronto</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Vedrai subito: produzione kWh, risparmio annuo, ROI e tempo di rientro dell'investimento.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Nome e Cognome *</label>
                    <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Mario Rossi" className="h-12" maxLength={200} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Telefono *</label>
                    <Input value={telefono} onChange={(e) => { setTelefono(e.target.value); setPhoneError(null); }} type="tel" placeholder="333 1234567" className="h-12" maxLength={30} />
                    {phoneError && <p className="text-sm text-destructive mt-1">{phoneError}</p>}
                    <p className="text-xs text-muted-foreground mt-1">Per inviarti il report e fissare il sopralluogo gratuito.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Email <span className="text-muted-foreground font-normal">(opzionale)</span></label>
                    <Input value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(null); }} type="email" placeholder="mario@email.it" className="h-12" maxLength={255} />
                    {emailError && <p className="text-sm text-destructive mt-1">{emailError}</p>}
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
                  <Button variant="outline" size="lg" className="rounded-full" onClick={() => setStep("impianto")}>
                    <ArrowLeft className="w-4 h-4" /> Indietro
                  </Button>
                  <Button variant="cta" size="lg" className="rounded-full text-sm sm:text-base" onClick={handleCalcola} disabled={!canProceedStep2 || isSubmitting}>
                    {isSubmitting ? "Calcolo in corso..." : (
                      <>
                        <Calculator className="w-5 h-5" /> Scopri il tuo rendimento
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" /> Nessun impegno. Dati protetti e mai condivisi con terzi.
                </p>
              </div>
            )}

            {/* ══════════ Step 3: Risultati ══════════ */}
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

                {/* Main results cards */}
                <div className="blue-card">
                  <h2 className="text-2xl md:text-3xl font-heading font-light text-primary-foreground text-center mb-8">
                    Il tuo risparmio stimato con il fotovoltaico
                  </h2>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-primary-foreground/10 rounded-2xl p-5 text-center">
                      <TrendingUp className="w-6 h-6 text-primary-foreground/70 mx-auto mb-2" />
                      <p className="text-3xl md:text-4xl font-heading font-light text-primary-foreground">
                        {isAzienda ? risultati.irrMax : risultati.irrBase}%
                      </p>
                      <p className="text-primary-foreground/70 text-xs mt-1">
                        {isAzienda ? "Rendimento annuo (fino a)" : "Rendimento annuo (IRR)"}
                      </p>
                    </div>
                    <div className="bg-primary-foreground/10 rounded-2xl p-5 text-center">
                      <Clock className="w-6 h-6 text-primary-foreground/70 mx-auto mb-2" />
                      <p className="text-3xl md:text-4xl font-heading font-light text-primary-foreground">
                        {risultati.paybackAnni} <span className="text-lg">anni</span>
                      </p>
                      <p className="text-primary-foreground/70 text-xs mt-1">Rientro investimento</p>
                    </div>
                  </div>

                  {/* Detailed metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Produzione annua", value: `${risultati.produzioneAnnua.toLocaleString("it-IT")} kWh`, icon: Sun },
                      { label: "Risparmio annuo", value: `€ ${risultati.risparmioAnnuo.toLocaleString("it-IT")}`, icon: TrendingUp },
                      { label: "Autoconsumo", value: `${risultati.autoconsumoPct}%`, icon: Zap },
                      { label: "Impianto", value: `${risultati.kwpCalcolati} kWp`, icon: BarChart3 },
                    ].map((item) => (
                      <div key={item.label} className="bg-primary-foreground/5 rounded-xl p-3 text-center">
                        <item.icon className="w-4 h-4 text-primary-foreground/60 mx-auto mb-1" />
                        <p className="text-lg font-heading font-light text-primary-foreground">{item.value}</p>
                        <p className="text-primary-foreground/60 text-[10px] mt-0.5">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary text */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
                  <h3 className="text-lg font-medium text-foreground mb-3">Riepilogo della tua simulazione</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {isAzienda ? (
                      <>Con un impianto da <strong>{risultati.kwpCalcolati} kWp</strong>, la tua azienda può produrre circa <strong>{risultati.produzioneAnnua.toLocaleString("it-IT")} kWh</strong> all'anno, risparmiando <strong>€ {risultati.risparmioAnnuo.toLocaleString("it-IT")}</strong> sulla bolletta. Con un rendimento <strong>fino al {risultati.irrMax}% annuo</strong> (scenario massimo con agevolazione fiscale), l'investimento rientra in circa <strong>{risultati.paybackAnni} anni</strong>.</>
                    ) : (
                      <>Con un impianto da <strong>{risultati.kwpCalcolati} kWp</strong>, il tuo tetto può produrre circa <strong>{risultati.produzioneAnnua.toLocaleString("it-IT")} kWh</strong> all'anno, riducendo la bolletta di <strong>€ {risultati.risparmioAnnuo.toLocaleString("it-IT")}</strong> all'anno. Con un rendimento del <strong>{risultati.irrBase}% annuo</strong>, l'investimento rientra in circa <strong>{risultati.paybackAnni} anni</strong>.</>
                    )}
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="bg-accent rounded-xl p-5 border border-border">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong>Nota:</strong> Stima preliminare basata sui dati inseriti e su assunzioni standard.
                        {isAzienda && " L'accesso all'agevolazione fiscale (super ammortamento 180%) dipende da requisiti e capienza fiscale."}
                        {" "}I risultati reali dipendono da fattori specifici (orientamento del tetto, ombreggiamenti, contratto energetico)
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

                {/* ══════════ LEAD CAPTURE CTA ══════════ */}
                <div className="bg-primary rounded-2xl p-8 text-center text-primary-foreground">
                  <h3 className="text-2xl font-heading font-light mb-3">
                    Vuoi il report completo per il tuo tetto?
                  </h3>
                  <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto text-sm">
                    Ricevi gratuitamente: dimensionamento dell'impianto, stima del risparmio a 25 anni e consulenza personalizzata con sopralluogo incluso.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold" asChild>
                      <a href="tel:+393356117388">
                        <Phone className="w-5 h-5" />
                        Chiamaci: 335 611 7388
                      </a>
                    </Button>
                    <Button size="lg" className="rounded-full border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                      <Link to="/contatti">
                        Richiedi sopralluogo gratuito
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                  <p className="text-xs text-primary-foreground/60 mt-4">
                    Sopralluogo gratuito e senza impegno in tutta l'Emilia-Romagna.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════ TRUST SECTION ══════════ */}
      <section className="py-12 bg-accent border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Award, number: "+100", label: "Impianti installati" },
              { icon: Shield, number: "10+", label: "Anni di esperienza" },
              { icon: Users, number: "100%", label: "Clienti soddisfatti" },
              { icon: CheckCircle, number: "25 anni", label: "Garanzia pannelli" },
            ].map((item) => (
              <div key={item.label}>
                <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-heading font-light text-foreground">{item.number}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SEO CONTENT ══════════ */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose-custom">
            <h2 className="text-3xl font-heading font-light text-primary mb-6">
              Come calcolare il rendimento di un impianto fotovoltaico
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Il <strong>rendimento di un impianto fotovoltaico</strong> dipende da diversi fattori che interagiscono tra loro. Il nostro simulatore tiene conto dei principali parametri per fornirti una stima realistica e personalizzata del risparmio che puoi ottenere con il fotovoltaico.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Il calcolo parte dai tuoi <strong>consumi reali</strong> e dalla tua bolletta per dimensionare l'impianto in modo ottimale. Viene poi stimata la produzione energetica in base alla <strong>producibilità specifica della tua zona</strong> (espressa in kWh per kWp installato), che varia da provincia a provincia in Emilia-Romagna.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              La quota di autoconsumo — ovvero l'energia prodotta e utilizzata direttamente — è il fattore più importante per il <strong>risparmio economico del fotovoltaico</strong>. Maggiore è l'autoconsumo, più rapido è il ritorno sull'investimento. Per le aziende con profilo di consumo diurno, l'autoconsumo può raggiungere l'80%, rendendo il fotovoltaico particolarmente conveniente.
            </p>

            <h2 className="text-3xl font-heading font-light text-primary mb-6">
              Quanto produce un impianto fotovoltaico in Emilia-Romagna
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              La <strong>produzione di un impianto fotovoltaico</strong> dipende principalmente dalla posizione geografica, dall'orientamento dei pannelli (ideale è il sud), dall'inclinazione (tra 25° e 35° è ottimale) e dalla presenza di eventuali ombreggiamenti.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In Emilia-Romagna, la producibilità media si attesta intorno ai <strong>1.200–1.270 kWh per kWp</strong> installato all'anno. Questo significa che un <strong>impianto da 6 kWp a Bologna</strong> produce mediamente circa 7.500 kWh all'anno, sufficienti a coprire i consumi di una famiglia di 4 persone.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Le province con la migliore irradiazione in regione sono <strong>Modena</strong> (1.270 kWh/kWp) e <strong>Bologna</strong> (1.250 kWh/kWp), seguite da Ferrara (1.230 kWh/kWp) e Ravenna (1.200 kWh/kWp). Queste differenze, seppur contenute, influenzano il dimensionamento ottimale dell'impianto.
            </p>

            <h2 className="text-3xl font-heading font-light text-primary mb-6">
              Quanto si risparmia con il fotovoltaico
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Il <strong>risparmio con il fotovoltaico</strong> deriva dalla riduzione della bolletta elettrica attraverso l'autoconsumo dell'energia prodotta. Ogni kWh che produci e consumi direttamente è un kWh che non acquisti dalla rete, al prezzo variabile della tua tariffa.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              L'energia prodotta in eccesso viene immessa in rete e remunerata attraverso lo <strong>Scambio Sul Posto</strong> o il <strong>Ritiro Dedicato</strong>, con un ricavo parziale. Per massimizzare il risparmio, è fondamentale ottimizzare l'autoconsumo: spostare i carichi energetici (lavatrice, lavastoviglie, ricarica auto elettrica) nelle ore di produzione solare.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Per un'analisi completa del tuo potenziale risparmio, il nostro <strong>calcolatore di rendimento fotovoltaico</strong> calcola il beneficio annuo combinando risparmio da autoconsumo e ricavo da immissione in rete, fornendoti anche il <strong>tempo di rientro dell'investimento</strong> e il <strong>rendimento annuo (IRR)</strong> a 25 anni.
            </p>

            <h2 className="text-3xl font-heading font-light text-primary mb-6">
              Quanto costa un impianto fotovoltaico nel 2025
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Il <strong>costo di un impianto fotovoltaico</strong> dipende dalla potenza installata, dalla tipologia di pannelli, dalla complessità dell'installazione e dagli accessori scelti (come sistemi di accumulo a batterie o ottimizzatori di potenza).
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Il costo unitario (€/kWp) diminuisce all'aumentare della potenza dell'impianto, rendendo gli impianti più grandi proporzionalmente più convenienti. Per i privati, sono disponibili le <Link to="/agevolazioni/detrazioni-privati" className="text-primary hover:underline font-medium">detrazioni fiscali del 50%</Link> che dimezzano il costo effettivo dell'investimento. Per le aziende, il <Link to="/agevolazioni/agevolazioni-aziende" className="text-primary hover:underline font-medium">super ammortamento al 180%</Link> offre un significativo vantaggio fiscale.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Per conoscere il costo specifico per il tuo caso, utilizza il <strong>calcolatore di rendimento</strong> qui sopra o <Link to="/contatti" className="text-primary hover:underline font-medium">richiedi un sopralluogo gratuito</Link>. Ogni impianto è progettato su misura per massimizzare il rendimento e il risparmio.
            </p>

            <h2 className="text-3xl font-heading font-light text-primary mb-6">
              Conviene installare il fotovoltaico nel 2025?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Sì, il 2025 è un anno particolarmente favorevole per investire nel fotovoltaico. Il <strong>costo dei pannelli solari</strong> è sceso drasticamente negli ultimi anni, mentre l'efficienza è aumentata. I pannelli di ultima generazione hanno efficienze superiori al 22%, producendo più energia con meno spazio sul tetto.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Gli <strong>incentivi fiscali</strong> sono ancora attivi: le detrazioni al 50% per i privati e il super ammortamento per le aziende rendono l'investimento ancora più competitivo. Il tempo medio di rientro dell'investimento è compreso tra 5 e 8 anni, con un rendimento annuo che può superare il 10%.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Con i prezzi dell'energia che rimangono volatili e tendenzialmente in crescita, il fotovoltaico rappresenta una protezione contro i rincari futuri. Un impianto installato oggi continuerà a produrre energia gratuita per almeno 25-30 anni, con costi di manutenzione minimi.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Se stai valutando l'installazione, <strong>non aspettare</strong>: gli incentivi potrebbero ridursi nei prossimi anni. <Link to="/contatti" className="text-primary hover:underline font-medium">Contattaci per un sopralluogo gratuito</Link> e scopri quanto puoi risparmiare.
            </p>

            {/* Internal linking block */}
            <div className="bg-accent rounded-2xl p-6 border border-border not-prose">
              <h3 className="text-lg font-heading font-light text-primary mb-4">Approfondimenti utili</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { to: "/fotovoltaico-privati", label: "Fotovoltaico per privati" },
                  { to: "/fotovoltaico-aziende", label: "Fotovoltaico per aziende" },
                  { to: "/agevolazioni/detrazioni-privati", label: "Detrazioni fiscali 50% privati" },
                  { to: "/agevolazioni/agevolazioni-aziende", label: "Agevolazioni fiscali aziende" },
                  { to: "/lavori-realizzati", label: "I nostri lavori realizzati" },
                  { to: "/contatti", label: "Richiedi un sopralluogo gratuito" },
                ].map((link) => (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 text-sm text-primary hover:underline font-medium p-2 rounded-lg hover:bg-primary/5 transition-colors">
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <FAQSection faqs={seoFaqs} />

      {/* ══════════ BOTTOM CTA ══════════ */}
      <section className="py-16 bg-primary">
        <div className="container-custom text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-heading font-light mb-4">
            Pronto a scoprire quanto rende il fotovoltaico?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Usa il nostro calcolatore gratuito oppure chiamaci per un sopralluogo senza impegno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold" onClick={scrollToCalc}>
              <Calculator className="w-5 h-5" />
              Calcola il tuo rendimento
            </Button>
            <Button size="lg" className="rounded-full border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href="tel:+393356117388">
                <Phone className="w-5 h-5" />
                335 611 7388
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CalcolaPreventivo;