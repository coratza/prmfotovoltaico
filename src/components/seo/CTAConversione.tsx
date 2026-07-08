import { Link } from "react-router-dom";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title?: string;
  subtitle?: string;
  variant?: "default" | "compact";
}

const CTAConversione = ({
  title = "Richiedi ora la tua consulenza gratuita",
  subtitle = "Sopralluogo e preventivo senza impegno in Emilia-Romagna",
  variant = "default",
}: Props) => {
  if (variant === "compact") {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 my-8 text-center">
        <p className="font-heading text-lg md:text-xl font-semibold mb-4">{title}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-[hsl(142_64%_38%)] hover:bg-[hsl(142_64%_32%)] text-white">
            <Link to="/#contatti">
              <Calendar className="w-4 h-4 mr-2" /> Richiedi un sopralluogo
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="tel:+393356117388">
              <Phone className="w-4 h-4 mr-2" /> Chiama ora
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-14 md:py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="container-custom text-center max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-3">{title}</h2>
        <p className="text-primary-foreground/85 mb-8 text-lg">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-[hsl(142_64%_38%)] hover:bg-[hsl(142_64%_32%)] text-white">
            <Link to="/#contatti">
              <Calendar className="w-5 h-5 mr-2" /> Richiedi un sopralluogo gratuito
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
            <a href="tel:+393356117388">
              <Phone className="w-5 h-5 mr-2" /> Chiama 335 611 7388
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTAConversione;
