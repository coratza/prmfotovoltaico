import { MapPin, Users, Wrench, ShieldCheck } from "lucide-react";
import teamImage from "@/assets/team-installation.jpg";

const trustPoints = [
  {
    icon: MapPin,
    title: "Presenza Locale",
    description: "Siamo di San Lazzaro. Quando ci chiami, parliamo direttamente con te senza call center.",
  },
  {
    icon: Users,
    title: "Esperienza Reale",
    description: "Oltre 200 impianti installati in Emilia-Romagna. Lavori che puoi vedere con i tuoi occhi.",
  },
  {
    icon: Wrench,
    title: "Qualità Artigiana",
    description: "Non siamo un grande portale. Ogni installazione riceve la nostra attenzione personale.",
  },
  {
    icon: ShieldCheck,
    title: "Assistenza Continua",
    description: "Problemi post-installazione? Siamo a mezz'ora da te, non dall'altra parte d'Italia.",
  },
];

const TrustSection = () => {
  return (
    <section className="section-padding bg-accent">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={teamImage}
              alt="Team SolarTech al lavoro"
              className="rounded-2xl shadow-strong w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground rounded-xl p-4 shadow-medium hidden md:block">
              <p className="font-serif font-bold text-2xl">Dal 2010</p>
              <p className="text-sm">in Emilia-Romagna</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
              Perché Scegliere un Installatore Locale?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Non siamo un portale nazionale che ti passa al primo installatore disponibile. Siamo noi stessi a progettare e installare il tuo impianto, dal primo sopralluogo all'ultimo collaudo.
            </p>

            <div className="space-y-6">
              {trustPoints.map((point) => (
                <div key={point.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <point.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{point.title}</h3>
                    <p className="text-muted-foreground text-sm">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
