import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import villaSolar from "@/assets/villa-solar-sm.webp";
import industrialSolar from "@/assets/industrial-solar-sm.webp";

const DetrazioniPreviewSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-primary mb-4">
            Detrazioni e Agevolazioni
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Scopri tutte le agevolazioni a cui puoi avere accesso e
            risparmia migliaia di euro sul tuo investimento.
            <br className="hidden sm:block" />
            Grazie alle detrazioni potrai rientrare del tuo investimento in pochi anni e
            ottenere un ritorno sull'investimento ottimo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Per Privati */}
          <div className="relative bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-medium border border-border">
            {/* Badge -50% */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
              <div className="bg-yellow-400 text-foreground font-bold text-xl sm:text-2xl w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-strong" style={{
                clipPath: "polygon(50% 0%, 61% 15%, 79% 6%, 76% 25%, 98% 30%, 85% 44%, 100% 58%, 82% 62%, 87% 82%, 68% 74%, 60% 95%, 50% 80%, 40% 95%, 32% 74%, 13% 82%, 18% 62%, 0% 58%, 15% 44%, 2% 30%, 24% 25%, 21% 6%, 39% 15%)"
              }}>
                -50%
              </div>
            </div>
            <div className="h-48 sm:h-56 overflow-hidden">
              <img src={villaSolar} alt="Detrazioni fotovoltaico privati" className="w-full h-full object-cover" width={533} height={400} loading="lazy" />
            </div>
            <div className="p-5 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-heading font-normal text-primary mb-3">
                Per Privati
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-2">
                È prevista una detrazione fiscale fino al 50%, per l'installazione di impianti fotovoltaici su abitazioni.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-5">
                La detrazione viene recuperata nel tempo tramite la dichiarazione dei redditi.
              </p>
              <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm" asChild>
                <Link to="/agevolazioni/detrazioni-privati">Scopri di più</Link>
              </Button>
            </div>
          </div>

          {/* Per Aziende */}
          <div className="relative bg-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-medium border border-border">
            {/* Badge -180% */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
              <div className="bg-yellow-400 text-foreground font-bold text-lg sm:text-xl w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-strong" style={{
                clipPath: "polygon(50% 0%, 61% 15%, 79% 6%, 76% 25%, 98% 30%, 85% 44%, 100% 58%, 82% 62%, 87% 82%, 68% 74%, 60% 95%, 50% 80%, 40% 95%, 32% 74%, 13% 82%, 18% 62%, 0% 58%, 15% 44%, 2% 30%, 24% 25%, 21% 6%, 39% 15%)"
              }}>
                -180%
              </div>
            </div>
            <div className="h-48 sm:h-56 overflow-hidden">
              <img src={industrialSolar} alt="Agevolazioni fotovoltaico aziende" className="w-full h-full object-cover" width={579} height={434} loading="lazy" />
            </div>
            <div className="p-5 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-heading font-normal text-primary mb-3">
                Per Aziende
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-2">
                Sono disponibili agevolazioni fiscali fino al 180% del valore dell'investimento.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-2">
                Il beneficio dipende dalla tipologia di impresa e dal regime fiscale.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-5">
                La valutazione viene fatta in modo specifico.
              </p>
              <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm" asChild>
                <Link to="/agevolazioni/agevolazioni-aziende">Scopri di più</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetrazioniPreviewSection;
