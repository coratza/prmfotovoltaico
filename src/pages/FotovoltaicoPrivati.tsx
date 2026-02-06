import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, CheckCircle, Home, Lightbulb, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import villaSolar from "@/assets/villa-solar.jpg";

const benefits = [
  {
    icon: Lightbulb,
    title: "Bollette più leggere",
    description: "Produci l'energia che consumi. Vedrai subito la differenza in bolletta.",
  },
  {
    icon: Home,
    title: "Valore alla casa",
    description: "Un impianto fotovoltaico aumenta il valore del tuo immobile.",
  },
  {
    icon: Shield,
    title: "Indipendenza energetica",
    description: "Meno dipendenza dalla rete e dai rincari delle tariffe.",
  },
  {
    icon: Clock,
    title: "Tutto incluso",
    description: "Progettazione, pratiche burocratiche, installazione e collaudo.",
  },
];

const process = [
  { step: "1", title: "Sopralluogo gratuito", description: "Veniamo a casa tua per valutare la situazione" },
  { step: "2", title: "Proposta su misura", description: "Ti presentiamo la soluzione più adatta" },
  { step: "3", title: "Installazione", description: "Montiamo l'impianto in pochi giorni" },
  { step: "4", title: "Attivazione", description: "Ci occupiamo di tutte le pratiche" },
];

const FotovoltaicoPrivati = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <img
            src={villaSolar}
            alt="Villa con pannelli solari"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">
              Fotovoltaico per la Tua Casa
            </h1>
            <p className="text-xl text-white/90 mb-8 font-light">
              Hai una villa o una casa indipendente? Il fotovoltaico è la scelta giusta per ridurre le bollette e aumentare l'indipendenza energetica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="lg" asChild>
                <a href="tel:+39051123456">
                  <Phone className="w-5 h-5" />
                  Chiama Ora
                </a>
              </Button>
              <Button variant="ctaSecondary" size="lg" asChild>
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
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
              Perché Installare il Fotovoltaico?
            </h2>
            <p className="text-lg text-muted-foreground">
              Non servono calcoli complicati. Ecco cosa ottieni con un impianto fotovoltaico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-primary rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">{benefit.title}</h3>
                    <p className="text-white/80">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
              Come Funziona
            </h2>
            <p className="text-lg text-muted-foreground">
              Un processo semplice e lineare. Ci occupiamo noi di tutto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-primary text-white flex items-center justify-center font-serif text-2xl flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="pt-1">
                    <h3 className="font-medium text-primary mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cosa include */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-8 text-center">
              Cosa Include il Nostro Servizio
            </h2>
            
            <div className="space-y-4">
              {[
                "Sopralluogo gratuito e senza impegno",
                "Progettazione su misura per la tua casa",
                "Pannelli fotovoltaici di qualità europea",
                "Inverter con garanzia estesa",
                "Installazione professionale",
                "Pratiche burocratiche e allaccio GSE",
                "Collaudo e attivazione dell'impianto",
                "Assistenza post-vendita locale",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-serif mb-4">
              Vuoi Sapere se il Fotovoltaico Fa per Te?
            </h2>
            <p className="text-xl text-white/90 mb-8 font-light">
              Chiamaci o richiedi un sopralluogo. Ti spieghiamo tutto senza impegno.
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

export default FotovoltaicoPrivati;
