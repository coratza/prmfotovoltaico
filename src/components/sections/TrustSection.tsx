import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import teamImage from "@/assets/team-installation.jpg";
import villaSolar from "@/assets/villa-solar.jpg";
import industrialSolar from "@/assets/industrial-solar.jpg";

const trustCards = [
  {
    image: teamImage,
    title: "Installatore locale, non un intermediario",
    description: "Seguiamo direttamente ogni impianto.\nNiente call center, niente passaggi di mano",
  },
  {
    image: industrialSolar,
    title: "Impianti certificati e componenti selezionate",
    description: "Utilizziamo solo prodotti affidabili e diffusi.\nInstallazione conforme alle specifiche dei produttori.",
  },
  {
    image: villaSolar,
    title: "Un progetto che dura nel tempo",
    description: "Un impianto fotovoltaico è un investimento.\nDeve funzionare oggi e continuare a farlo negli anni.",
  },
  {
    image: teamImage,
    title: "Esperienza tecnica sul campo",
    description: "Il titolare segue i lavori in prima persona.\nQuesto riduce errori, ritardi e incomprensioni.",
  },
  {
    image: industrialSolar,
    title: "Sopralluogo reale, non preventivi a distanza",
    description: "Prima analizziamo tetto e consumi.\nPoi parliamo di numeri.",
  },
];

const TrustSection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
            Perché scegliere noi
          </h2>
        </div>

        {/* Trust Cards */}
        <div className="space-y-6">
          {trustCards.map((card, index) => (
            <div
              key={card.title}
              className="bg-primary rounded-3xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
                {/* Image */}
                <div className="w-full md:w-64 h-48 md:h-40 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-serif text-white mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/80 text-lg whitespace-pre-line leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  <Button variant="cardCta" size="lg" asChild>
                    <Link to="/contatti">
                      Richiedi un sopralluogo
                    </Link>
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

export default TrustSection;
