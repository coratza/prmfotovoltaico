import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle, Home, Lightbulb, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import villaSolar from "@/assets/villa-solar-sm.webp";
import LeadFormSection from "@/components/sections/LeadFormSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

const benefits = [
  { icon: Lightbulb, title: "Bollette più leggere", description: "Produci l'energia che consumi. Vedrai subito la differenza in bolletta." },
  { icon: Home, title: "Valore alla casa", description: "Un impianto fotovoltaico aumenta il valore del tuo immobile." },
  { icon: Shield, title: "Indipendenza energetica", description: "Meno dipendenza dalla rete e dai rincari delle tariffe." },
  { icon: Clock, title: "Tutto incluso", description: "Progettazione, pratiche burocratiche, installazione e collaudo." },
];

const process = [
  { step: "1", title: "Sopralluogo gratuito", description: "Veniamo a casa tua per valutare la situazione" },
  { step: "2", title: "Proposta su misura", description: "Ti presentiamo la soluzione più adatta" },
  { step: "3", title: "Installazione", description: "Montiamo l'impianto in pochi giorni" },
  { step: "4", title: "Attivazione", description: "Ci occupiamo di tutte le pratiche" },
];

const seoFaqs = [
  {
    question: "Quanto costa un impianto fotovoltaico per una casa?",
    answer: "Il costo di un impianto fotovoltaico residenziale dipende dalla potenza: un impianto da 3 kWp parte da circa 5.000€ (al netto delle detrazioni), mentre un 6 kWp si aggira intorno ai 9.000-11.000€. Con le detrazioni fiscali del 50%, il costo effettivo si dimezza. Richiedi un sopralluogo gratuito per un preventivo personalizzato.",
  },
  {
    question: "Quanto risparmio in bolletta con il fotovoltaico?",
    answer: "Con un impianto fotovoltaico ben dimensionato, una famiglia media può risparmiare tra il 50% e il 70% sulla bolletta elettrica. Il risparmio effettivo dipende dai consumi, dalla quota di autoconsumo e dall'eventuale sistema di accumulo a batterie.",
  },
  {
    question: "Quanto dura un impianto fotovoltaico residenziale?",
    answer: "I pannelli fotovoltaici moderni hanno una vita utile di 25-30 anni con garanzia di produzione minima all'80% dopo 25 anni. Gli inverter durano mediamente 10-15 anni. La manutenzione è minima: una pulizia periodica e un controllo annuale sono sufficienti.",
  },
  {
    question: "Le detrazioni fiscali per il fotovoltaico sono ancora attive?",
    answer: "Sì, nel 2025 le detrazioni fiscali del 50% per l'installazione di impianti fotovoltaici su abitazioni sono ancora attive. La detrazione viene recuperata in 10 anni nella dichiarazione dei redditi, dimezzando di fatto il costo dell'investimento.",
  },
];

const scrollToForm = (e: React.MouseEvent) => {
  e.preventDefault();
  const form = document.getElementById("lead-form-section");
  if (form) form.scrollIntoView({ behavior: "smooth" });
};

const FotovoltaicoPrivati = () => {
  return (
    <Layout>
      <SEOHead
        title="Fotovoltaico Residenziale Bologna | Pannelli Solari Casa | PRM Fotovoltaico"
        description="Impianto fotovoltaico per la tua casa a Bologna. Risparmia fino al 70% in bolletta con detrazioni 50%. Sopralluogo gratuito, chiavi in mano."
        keywords="fotovoltaico residenziale Bologna, pannelli solari casa, impianto fotovoltaico privato Bologna, fotovoltaico con accumulo, installazione fotovoltaico chiavi in mano, costo fotovoltaico casa, detrazioni fotovoltaico 50%, fotovoltaico villa, quanto costa fotovoltaico casa, risparmio bolletta fotovoltaico"
        canonicalPath="/fotovoltaico-privati"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Fotovoltaico Privati", href: "/fotovoltaico-privati" },
        ]}
        faqs={seoFaqs}
        service={{
          name: "Impianti Fotovoltaici Residenziali Chiavi in Mano",
          description: "Progettazione e installazione di impianti fotovoltaici per abitazioni private in Emilia-Romagna. Servizio chiavi in mano con detrazione fiscale 50%, sistemi di accumulo, monitoraggio e assistenza post-vendita.",
          serviceType: "Installazione impianti fotovoltaici residenziali",
          areaServed: ["Bologna", "Modena", "Ferrara", "Ravenna", "Emilia-Romagna"],
        }}
      />
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={villaSolar} alt="Villa con pannelli solari installati da PRM Fotovoltaico a Bologna" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-transparent" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-light mb-6">Fotovoltaico per la Tua Casa a Bologna</h1>
            <p className="text-base sm:text-xl text-primary-foreground/90 mb-6 md:mb-8">
              Riduci la bolletta fino al 70% e aumenta il valore della tua casa con un impianto fotovoltaico su misura. Detrazioni fiscali al 50% incluse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" className="rounded-full text-sm sm:text-base" asChild>
                <a href="#lead-form-section" onClick={scrollToForm}>
                  Richiedi Sopralluogo Gratuito
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" className="rounded-full border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href="tel:+393356117388"><Phone className="w-5 h-5" />Chiama Ora</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefici */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-4">Perché Installare il Fotovoltaico sulla Tua Casa</h2>
            <p className="text-lg text-muted-foreground">Un investimento che si ripaga da solo e protegge dai rincari energetici.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="blue-card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <b.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-normal text-primary-foreground mb-1">{b.title}</h3>
                    <p className="text-primary-foreground/80">{b.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary text-center mb-12">Come Funziona l'Installazione</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((item) => (
              <div key={item.step} className="bg-card rounded-2xl p-6 shadow-soft border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading text-xl mx-auto mb-4">{item.step}</div>
                <h3 className="font-heading text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <LeadFormSection />

      {/* Cosa include */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-8 text-center">Cosa Include il Nostro Servizio</h2>
            <div className="space-y-3">
              {["Sopralluogo gratuito e senza impegno","Progettazione su misura per la tua casa","Pannelli fotovoltaici di qualità europea","Inverter con garanzia estesa","Installazione professionale","Pratiche burocratiche e allaccio GSE","Collaudo e attivazione dell'impianto","Assistenza post-vendita locale"].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-card rounded-xl">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-custom text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-heading font-light mb-4">Vuoi Sapere se il Fotovoltaico Fa per Te?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">Chiamaci o richiedi un sopralluogo. Ti spieghiamo tutto senza impegno.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full bg-primary-foreground text-foreground hover:bg-primary-foreground/90" asChild>
              <a href="tel:+393356117388"><Phone className="w-6 h-6" />Chiama Ora: 335 611 7388</a>
            </Button>
            <Button size="lg" className="rounded-full border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/calcola-rendimento">Calcola il tuo rendimento <ArrowRight className="w-5 h-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FotovoltaicoPrivati;