import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

const provinces = ["Bologna", "Modena", "Ferrara", "Ravenna"];

const categories = [
  {
    title: "Detrazioni Fotovoltaico Privati",
    description: "Detrazione fiscale fino al 50% per l'installazione di impianti fotovoltaici su abitazioni.",
    badge: "-50%",
    basePath: "/agevolazioni/detrazioni-privati",
  },
  {
    title: "Agevolazioni Fotovoltaico Aziende",
    description: "Agevolazioni fiscali fino al 180% del valore dell'investimento per imprese.",
    badge: "-180%",
    basePath: "/agevolazioni/agevolazioni-aziende",
  },
];

const Agevolazioni = () => {
  return (
    <Layout>
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

      {/* Categorie principali */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {categories.map((cat) => (
              <div key={cat.title} className="blue-card">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-heading font-normal text-primary-foreground">{cat.title}</h2>
                  <div className="bg-yellow-400 text-foreground font-bold text-lg w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{
                    clipPath: "polygon(50% 0%, 61% 15%, 79% 6%, 76% 25%, 98% 30%, 85% 44%, 100% 58%, 82% 62%, 87% 82%, 68% 74%, 60% 95%, 50% 80%, 40% 95%, 32% 74%, 13% 82%, 18% 62%, 0% 58%, 15% 44%, 2% 30%, 24% 25%, 21% 6%, 39% 15%)"
                  }}>
                    {cat.badge}
                  </div>
                </div>
                <p className="text-primary-foreground/80 leading-relaxed mb-6">{cat.description}</p>
                <Button variant="outline" className="rounded-full border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
                  <Link to={cat.basePath}>
                    Scopri di più <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Per provincia */}
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
            <a href="tel:+393246117388">
              <Phone className="w-5 h-5" />
              Chiama Ora: 324 611 7388
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Agevolazioni;
