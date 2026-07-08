import { useState, useEffect, useMemo } from "react";
import { Phone, Home, Euro, Award, Clock, CheckCircle2, ArrowRight, MessageCircle, FileText, Sun, Shield, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { validatePhone, validateEmail } from "@/lib/validation";
import { fireGoogleAdsLeadConversion } from "@/lib/tracking";
import prmLogo from "@/assets/prm-logo-round.png";
import heroRooftop from "@/assets/hero-bologna-rooftop.jpg";
import ingegnereCantiere from "@/assets/ingegnere-cantiere.jpg";
import pannelliDettaglio from "@/assets/pannelli-dettaglio.jpg";

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
  // Hero short form state
  const [heroForm, setHeroForm] = useState({ nome: "", telefono: "", email: "" });
  const [heroSubmitting, setHeroSubmitting] = useState(false);
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroError, setHeroError] = useState<string | null>(null);

  // Long form (below) state
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

  const updateHero = (k: keyof typeof heroForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setHeroForm((f) => ({ ...f, [k]: e.target.value }));

  const updateField = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Short hero form: only nome + telefono + email (optional)
  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroError(null);

    const nome = heroForm.nome.trim();
    const telefono = heroForm.telefono.trim();
    const email = heroForm.email.trim();

    if (!nome || !telefono) {
      setHeroError("Inserisci nome e numero di telefono.");
      return;
    }
    if (nome.length > 200) { setHeroError("Nome troppo lungo."); return; }
    if (telefono.length > 30) { setHeroError("Numero non valido."); return; }
    const pErr = validatePhone(telefono);
    if (pErr) { setHeroError(pErr); return; }
    if (email) {
      const eErr = validateEmail(email);
      if (eErr) { setHeroError(eErr); return; }
    }

    setHeroSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        nome,
        telefono,
        email: email || null,
        tipologia: "privato",
        provincia: "bologna",
        tipo_immobile: "da_definire",
        consumo_annuo: 3600,
        spesa_annua: 1800,
        note: `[Landing Bologna - Form Hero Corto] Email: ${email || "non fornita"}`,
      };
      const { error: fnErr } = await supabase.functions.invoke("save-lead", { body: payload });
      if (fnErr) {
        setHeroError("Errore nell'invio. Riprova o chiamaci direttamente.");
      } else {
        setHeroSubmitted(true);
        pushDL({
          event: "lead_form_submit",
          page: "landing_preventivo_bologna",
          form: "hero_short",
          ...utm,
          conversionId: "AW-17965756122",
          conversionLabel: "bjZICKmLw58cENrd3vZC",
        });
        fireGoogleAdsLeadConversion();
      }
    } catch (err) {
      console.error(err);
      setHeroError("Errore di connessione. Riprova o chiamaci direttamente.");
    } finally {
      setHeroSubmitting(false);
    }
  };

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
          form: "long_2step",
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
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
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
            <span>{PHONE_DISPLAY}</span>
          </a>
        </div>
      </header>

      {/* HERO — split layout with short lead form */}
      <section className="relative text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={heroRooftop}
            alt="Impianto fotovoltaico installato su tetto a Bologna"
            className="w-full h-full object-cover"
            loading="eager"
            width={1600}
            height={1200}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(30,58,95,0.92) 0%, rgba(37,99,235,0.82) 100%)" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
            {/* LEFT — Copy */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 mb-4 text-xs sm:text-sm font-semibold">
                <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
                <span>5★ su Google · 50+ impianti a Bologna</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                <span className="block">Preventivo Fotovoltaico</span>
                <span className="block">a Bologna in 24h.</span>
                <span className="block text-yellow-300">Con un Ingegnere, Non un Call Center.</span>
              </h1>

              <p className="text-base sm:text-lg text-white/90 mb-5 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Ing. Riccardo Navone segue personalmente ogni impianto. Prezzo fisso, zero sorprese, assistenza reale dopo l'installazione.
              </p>

              {/* Trust bullets */}
              <ul className="grid sm:grid-cols-2 gap-2 text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
                <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-300 flex-shrink-0" /> Sopralluogo gratuito</li>
                <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-300 flex-shrink-0" /> Nessun impegno</li>
                <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-300 flex-shrink-0" /> Prezzo fisso garantito</li>
                <li className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-300 flex-shrink-0" /> Azienda locale di Bologna</li>
              </ul>
            </div>

            {/* RIGHT — Short lead form card */}
            <div id="hero-form" className="w-full max-w-md mx-auto lg:max-w-none">
              <div className="bg-white text-foreground rounded-2xl shadow-strong p-5 sm:p-6 border border-white/10">
                {heroSubmitted ? (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">Richiesta ricevuta!</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      Grazie {heroForm.nome.split(" ")[0]}! Ti ricontattiamo <strong>entro poche ore</strong> per fissare il sopralluogo gratuito.
                    </p>
                    <a
                      href={`tel:${PHONE_TEL}`}
                      onClick={() => handleCallClick("hero_success")}
                      className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-cta-foreground font-bold rounded-lg px-4 py-3 min-h-[48px] text-sm w-full transition-colors"
                    >
                      <Phone className="h-4 w-4" fill="currentColor" />
                      Preferisci parlare subito? Chiama
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-1.5 bg-cta/10 text-cta-hover font-bold text-xs uppercase tracking-wide px-3 py-1 rounded-full mb-2">
                        <Clock className="h-3 w-3" /> Risposta entro poche ore
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-primary leading-tight">
                        Richiedi il tuo preventivo
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Compila in 30 secondi. Nessun impegno.
                      </p>
                    </div>

                    <form onSubmit={handleHeroSubmit} className="space-y-3">
                      <div>
                        <label htmlFor="hero-nome" className="sr-only">Nome e Cognome</label>
                        <input
                          id="hero-nome" name="nome" type="text" required autoComplete="name"
                          placeholder="Nome e cognome *"
                          value={heroForm.nome} onChange={updateHero("nome")}
                          maxLength={200}
                          className={inputCls} style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor="hero-tel" className="sr-only">Telefono</label>
                        <input
                          id="hero-tel" name="telefono" type="tel" required autoComplete="tel"
                          placeholder="Numero di telefono *"
                          value={heroForm.telefono} onChange={updateHero("telefono")}
                          maxLength={30}
                          className={inputCls} style={inputStyle}
                        />
                      </div>
                      <div>
                        <label htmlFor="hero-email" className="sr-only">Email (opzionale)</label>
                        <input
                          id="hero-email" name="email" type="email" autoComplete="email"
                          placeholder="Email (opzionale)"
                          value={heroForm.email} onChange={updateHero("email")}
                          maxLength={255}
                          className={inputCls} style={inputStyle}
                        />
                      </div>

                      {heroError && (
                        <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-red-800 text-sm" role="alert" aria-live="polite">
                          {heroError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={heroSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-cta-foreground font-bold rounded-lg px-6 py-4 min-h-[56px] shadow-cta transition-colors disabled:opacity-60"
                        style={inputStyle}
                      >
                        {heroSubmitting ? "Invio..." : (<>Richiedi Preventivo Gratuito <ArrowRight className="h-5 w-5" /></>)}
                      </button>

                      <div className="flex items-center justify-center gap-4 pt-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Shield className="h-3 w-3" /> Dati protetti</span>
                        <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-green-600" /> Nessun impegno</span>
                      </div>

                      <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-muted-foreground">oppure</span></div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`tel:${PHONE_TEL}`}
                          onClick={() => handleCallClick("hero_form")}
                          className="inline-flex items-center justify-center gap-1.5 bg-white border-2 border-cta text-cta-hover font-bold rounded-lg px-3 py-3 min-h-[48px] text-sm hover:bg-cta/5 transition-colors"
                        >
                          <Phone className="h-4 w-4" fill="currentColor" /> Chiama
                        </a>
                        <a
                          href={WA_HERO}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleWhatsAppClick("hero_form")}
                          className="inline-flex items-center justify-center gap-1.5 bg-white border-2 border-green-600 text-green-700 font-bold rounded-lg px-3 py-3 min-h-[48px] text-sm hover:bg-green-50 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4" fill="currentColor" /> WhatsApp
                        </a>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-slate-50 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
            {[
              { n: "50+", l: "Impianti Installati" },
              { n: "5★", l: "Valutazione Google" },
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

      {/* WHY US — with engineer photo */}
      <section className="bg-white px-4 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-strong">
                <img
                  src={ingegnereCantiere}
                  alt="Ing. Riccardo Navone in cantiere durante l'installazione di un impianto fotovoltaico a Bologna"
                  className="w-full h-auto"
                  loading="lazy"
                  width={1200}
                  height={1400}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                  <div className="font-bold text-lg">Ing. Riccardo Navone</div>
                  <div className="text-sm text-white/90">Il tuo referente diretto, dalla prima chiamata all'ultimo intervento.</div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 text-center lg:text-left">
                Perché scegliere PRM Fotovoltaico
              </h2>
              <div className="space-y-4">
                {[
                  { Icon: Award, t: "Un Ingegnere, Non un Venditore", d: "Riccardo Navone segue personalmente ogni progetto. Nessun subappalto, nessun call center." },
                  { Icon: Euro, t: "Prezzi Chiari, Nessuna Sorpresa", d: "Il preventivo che firmi è quello che paghi. Se emerge un imprevisto, te lo diciamo prima." },
                  { Icon: Home, t: "Siamo di Bologna, Ci Trovi Sempre", d: "Azienda bolognese con un numero diretto. Se hai un problema, rispondiamo di persona." },
                  { Icon: Clock, t: "Assistenza Reale Post-Installazione", d: "Monitoraggio, manutenzione e supporto tecnico per tutta la vita dell'impianto." },
                ].map(({ Icon, t, d }) => (
                  <div key={t} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-foreground">{t}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="bg-slate-50 px-4 py-10 md:py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">
            Dalla prima chiamata all'impianto in funzione
          </h2>
          <p className="text-center text-muted-foreground mb-8">4 passi semplici, tutto gestito da noi.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { Icon: Phone, t: "Ci contatti", d: "Chiamata o WhatsApp: ci racconti la tua situazione in 5 minuti." },
              { Icon: Home, t: "Sopralluogo gratuito", d: "Riccardo viene da te, valuta il tetto e i tuoi consumi. Nessun impegno." },
              { Icon: FileText, t: "Preventivo fisso", d: "Ricevi un preventivo dettagliato e trasparente. Quel numero non cambia." },
              { Icon: Sun, t: "Impianto in funzione", d: "Installiamo in 1-2 giorni. Gestiamo tutte le pratiche burocratiche." },
            ].map(({ Icon, t, d }, i) => (
              <div key={t} className="relative border border-border rounded-xl p-5 pt-8 bg-white text-center shadow-sm">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-bold rounded-full h-7 w-7 flex items-center justify-center shadow-sm">
                  {i + 1}
                </div>
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-3">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-1.5 text-foreground">{t}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="#hero-form"
              className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-cta-foreground font-bold rounded-lg px-6 py-3 min-h-[52px] text-base shadow-cta transition-colors"
            >
              Richiedi Sopralluogo Gratuito <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* PRIMA / DOPO BOLLETTA — with panel detail image band */}
      <section className="relative px-4 py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={pannelliDettaglio}
            alt="Pannelli fotovoltaici installati su tetto"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1400}
            height={900}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/85" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8">
            Cosa cambia davvero in bolletta
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="rounded-xl p-6 text-center border-2 border-red-200 bg-white/95 backdrop-blur-sm shadow-md">
              <div className="text-sm font-semibold uppercase tracking-wide text-red-700 mb-2">Prima</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-red-700 mb-1">€ 220 / mese</div>
              <div className="text-sm text-red-900/80">Bolletta media famiglia Bologna</div>
            </div>
            <div className="rounded-xl p-6 text-center border-2 border-green-300 bg-white/95 backdrop-blur-sm shadow-md">
              <div className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-2">Dopo</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-1">€ 30 / mese</div>
              <div className="text-sm text-green-900/80">Con impianto PRM da 6kW + accumulo</div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-5 max-w-2xl mx-auto leading-relaxed">
            Il risparmio esatto dipende dai tuoi consumi e dalla dimensione dell'impianto. Lo calcoliamo insieme nel sopralluogo gratuito.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS / SOCIAL PROOF */}
      <section className="bg-white px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-3">
            {[1,2,3,4,5].map(i => <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />)}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            Cosa dicono di noi
          </h2>
          <p className="text-base sm:text-lg text-foreground leading-relaxed mb-3 max-w-xl mx-auto">
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

      {/* FAQ */}
      <section className="bg-slate-50 px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8">
            Le domande più frequenti
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "Ho un appartamento, posso installare il fotovoltaico?", a: "Dipende dalla situazione. Se hai accesso esclusivo al tetto o una superficie disponibile, spesso è possibile. Valutiamo insieme nel sopralluogo: è gratuito e senza impegno." },
              { q: "Quanto tempo richiede l'installazione?", a: "L'installazione tipica dura 1-2 giorni lavorativi. Devi essere presente solo per farci accedere. Le pratiche burocratiche le gestiamo noi completamente." },
              { q: "Cosa succede se si rompe qualcosa dopo l'installazione?", a: "Siamo di Bologna e ci trovi sempre. Assistenza tecnica, manutenzione e supporto post-vendita sono parte del nostro servizio. Non spariremo dopo aver installato." },
              { q: "Il preventivo può cambiare dopo la firma?", a: "No. Il preventivo che firmi è quello che paghi. Se emergono imprevisti tecnici te li comunichiamo prima di procedere, mai dopo." },
              { q: "Ci sono finanziamenti disponibili?", a: "Sì, offriamo soluzioni di finanziamento per dilazionare l'investimento. Ne parliamo nel dettaglio durante il sopralluogo." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border bg-white rounded-lg mb-2 px-4">
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-foreground hover:text-primary py-4 min-h-[52px]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-8">
            <a
              href="https://wa.me/393356117388?text=Ciao%2C+ho+alcune+domande+sul+fotovoltaico"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick("faq")}
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg px-6 py-3 min-h-[52px] text-base shadow-md transition-colors"
            >
              <MessageCircle className="h-5 w-5" fill="currentColor" />
              Hai altre domande? Scrivici su WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FORM DETTAGLIATO — reinforcement per chi ha scrollato tutto */}
      <section id="form-preventivo" className="px-4 py-10 md:py-14" style={{ backgroundColor: "#eff6ff" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-2">
            Vuoi darci qualche dettaglio in più?
          </h2>
          <p className="text-center text-base text-muted-foreground mb-6">
            Compila il modulo dettagliato per un preventivo ancora più preciso. Ti ricontattiamo entro poche ore.
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
                      value={form.nome} onChange={updateField("nome")} maxLength={200} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-semibold mb-1.5">Numero di Telefono *</label>
                    <input id="telefono" name="telefono" type="tel" required placeholder="+39 333 000 0000"
                      value={form.telefono} onChange={updateField("telefono")} maxLength={30} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label htmlFor="comune" className="block text-sm font-semibold mb-1.5">Comune *</label>
                    <input id="comune" name="comune" type="text" required placeholder="Bologna, San Lazzaro, Casalecchio..."
                      value={form.comune} onChange={updateField("comune")} maxLength={100} className={inputCls} style={inputStyle} />
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
                      maxLength={1000}
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
