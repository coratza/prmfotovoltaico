import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionCTAProps {
  text?: string;
  className?: string;
}

const SectionCTA = ({ text = "Richiedi Sopralluogo Gratuito", className = "" }: SectionCTAProps) => {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const form = document.getElementById("lead-form-section");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`text-center mt-6 md:mt-8 ${className}`}>
      <Button variant="cta" size="lg" className="rounded-full px-6 sm:px-8" asChild>
        <a href="#lead-form-section" onClick={scrollToForm}>
          {text}
          <ArrowRight className="w-5 h-5 flex-shrink-0" />
        </a>
      </Button>
    </div>
  );
};

export default SectionCTA;
