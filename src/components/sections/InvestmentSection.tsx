import { CheckCircle } from "lucide-react";
import villaSolar from "@/assets/villa-solar.jpg";

const InvestmentSection = () => {
  const points = [
    "Progettiamo impianti che durano",
    "Utilizziamo componenti affidabili",
    "Evitiamo soluzioni forzate",
    "Valutiamo sempre il contesto reale",
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-medium">
                <img
                  src={villaSolar}
                  alt="Impianto fotovoltaico residenziale completato"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                Un investimento da fare con criterio
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Un impianto fotovoltaico non è una spesa impulsiva.<br />
                È una scelta tecnica ed economica.
              </p>
              <p className="text-muted-foreground mb-6">
                Per questo:
              </p>

              <ul className="space-y-4 mb-8">
                {points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="border-l-4 border-primary pl-4">
                <p className="text-foreground font-medium">
                  L'obiettivo non è "vendere un impianto".
                </p>
                <p className="text-muted-foreground">
                  È realizzarne uno che abbia senso nel tempo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentSection;
