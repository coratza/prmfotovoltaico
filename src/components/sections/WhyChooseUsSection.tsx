import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Wrench, Clock } from "lucide-react";

const reasons = [
  {
    icon: MapPin,
    title: "Installatore locale, non un intermediario",
    description: "Seguiamo direttamente ogni impianto. Niente call center, niente passaggi di mano.",
  },
  {
    icon: Wrench,
    title: "Esperienza tecnica sul campo",
    description: "Il titolare segue i lavori in prima persona. Questo riduce errori, ritardi e incomprensioni.",
  },
  {
    icon: Clock,
    title: "Un progetto che dura nel tempo",
    description: "Un impianto fotovoltaico è un investimento. Deve funzionare oggi e continuare a farlo negli anni.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-primary text-center mb-8 md:mb-10">
          Perché scegliere noi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
          {reasons.map((reason) => (
            <div key={reason.title} className="blue-card text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <reason.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg md:text-xl font-heading font-normal text-primary-foreground mb-2 md:mb-3">
                {reason.title}
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed text-sm md:text-base">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
            <Link to="/chi-siamo">Scopri chi siamo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
