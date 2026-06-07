import { useState, useEffect, useMemo } from "react";
import { Phone, Home, Euro, Award, Clock, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { validatePhone } from "@/lib/validation";
import { fireGoogleAdsLeadConversion } from "@/lib/tracking";
import prmLogo from "@/assets/prm-logo-round.png";

const PHONE_DISPLAY = "335 611 7388";
const PHONE_TEL = "+393356117388";
const WA_HERO = "https://wa.me/393356117388?text=Ciao%2C%20vorrei%20un%20preventivo%20per%20un%20impianto%20fotovoltaico";
const WA_FORM = "https://wa.me/393356117388?text=Buongiorno%2C%20vorrei%20un%20preventivo%20fotovoltaico%20a%20Bologna.";

const pushDL = (payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
};

const bollettaToValues = (v: string) => {
  switch (v) {
    case "fino100": return { spesa: 1200, consumo: 2400 };
    case "100_200": return { spesa: 1800, consumo: 3600 };
    case "200_350": return { spesa: 3300, consumo: 6600 };
    case "oltre350": return { spesa: 4800, consumo: 9600 };
    default: return { spesa: 1800, consumo: 3600 };
  }
};

const tipoToValues = (v: string): { tipologia: "privato" | "azienda"; tipo_immobile: string } => {
  switch (v) {
    case "casa_indipendente": return { tipologia: "privato", tipo_immobile: "casa_singola" };
    case "appartamento": return { tipologia: "privato", tipo_immobile: "appartamento" };
    case "azienda": return { tipologia: "azienda", tipo_immobile: "capannone" };
    default: return { tipologia: "privato", tipo_immobile: "altro" };
  }
};

const PreventivoBologna = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    nome: "",
    telefono: "",
    comune: "",
    tipo: "",
    bolletta: "",
    note: "",
  });

  const utm = useMemo(() => {
    if (typeof window === "undefined") return { utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "" };
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get("utm_source") || "",
      utm_medium: p.get("utm_medium") || "",
      utm_campaign: p.get("utm_campaign") || "",
      utm_term: p.get("utm_term") || "",
    };
  }, []);

  useEffect(() => {
    pushDL({ event: "page_view_landing", ...utm, page: "landing_preventivo_bologna" });
  }, [utm]);

  const handleCallClick = (source = "landing_preventivo_bologna") =>
    pushDL({ event: "call_click", page: "landing_preventivo_bologna", source, ...utm });

  const handleWhatsAppClick = (source: string) =>
    pushDL({ event: "whatsapp_click", page: "landing_preventivo_bologna", source, ...utm });

  const updateField = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const goToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.nome.trim() || !form.telefono.trim() || !form.comune.trim()) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }
    const pErr = validatePhone(form.telefono.trim());
    if (pErr) { setError(pErr); return; }
    pushDL({ event: "form_step1_complete", page: "landing_preventivo_bologna", ...utm });
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.tipo || !form.bolletta) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }

    const { spesa, consumo } = bollettaToValues(form.bolletta);
    const { tipologia, tipo_immobile } = tipoToValues(form.tipo);

    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        nome: form.nome.trim(),
        telefono: form.telefono.trim(),
        tipologia,
        provincia: "bologna",
        tipo_immobile,
        consumo_annuo: consumo,
        spesa_annua: spesa,
        note: `[Landing Bologna] Comune: ${form.comune.trim()}. ${form.note}`.trim(),
      };
      if (tipologia === "azienda") {
        payload.mq_tetto = 100;
        payload.profilo_attivita = "non_specificato";
      }

      const { error: fnErr } = await supabase.functions.invoke("save-lead", { body: payload });
      if (fnErr) {
        setError("Errore nell'invio. Riprova o chiamaci direttamente.");
      } else {
        setSubmitted(true);
        pushDL({
          event: "lead_form_submit",
          page: "landing_preventivo_bologna",
          ...utm,
          conversionId: "AW-17965756122",
          conversionLabel: "bjZICKmLw58cENrd3vZC",
        });
        fireGoogleAdsLeadConversion();
      }
    } catch (err) {
      console.error(err);
      setError("Errore di connessione. Riprova o chiamaci direttamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full rounded-lg border border-input bg-background px-3 py-3 min-h-[52px]";
  const inputStyle = { fontSize: "16px" } as const;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 md:pb-0">
      <SEOHead
        title="Preventivo Fotovoltaico Bologna Gratis | PRM Fotovoltaico"
        description="Impianto fotovoltaico a Bologna chiavi in mano. Ingegnere dedicato, prezzi fissi, sopralluogo gratuito. Ti richiamiamo entro poche ore."
        canonicalPath="/preventivo-bologna"
      />

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <img src={prmLogo} alt="PRM Fotovoltaico" className="h-10 w-10 rounded-full" loading="eager" />
            <span className="font-bold text-primary text-base sm:text-lg truncate">PRM Fotovoltaico</span>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={() => handleCallClick("header")}
            className="inline-flex items-center gap-2 bg-cta text-cta-foreground font-bold rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base shadow-cta hover:bg-cta-hover transition-colors min-h-[44px] whitespace-nowrap"
            aria-label="Chiama ora"
          >
            <Phone className="h-4 w-4" fill="currentColor" />
            <span>Chiama Ora</span>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        className="text-white px-4 py-10 md:py-16"
        style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            <span className="block">Fotovoltaico a Bologna</span>
            <span className="block">Con un Ingegnere Vero,</span>
            <span className="block">Non un Call Center</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
            PRM segue ogni impianto dall'inizio alla fine. Preventivo trasparente, nessuna sorpresa sul prezzo, assistenza reale dopo l'installazione. Siamo di Bologna, ci trovi sempre.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6">
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => handleCallClick("hero")}
              className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-cta-foreground font-bold rounded-lg px-6 text-base sm:text-lg shadow-strong min-h-[56px] transition-colors"
            >
              <Phone className="h-5 w-5" />
              Chiama Subito
            </a>
            <a
              href={WA_HERO}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick("hero")}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border-2 border-white text-white font-bold rounded-lg px-6 text-base sm:text-lg min-h-[56px] transition-colors"
            >
              <MessageCircle className="h-5 w-5" fill="currentColor" />
              Scrivici su WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm sm:text-base text-white/95">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-300" /> Ingegnere dedicato a te</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-300" /> Prezzi fissi, zero sorprese</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-300" /> Assistenza post-installazione</span>
          </div>
          <p className="mt-3 text-xs sm:text-sm text-white/85">
            📍 Azienda di Bologna, non un call center nazionale
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-slate-50 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
            {[
              { n: "50+", l: "Impianti Installati" },
              { n: "5★", l: "Valutazione Media" },
              { n: "10+", l: "Anni di Esperienza" },
            ].map((s) => (
              <div key={s.l} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-border">
                <div className="text-2xl sm:text-4xl font-extrabold text-primary">{s.n}</div>
                <div className="text-xs sm:text-base text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm sm:text-base text-muted-foreground mt-5">
            Ogni cliente ha un riferimento diretto. Nessun ticket, nessun call center.
          </p>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8">
            Perché scegliere PRM Fotovoltaico?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { Icon: Award, t: "Un Ingegnere, Non un Venditore", d: "Riccardo Navone segue personalmente ogni progetto. Non parliamo con te una volta per vendere e poi sparire. Siamo presenti dalla progettazione al giorno in cui il tuo impianto va in funzione." },
              { Icon: Euro, t: "Prezzi Chiari, Nessuna Sorpresa", d: "Il preventivo che firmi è quello che paghi. Niente voci che lievitano a lavoro iniziato, niente costi nascosti. Se emerge qualcosa di imprevisto, te lo diciamo prima, non dopo." },
              { Icon: Home, t: "Siamo di Bologna, Non Passiamo e Basta", d: "Non siamo una grande azienda che manda squadre da fuori regione. Siamo un'azienda bolognese con un numero diretto e una persona responsabile. Se hai un problema dopo l'installazione, rispondiamo." },
              { Icon: Clock, t: "Assistenza Reale Dopo l'Installazione", d: "Molti installatori finiscono il lavoro e spariscono. Noi no. Monitoraggio, manutenzione, assistenza tecnica: siamo il tuo punto di riferimento per tutta la vita dell'impianto." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="border border-border rounded-xl p-5 bg-card hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-3">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-1.5 text-foreground">{t}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form-preventivo" className="px-4 py-10 md:py-14" style={{ backgroundColor: "#eff6ff" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">
            Richiedi il tuo Preventivo Gratuito
          </h2>
          <p className="text-center text-base text-muted-foreground mb-6">
            Richiedi il tuo preventivo in 1 minuto. Ti ricontattiamo entro poche ore.
          </p>

          {submitted ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-green-900 mb-3">
                ✅ Richiesta inviata correttamente!
              </h3>
              <p className="text-base text-green-900 mb-2 leading-relaxed">
                Grazie {form.nome.split(" ")[0] || ""}! Abbiamo ricevuto la tua richiesta per <strong>{form.comune || "Bologna"}</strong>.
              </p>
              <p className="text-base text-green-900 mb-4 leading-relaxed">
                Il nostro ingegnere <strong>ti ricontatterà entro poche ore</strong> (orari ufficio: lun–ven 9:00–18:00) per fissare il sopralluogo gratuito.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                <a
                  href={`tel:${PHONE_TEL}`}
                  onClick={() => handleCallClick("success")}
                  className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-cta-foreground font-bold rounded-lg px-5 py-3 min-h-[52px] text-base shadow-cta transition-colors"
                >
                  <Phone className="h-5 w-5" fill="currentColor" /> Chiama {PHONE_DISPLAY}
                </a>
                <a
                  href={WA_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleWhatsAppClick("success")}
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg px-5 py-3 min-h-[52px] text-base transition-colors"
                >
                  <MessageCircle className="h-5 w-5" fill="currentColor" /> WhatsApp
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                  setForm({ nome: "", telefono: "", comune: "", tipo: "", bolletta: "", note: "" });
                  setError(null);
                  document.getElementById("form-preventivo")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm font-semibold text-primary underline hover:no-underline"
              >
                Invia un'altra richiesta
              </button>
            </div>

          ) : (
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md border border-border">
              {/* Progress bar — solo allo step 2 */}
              {step === 2 && (
                <div className="mb-5">
                  <div className="text-xs font-semibold text-muted-foreground mb-1.5">
                    Passo 2 di 2
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-300" style={{ width: "100%" }} />
                  </div>
                </div>
              )}

              {step === 1 ? (
                <form onSubmit={goToStep2} className="space-y-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-semibold mb-1.5">Nome e Cognome *</label>
                    <input id="nome" name="nome" type="text" required placeholder="Mario Rossi"
                      value={form.nome} onChange={updateField("nome")} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-semibold mb-1.5">Numero di Telefono *</label>
                    <input id="telefono" name="telefono" type="tel" required placeholder="+39 333 000 0000"
                      value={form.telefono} onChange={updateField("telefono")} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="comune" className="block text-sm font-semibold mb-1.5">Comune *</label>
                    <input id="comune" name="comune" type="text" required placeholder="Bologna, San Lazzaro, Casalecchio..."
                      value={form.comune} onChange={updateField("comune")} className={inputCls} style={inputStyle} />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-red-800" style={{ fontSize: "16px" }} role="alert" aria-live="polite">{error}</div>
                  )}

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-cta-foreground font-bold rounded-lg px-6 py-4 min-h-[56px] shadow-cta transition-colors"
                    style={inputStyle}
                  >
                    Continua <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="tipo" className="block text-sm font-semibold mb-1.5">Tipologia Immobile *</label>
                    <select id="tipo" name="tipo" required value={form.tipo} onChange={updateField("tipo")}
                      className={inputCls} style={inputStyle}>
                      <option value="" disabled>Seleziona...</option>
                      <option value="casa_indipendente">Casa indipendente</option>
                      <option value="appartamento">Appartamento con giardino/terrazzo</option>
                      <option value="azienda">Azienda/Capannone</option>
                      <option value="altro">Altro</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="bolletta" className="block text-sm font-semibold mb-1.5">Bolletta Mensile Media *</label>
                    <select id="bolletta" name="bolletta" required value={form.bolletta} onChange={updateField("bolletta")}
                      className={inputCls} style={inputStyle}>
                      <option value="" disabled>Seleziona...</option>
                      <option value="fino100">Fino a €100</option>
                      <option value="100_200">€100-200</option>
                      <option value="200_350">€200-350</option>
                      <option value="oltre350">Oltre €350</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="note" className="block text-sm font-semibold mb-1.5">Note (opzionale)</label>
                    <textarea id="note" name="note" rows={3}
                      value={form.note} onChange={updateField("note")}
                      placeholder="Es: ho già un preventivo da confrontare, voglio anche l'accumulo..."
                      className="w-full rounded-lg border border-input bg-background px-3 py-3" style={inputStyle} />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-red-800" style={{ fontSize: "16px" }} role="alert" aria-live="polite">{error}</div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => { setError(null); setStep(1); }}
                      className="inline-flex items-center justify-center gap-2 bg-white border-2 border-input text-foreground font-semibold rounded-lg px-4 py-4 min-h-[56px] transition-colors hover:bg-slate-50"
                      style={inputStyle}
                    >
                      ← Indietro
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-cta-foreground font-bold rounded-lg px-6 py-4 min-h-[56px] shadow-cta transition-colors disabled:opacity-60"
                      style={inputStyle}
                    >
                      {submitting ? "Invio in corso..." : (<>Invia Richiesta Gratuita <ArrowRight className="h-5 w-5" /></>)}
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Inviando accetti la nostra Privacy Policy. I tuoi dati non saranno ceduti a terzi.
                  </p>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            Cosa dicono di noi
          </h2>
          <p className="text-base sm:text-lg text-foreground leading-relaxed mb-3">
            Oltre 50 impianti installati a Bologna e provincia. Valutazione media <span className="text-yellow-500 font-semibold">5★</span> su Google.
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline hover:no-underline font-medium"
          >
            Leggi le recensioni →
          </a>
        </div>
      </section>

      {/* MOBILE STICKY BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex shadow-strong">
        <a
          href={`tel:${PHONE_TEL}`}
          onClick={() => handleCallClick("mobile_sticky_bar")}
          className="flex-1 flex items-center justify-center gap-2 bg-cta text-cta-foreground font-bold py-3.5 px-3 text-base min-h-[56px]"
        >
          <Phone className="h-5 w-5" fill="currentColor" /> Chiama
        </a>
        <a
          href={WA_FORM}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleWhatsAppClick("mobile_sticky_bar")}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3.5 px-3 text-base min-h-[56px]"
        >
          <MessageCircle className="h-5 w-5" fill="currentColor" /> WhatsApp
        </a>
      </div>

      {/* MINIMAL FOOTER */}
      <footer className="bg-slate-900 text-white px-4 py-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-center sm:text-left">
          <div className="flex items-center gap-2">
            <img src={prmLogo} alt="PRM" className="h-8 w-8 rounded-full" />
            <span className="font-semibold">PRM Fotovoltaico</span>
          </div>
          <div className="text-white/80">P.IVA 03832241208</div>
          <a href={`tel:${PHONE_TEL}`} onClick={() => handleCallClick("footer")} className="inline-flex items-center gap-1.5 font-semibold hover:text-cta">
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
          </a>
        </div>
      </footer>
    </div>
  );
};

export default PreventivoBologna;
