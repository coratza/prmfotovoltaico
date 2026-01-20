import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle, TrendingDown, Zap, Award, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import industrialSolar from "@/assets/industrial-solar.jpg";

const benefits = [
  {
    icon: TrendingDown,
    title: "Riduzione costi operativi",
    description: "L'energia è una voce importante per le aziende. Il fotovoltaico la abbatte sensibilmente.",
  },
  {
    icon: Calculator,
    title: "Investimento che si ripaga",
    description: "Tempi di ritorno dell'investimento chiari e documentabili.",
  },
  {
    icon: Zap,
    title: "Continuità operativa",
    description: "Con sistemi di accumulo, maggiore sicurezza anche in caso di blackout.",
  },
  {
    icon: Award,
    title: "Immagine sostenibile",
    description: "Dimostra ai tuoi clienti il tuo impegno verso la sostenibilità.",
  },
];

const FotovoltaicoAziende = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src={industrialSolar}
            alt="Capannone industriale con pannelli solari"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Fotovoltaico per la Tua Azienda
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              I costi energetici pesano sul bilancio? Un impianto fotovoltaico industriale è un investimento concreto con ritorno misurabile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild>
                <a href="tel:+39051123456">
                  <Phone className="w-5 h-5" />
                  Chiama Ora
                </a>
              </Button>
              <Button variant="ctaSecondary" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/contatti">
                  Richiedi Sopralluogo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefici */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Perché le Aziende Scelgono il Fotovoltaico
            </h2>
            <p className="text-lg text-muted-foreground">
              Non è solo questione di ambiente. È una scelta economica razionale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipologie */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Soluzioni per Ogni Esigenza
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">Capannoni Industriali</h3>
              <p className="text-muted-foreground mb-4">
                Sfruttiamo le ampie superfici dei tetti industriali per massimizzare la produzione energetica.
              </p>
              <ul className="space-y-2">
                {["Impianti da 20 a 200+ kWp", "Strutture per tetti piani", "Ottimizzazione autoconsumo"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">Uffici e Negozi</h3>
              <p className="text-muted-foreground mb-4">
                Anche spazi più contenuti possono beneficiare del fotovoltaico con impianti dimensionati.
              </p>
              <ul className="space-y-2">
                {["Impianti da 3 a 20 kWp", "Integrazione architettonica", "Sistemi di monitoraggio"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">Aziende Agricole</h3>
              <p className="text-muted-foreground mb-4">
                Soluzioni specifiche per il settore agricolo, incluse coperture e pensiline.
              </p>
              <ul className="space-y-2">
                {["Agrivoltaico", "Coperture stalle e fienili", "Sistemi ibridi"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cosa include */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 text-center">
              Il Nostro Approccio per le Aziende
            </h2>
            
            <div className="space-y-4">
              {[
                "Analisi dei consumi e studio di fattibilità",
                "Progettazione tecnica ed economica dettagliata",
                "Preventivo trasparente senza sorprese",
                "Componenti di qualità con garanzie estese",
                "Installazione senza interrompere l'attività",
                "Pratiche GSE e connessione alla rete",
                "Sistema di monitoraggio della produzione",
                "Assistenza e manutenzione programmata",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-accent rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Riduci i Costi Energetici della Tua Azienda
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Richiedi uno studio di fattibilità gratuito. Valuteremo insieme il potenziale del tuo immobile.
            </p>
            <Button variant="cta" size="xl" asChild>
              <a href="tel:+39051123456">
                <Phone className="w-6 h-6" />
                Chiama Ora: 051 123 456
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FotovoltaicoAziende;
