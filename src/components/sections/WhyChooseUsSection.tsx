import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-solar-home.jpg";
import teamImage from "@/assets/team-installation.jpg";
import villaSolar from "@/assets/villa-solar.jpg";
import industrialSolar from "@/assets/industrial-solar.jpg";

const reasons = [
  {
    image: heroImage,
    title: "Installatore locale, non un intermediario",
    description: "Seguiamo direttamente ogni impianto.\nNiente call center, niente passaggi di mano",
  },
  {
    image: teamImage,
    title: "Impianti certificati e componenti selezionate",
    description: "Utilizziamo solo prodotti affidabili e diffusi.\nInstallazione conforme alle specifiche dei produttori.",
  },
  {
    image: villaSolar,
    title: "Un progetto che dura nel tempo",
    description: "Un impianto fotovoltaico è un investimento.\nDeve funzionare oggi e continuare a farlo negli anni.",
  },
  {
    image: industrialSolar,
    title: "Esperienza tecnica sul campo",
    description: "Il titolare segue i lavori in prima persona.\nQuesto riduce errori, ritardi e incomprensioni.",
  },
  {
    image: heroImage,
    title: "Sopralluogo reale, non preventivi a distanza",
    description: "Prima analizziamo tetto e consumi.\nPoi parliamo di numeri.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-heading font-light text-primary text-center mb-12">
          Perché scegliere noi
        </h2>

        <div className="space-y-6">
          {reasons.map((reason) => (
            <div key={reason.title} className="blue-card">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-full md:w-64 h-48 md:h-40 overflow-hidden rounded-2xl">
                  <img
                    src={reason.image}
                    alt={reason.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-heading font-normal text-primary-foreground mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-primary-foreground/80 whitespace-pre-line leading-relaxed mb-4">
                    {reason.description}
                  </p>
                  <Button variant="outline" className="rounded-full border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent" asChild>
                    <Link to="/contatti">Richiedi un sopralluogo</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
