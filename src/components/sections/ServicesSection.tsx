import { Home, Building2, Warehouse, Battery } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Home,
    title: "Fotovoltaico per Privati",
    description: "Impianti su misura per ville e abitazioni indipendenti. Riduci le bollette e aumenta il valore della tua casa.",
    link: "/fotovoltaico-privati",
  },
  {
    icon: Building2,
    title: "Fotovoltaico per Condomini",
    description: "Soluzioni condominiali per condividere i benefici dell'energia solare tra tutti i condomini.",
    link: "/contatti",
  },
  {
    icon: Warehouse,
    title: "Fotovoltaico per Aziende",
    description: "Impianti per capannoni e immobili produttivi. Investimento con ritorno stimabile e costi sotto controllo.",
    link: "/fotovoltaico-aziende",
  },
  {
    icon: Battery,
    title: "Sistemi di Accumulo",
    description: "Batterie per immagazzinare l'energia prodotta e usarla quando ti serve di più.",
    link: "/contatti",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-gradient-warm">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Cosa Facciamo
          </h2>
          <p className="text-lg text-muted-foreground">
            Progettiamo e installiamo impianti fotovoltaici completi, dalla consulenza iniziale all'attivazione finale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              to={service.link}
              className="group bg-card rounded-xl p-6 md:p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-border hover:border-primary/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
