import { useState, useEffect, useMemo } from "react";
import { Phone, Home, Euro, Award, Clock, CheckCircle2, Star, ArrowRight, ChevronDown } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { validatePhone } from "@/lib/validation";
import { trackWhatsAppClick } from "@/lib/tracking";
import prmLogo from "@/assets/prm-logo-round.png";
import whatsappLogo from "@/assets/whatsapp-round.png";

const PHONE_DISPLAY = "335 611 7388";
const PHONE_TEL = "+393356117388";

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

  const handleCallClick = () => pushDL({ event: "call_click", page: "landing_preventivo_bologna" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const nome = (fd.get("nome") as string)?.trim();
    const telefono = (fd.get("telefono") as string)?.trim();
    const comune = (fd.get("comune") as string)?.trim();
    const tipo = fd.get("tipo") as string;
    const bolletta = fd.get("bolletta") as string;
    const note = (fd.get("note") as string) || "";

    if (!nome || !telefono || !comune || !tipo || !bolletta) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }
    const pErr = validatePhone(telefono);
    if (pErr) {
      setError(pErr);
      return;
    }

    const { spesa, consumo } = bollettaToValues(bolletta);
    const { tipologia, tipo_immobile } = tipoToValues(tipo);

    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {
        nome,
        telefono,
        tipologia,
        provincia: "bologna",
        tipo_immobile,
        consumo_annuo: consumo,
        spesa_annua: spesa,
        note: `[Landing Bologna] Comune: ${comune}. ${note}`.trim(),
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
          conversionId: "AW-17965756122",
          conversionLabel: "-seBCPTI4JMcENrd3vZC",
        });
      }
    } catch (err) {
      console.error(err);
      setError("Errore di connessione. Riprova o chiamaci direttamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Preventivo Fotovoltaico Bologna Gratis | PRM Fotovoltaico"
        description="Impianto fotovoltaico a Bologna chiavi in mano. Sopralluogo gratuito, preventivo personalizzato entro 24h. Ingegnere certificato. Chiama o scrivi."
        canonicalPath="/preventivo-bologna"
      />

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <img src={prmLogo} alt="PRM Fotovoltaico" className="h-10 w-10 rounded-full" loading="eager" />
            <span className="font-bold text-primary text-base sm:text-lg truncate">PRM Fotovoltaico</span>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={handleCallClick}
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
            Impianto Fotovoltaico a Bologna — Preventivo Gratuito Entro 24h
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
            Installatori certificati a Bologna e provincia. Impianti chiavi in mano, sopralluogo gratuito, finanziamento disponibile.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6">
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={handleCallClick}
              className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-cta-foreground font-bold rounded-lg px-6 text-base sm:text-lg shadow-strong min-h-[56px] transition-colors"
            >
              <Phone className="h-5 w-5" />
              Chiama Subito
            </a>
            <a
              href="#form-preventivo"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border-2 border-white text-white font-bold rounded-lg px-6 text-base sm:text-lg min-h-[56px] transition-colors"
            >
              Richiedi Preventivo
              <ChevronDown className="h-5 w-5" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm sm:text-base text-white/95">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-300" /> Sopralluogo Gratuito</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-300" /> Preventivo in 24h</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-300" /> Ingegnere Certificato</span>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-slate-50 px-4 py-8">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3 sm:gap-6 text-center">
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
      </section>

      {/* WHY US */}
      <section className="bg-white px-4 py-10 md:py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8">
            Perché scegliere PRM Fotovoltaico?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                Icon: Home,
                t: "Chiavi in Mano a Bologna",
                d: "Gestiamo tutto noi: progettazione, pratiche burocratiche, installazione e allaccio alla rete. Tu non devi fare nulla.",
              },
              {
                Icon: Euro,
                t: "Risparmio Reale sulla Bolletta",
                d: "Un impianto da 6kW può azzerare oltre il 70% della bolletta elettrica. Calcoliamo il tuo risparmio esatto in fase di preventivo.",
              },
              {
                Icon: Award,
                t: "Ingegnere Progettista Dedicato",
                d: "Ing. Riccardo Navone segue personalmente ogni impianto. Non sei un numero — sei un cliente.",
              },
              {
                Icon: Clock,
                t: "Installazione in Tempi Rapidi",
                d: "Dalla firma del contratto all'impianto in funzione in meno di 30 giorni. Sopralluogo gratuito entro 48h dalla richiesta.",
              },
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
            Compila in 30 secondi. Ti ricontatteremo entro 24h.
          </p>

          {submitted ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <p className="text-lg font-semibold text-green-900 mb-2">
                ✅ Richiesta inviata! Ti contatteremo entro 24 ore.
              </p>
              <p className="text-base text-green-800">
                Nel frattempo puoi chiamarci al{" "}
                <a
                  href={`tel:${PHONE_TEL}`}
                  onClick={handleCallClick}
                  className="font-bold underline"
                >
                  {PHONE_DISPLAY}
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 sm:p-6 shadow-md border border-border space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-semibold mb-1.5">Nome e Cognome *</label>
                <input id="nome" name="nome" type="text" required placeholder="Mario Rossi"
                  className="w-full rounded-lg border border-input bg-background px-3 py-3 min-h-[52px]"
                  style={{ fontSize: "16px" }} />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-semibold mb-1.5">Numero di Telefono *</label>
                <input id="telefono" name="telefono" type="tel" required placeholder="+39 333 000 0000"
                  className="w-full rounded-lg border border-input bg-background px-3 py-3 min-h-[52px]"
                  style={{ fontSize: "16px" }} />
              </div>
              <div>
                <label htmlFor="comune" className="block text-sm font-semibold mb-1.5">Comune *</label>
                <input id="comune" name="comune" type="text" required placeholder="Bologna, San Lazzaro, Casalecchio..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-3 min-h-[52px]"
                  style={{ fontSize: "16px" }} />
              </div>
              <div>
                <label htmlFor="tipo" className="block text-sm font-semibold mb-1.5">Tipologia Immobile *</label>
                <select id="tipo" name="tipo" required defaultValue=""
                  className="w-full rounded-lg border border-input bg-background px-3 py-3 min-h-[52px]"
                  style={{ fontSize: "16px" }}>
                  <option value="" disabled>Seleziona...</option>
                  <option value="casa_indipendente">Casa indipendente</option>
                  <option value="appartamento">Appartamento con giardino/terrazzo</option>
                  <option value="azienda">Azienda/Capannone</option>
                  <option value="altro">Altro</option>
                </select>
              </div>
              <div>
                <label htmlFor="bolletta" className="block text-sm font-semibold mb-1.5">Bolletta Mensile Media *</label>
                <select id="bolletta" name="bolletta" required defaultValue=""
                  className="w-full rounded-lg border border-input bg-background px-3 py-3 min-h-[52px]"
                  style={{ fontSize: "16px" }}>
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
                  placeholder="Es: ho già un preventivo da confrontare, voglio anche l'accumulo..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-3"
                  style={{ fontSize: "16px" }} />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-red-800 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-cta-foreground font-bold rounded-lg px-6 py-4 min-h-[56px] shadow-cta transition-colors disabled:opacity-60"
                style={{ fontSize: "16px" }}
              >
                {submitting ? "Invio in corso..." : (
                  <>Invia Richiesta Gratuita <ArrowRight className="h-5 w-5" /></>
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Inviando accetti la nostra Privacy Policy. I tuoi dati non saranno ceduti a terzi.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white px-4 py-10 md:py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-8">
            Cosa dicono i nostri clienti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                t: "Ho scelto PRM dopo tre preventivi. Sono stati chiari sui costi, veloci nell'installazione e il risparmio sulla bolletta è reale. Impianto da 6kW installato in 3 settimane.",
                a: "Marco T., Bologna",
              },
              {
                t: "Ottima esperienza dall'inizio alla fine. L'ingegnere ci ha spiegato tutto in modo comprensibile. Zero pensieri, impianto perfettamente funzionante.",
                a: "Famiglia Rossi, San Lazzaro di Savena",
              },
            ].map((r) => (
              <div key={r.a} className="border border-border rounded-xl p-5 bg-card">
                <div className="flex gap-0.5 mb-2 text-yellow-400">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-base text-foreground italic mb-3 leading-relaxed">"{r.t}"</p>
                <p className="text-sm font-semibold text-muted-foreground">— {r.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHATSAPP FLOATING */}
      <a
        href="https://wa.me/393356117388?text=Buongiorno%2C%20vorrei%20un%20preventivo%20fotovoltaico%20a%20Bologna."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contattaci su WhatsApp"
        onClick={() => trackWhatsAppClick("landing_bologna_whatsapp")}
        className="fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full overflow-hidden shadow-strong transition-transform hover:scale-110 active:scale-95"
      >
        <img src={whatsappLogo} alt="WhatsApp" className="w-full h-full object-cover" width={64} height={64} loading="lazy" />
      </a>

      {/* MINIMAL FOOTER */}
      <footer className="bg-slate-900 text-white px-4 py-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-center sm:text-left">
          <div className="flex items-center gap-2">
            <img src={prmLogo} alt="PRM" className="h-8 w-8 rounded-full" />
            <span className="font-semibold">PRM Fotovoltaico</span>
          </div>
          <div className="text-white/80">P.IVA 03832241208</div>
          <a href={`tel:${PHONE_TEL}`} onClick={handleCallClick} className="inline-flex items-center gap-1.5 font-semibold hover:text-cta">
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
          </a>
        </div>
      </footer>
    </div>
  );
};

export default PreventivoBologna;
