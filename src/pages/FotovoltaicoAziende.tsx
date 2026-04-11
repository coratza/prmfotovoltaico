import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle, TrendingDown, Zap, Award, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import industrialSolar from "@/assets/industrial-solar-sm.webp";
import LeadFormSection from "@/components/sections/LeadFormSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

const benefits = [
  { icon: TrendingDown, title: "Riduzione costi operativi", description: "L'energia è una voce importante per le aziende. Il fotovoltaico la abbatte sensibilmente." },
  { icon: Calculator, title: "Investimento che si ripaga", description: "Tempi di ritorno dell'investimento chiari e documentabili." },
  { icon: Zap, title: "Continuità operativa", description: "Con sistemi di accumulo, maggiore sicurezza anche in caso di blackout." },
  { icon: Award, title: "Immagine sostenibile", description: "Dimostra ai tuoi clienti il tuo impegno verso la sostenibilità." },
];

const scrollToForm = (e: React.MouseEvent) => {
  e.preventDefault();
  const form = document.getElementById("lead-form-section");
  if (form) form.scrollIntoView({ behavior: "smooth" });
};

const FotovoltaicoAziende = () => {
  return (
    <Layout>
      <SEOHead
        title="Fotovoltaico Aziendale e Industriale Emilia-Romagna | PRM Fotovoltaico"
        description="Impianti fotovoltaici per aziende e industrie in Emilia-Romagna. Riduci i costi energetici con un investimento concreto. PRM Fotovoltaico, installatore specializzato."
        keywords="fotovoltaico aziendale Bologna, fotovoltaico industriale, fotovoltaico per imprese, fotovoltaico per industria, fotovoltaico capannone, impianto fotovoltaico azienda Emilia Romagna"
        canonicalPath="/fotovoltaico-aziende"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Fotovoltaico Aziende", href: "/fotovoltaico-aziende" },
        ]}
      />
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={industrialSolar} alt="Capannone industriale con impianto fotovoltaico PRM Fotovoltaico in Emilia-Romagna" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-transparent" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-light mb-6">Fotovoltaico per la Tua Azienda</h1>
            <p className="text-base sm:text-xl text-primary-foreground/90 mb-6 md:mb-8">
              I costi energetici pesano sul bilancio? Un impianto fotovoltaico industriale è un investimento concreto con ritorno misurabile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" className="rounded-full text-sm sm:text-base" asChild>
                <a href="#lead-form-section" onClick={scrollToForm}>
                  Richiedi Studio di Fattibilità
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
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary text-center mb-12">Perché le Aziende Scelgono il Fotovoltaico</h2>
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

      {/* Lead Form */}
      <LeadFormSection />

      {/* Tipologie */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-heading font-light text-primary text-center mb-12">Soluzioni per Ogni Esigenza</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Capannoni Industriali", desc: "Sfruttiamo le ampie superfici dei tetti industriali per massimizzare la produzione energetica.", items: ["Impianti da 20 a 200+ kWp","Strutture per tetti piani","Ottimizzazione autoconsumo"] },
              { title: "Uffici e Negozi", desc: "Anche spazi più contenuti possono beneficiare del fotovoltaico con impianti dimensionati.", items: ["Impianti da 3 a 20 kWp","Integrazione architettonica","Sistemi di monitoraggio"] },
              { title: "Aziende Agricole", desc: "Soluzioni specifiche per il settore agricolo, incluse coperture e pensiline.", items: ["Agrivoltaico","Coperture stalle e fienili","Sistemi ibridi"] },
            ].map((s) => (
              <div key={s.title} className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="text-xl font-heading font-normal text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cosa include */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-8 text-center">Il Nostro Approccio per le Aziende</h2>
            <div className="space-y-3">
              {["Analisi dei consumi e studio di fattibilità","Progettazione tecnica ed economica dettagliata","Preventivo trasparente senza sorprese","Componenti di qualità con garanzie estese","Installazione senza interrompere l'attività","Pratiche GSE e connessione alla rete","Sistema di monitoraggio della produzione","Assistenza e manutenzione programmata"].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-accent rounded-xl">
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
          <h2 className="text-3xl md:text-4xl font-heading font-light mb-4">Riduci i Costi Energetici della Tua Azienda</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">Richiedi uno studio di fattibilità gratuito.</p>
          <Button size="lg" className="rounded-full bg-primary-foreground text-foreground hover:bg-primary-foreground/90" asChild>
            <a href="tel:+393356117388"><Phone className="w-6 h-6" />Chiama Ora: 335 611 7388</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default FotovoltaicoAziende;
