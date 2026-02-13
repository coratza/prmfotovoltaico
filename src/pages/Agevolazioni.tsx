import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle, FileText, Wrench, BadgePercent, Home, Building2 } from "lucide-react";
import villaSolar from "@/assets/villa-solar.jpg";
import industrialSolar from "@/assets/industrial-solar.jpg";

const provinces = ["Bologna", "Modena", "Ferrara", "Ravenna"];

const categories = [
  {
    title: "Detrazioni Fotovoltaico Privati",
    description: "Detrazione fiscale fino al 50% per l'installazione di impianti fotovoltaici su abitazioni.",
    badge: "-50%",
    basePath: "/agevolazioni/detrazioni-privati",
    image: villaSolar,
    icon: Home,
    benefits: [
      "Recupero del 50% in 10 anni tramite dichiarazione dei redditi",
      "Applicabile a impianti fotovoltaici e sistemi di accumulo",
      "Valida per ristrutturazioni e nuove installazioni",
      "Nessun limite ISEE per accedere alla detrazione",
    ],
  },
  {
    title: "Agevolazioni Fotovoltaico Aziende",
    description: "Agevolazioni fiscali fino al 180% del valore dell'investimento per imprese.",
    badge: "-180%",
    basePath: "/agevolazioni/agevolazioni-aziende",
    image: industrialSolar,
    icon: Building2,
    benefits: [
      "Super ammortamento fino al 180% del valore dell'investimento",
      "Riduzione significativa del carico fiscale aziendale",
      "Applicabile a beni strumentali nuovi",
      "Cumulabile con altre agevolazioni fiscali",
    ],
  },
];

const steps = [
  {
    icon: FileText,
    title: "1. Consulenza gratuita",
    description: "Analizziamo i tuoi consumi, valutiamo il tuo immobile e ti presentiamo le agevolazioni a cui hai diritto.",
  },
  {
    icon: Wrench,
    title: "2. Installazione chiavi in mano",
    description: "Ci occupiamo di tutto: progettazione, installazione, collaudo e allaccio alla rete. Tu non devi fare nulla.",
  },
  {
    icon: BadgePercent,
    title: "3. Detrazione e risparmio",
    description: "Ti guidiamo nella richiesta delle detrazioni fiscali e inizi subito a risparmiare sulla bolletta.",
  },
];

const Agevolazioni = () => {
  return (
    <Layout>
      <SEOHead
        title="Detrazioni e Agevolazioni Fotovoltaico Emilia-Romagna | PRM Fotovoltaico"
        description="Scopri detrazioni fiscali e agevolazioni per impianti fotovoltaici in Emilia-Romagna. Detrazione 50% privati, agevolazioni 180% aziende. PRM Fotovoltaico ti guida."
        keywords="detrazioni fotovoltaico, agevolazioni fotovoltaico, detrazioni fiscali fotovoltaico Emilia Romagna, detrazioni fotovoltaico Bologna, detrazioni fotovoltaico Ferrara, detrazioni fotovoltaico Modena, agevolazioni aziende fotovoltaico"
      />
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-light text-primary mb-6">
              Detrazioni e Agevolazioni Fotovoltaico
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Scopri tutte le agevolazioni fiscali disponibili per l'installazione di impianti fotovoltaici in Emilia-Romagna.
              Risparmia migliaia di euro sul tuo investimento.
            </p>
          </div>
        </div>
      </section>

      {/* Categorie principali con immagini */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-12 mb-16">
            {categories.map((cat, index) => (
              <div key={cat.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`relative overflow-hidden rounded-2xl shadow-medium ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img src={cat.image} alt={cat.title} className="w-full h-72 lg:h-96 object-cover" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-yellow-400 text-foreground font-bold text-lg w-16 h-16 rounded-full flex items-center justify-center" style={{
                      clipPath: "polygon(50% 0%, 61% 15%, 79% 6%, 76% 25%, 98% 30%, 85% 44%, 100% 58%, 82% 62%, 87% 82%, 68% 74%, 60% 95%, 50% 80%, 40% 95%, 32% 74%, 13% 82%, 18% 62%, 0% 58%, 15% 44%, 2% 30%, 24% 25%, 21% 6%, 39% 15%)"
                    }}>
                      {cat.badge}
                    </div>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <cat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-heading font-light text-primary">{cat.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{cat.description}</p>
                  <ul className="space-y-3 mb-6">
                    {cat.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="cta" className="rounded-full" asChild>
                    <Link to={cat.basePath}>
                      Scopri di più <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-light text-primary mb-4">
              Come Funziona
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              In tre semplici passaggi ti guidiamo dall'analisi iniziale fino al risparmio concreto sulla bolletta.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.title} className="bg-card rounded-2xl p-8 shadow-soft border border-border text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-normal text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per provincia */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading font-light text-primary mb-4">
              Agevolazioni per Provincia
            </h2>
            <p className="text-muted-foreground">
              Trova le informazioni specifiche per la tua zona.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {provinces.map((prov) => (
              <div key={prov} className="bg-card rounded-2xl border border-border shadow-soft p-6">
                <h3 className="text-xl font-heading font-normal text-foreground mb-4">{prov}</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to={`/agevolazioni/detrazioni-privati-${prov.toLowerCase()}`} className="text-primary hover:underline flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" /> Detrazioni privati
                    </Link>
                  </li>
                  <li>
                    <Link to={`/agevolazioni/agevolazioni-aziende-${prov.toLowerCase()}`} className="text-primary hover:underline flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" /> Agevolazioni aziende
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-custom text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-heading font-light mb-4">
            Vuoi sapere a quali agevolazioni hai diritto?
          </h2>
          <p className="text-xl text-primary-foreground/85 mb-8">
            Chiamaci per una consulenza gratuita sulle detrazioni disponibili per il tuo caso.
          </p>
          <Button variant="cta" size="lg" className="rounded-full bg-primary-foreground text-foreground hover:bg-primary-foreground/90" asChild>
            <a href="tel:+393356117388">
              <Phone className="w-5 h-5" />
              Chiama Ora: 335 611 7388
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Agevolazioni;
