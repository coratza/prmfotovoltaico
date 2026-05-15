import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, MapPin, Users, Heart, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import teamImage from "@/assets/team-installation-sm.webp";

const values = [
  {
    icon: MapPin,
    title: "Radicati nel territorio",
    description: "Siamo di San Lazzaro di Savena. Conosciamo il territorio, le esigenze locali e le peculiarità del clima emiliano.",
  },
  {
    icon: Users,
    title: "Contatto diretto",
    description: "Quando ci chiami, parli con chi installerà il tuo impianto. Niente call center, niente intermediari.",
  },
  {
    icon: Heart,
    title: "Passione per il lavoro",
    description: "Ogni impianto è un progetto a cui teniamo. Non siamo una catena di montaggio, ma artigiani del fotovoltaico.",
  },
  {
    icon: Wrench,
    title: "Assistenza vera",
    description: "Problemi post-installazione? Siamo a 30 minuti da te. Non dall'altra parte d'Italia.",
  },
];

const ChiSiamo = () => {
  return (
    <Layout>
      <SEOHead
        title="Chi Siamo | Installatore Fotovoltaico Bologna - PRM"
        description="PRM Fotovoltaico: azienda artigiana di San Lazzaro di Savena, specializzata in impianti fotovoltaici dal 2010. Oltre 200 installazioni a Bologna e Emilia-Romagna."
        keywords="PRM Fotovoltaico chi siamo, installatore fotovoltaico Bologna, azienda fotovoltaico San Lazzaro di Savena, fotovoltaico artigiano Emilia Romagna"
        canonicalPath="/chi-siamo"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Chi Siamo", href: "/chi-siamo" },
        ]}
      />
      {/* Hero */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Chi Siamo
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground mb-6">
                Siamo un'azienda artigiana di San Lazzaro di Savena, fondata dall'Ing. Navone Riccardo, specializzata nell'installazione di impianti fotovoltaici dal 2010.
              </p>
              <p className="text-muted-foreground mb-8">
                Lavoriamo con un approccio artigiano: pochi impianti, fatti bene. Ti seguiamo direttamente, dalla prima telefonata al collaudo, con una presenza reale sul territorio.
              </p>
              <Button variant="cta" size="lg" className="text-sm sm:text-base" asChild>
                <a href="tel:+393356117388">
                  <Phone className="w-5 h-5" />
                  Parlaci del tuo progetto
                </a>
              </Button>
            </div>
            <div className="relative">
              <img
                src={teamImage}
                alt="Il team PRM Fotovoltaico al lavoro su impianto fotovoltaico a Bologna"
                className="rounded-2xl shadow-strong w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground rounded-xl p-4 shadow-medium hidden md:block">
                <p className="font-serif font-bold text-2xl">200+</p>
                <p className="text-sm">Impianti installati</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storia */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8 text-center">
              La Nostra Storia
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Abbiamo iniziato nel 2010, quando il fotovoltaico in Italia era ancora una novità. Eravamo convinti che l'energia solare fosse il futuro, e i fatti ci hanno dato ragione.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Da allora abbiamo installato oltre 200 impianti tra Bologna, Modena, Ferrara e Ravenna. Ogni impianto è una storia diversa: famiglie che volevano ridurre le bollette, aziende che cercavano di abbattere i costi operativi, agricoltori che volevano valorizzare le loro coperture.
              </p>
              <p className="text-lg leading-relaxed">
                Oggi siamo cresciuti, ma restiamo fedeli alla nostra filosofia: pochi impianti fatti bene, con materiali di qualità e un servizio personalizzato. Non cerchiamo i volumi, cerchiamo clienti soddisfatti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valori */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              I Nostri Valori
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area servita */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Dove Operiamo
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Installiamo impianti fotovoltaici in tutta l'Emilia-Romagna, con particolare focus su:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Bologna e provincia", "Modena e provincia", "Ferrara e provincia", "Ravenna e provincia"].map((area) => (
                <span key={area} className="flex items-center gap-2 bg-accent px-4 py-2 rounded-full text-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  {area}
                </span>
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
              Parliamo del Tuo Progetto
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Siamo a disposizione per rispondere alle tue domande e valutare insieme le possibilità.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl" asChild>
                <a href="tel:+393356117388">
                  <Phone className="w-6 h-6" />
                  Chiama Ora
                </a>
              </Button>
              <Button 
                variant="ctaSecondary" 
                size="lg" 
                className="bg-primary-foreground/10 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link to="/contatti">
                  Vai ai Contatti
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ChiSiamo;
