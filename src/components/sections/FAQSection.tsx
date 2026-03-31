import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionCTA from "./SectionCTA";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-light text-primary mb-3 md:mb-4">
              Domande Frequenti
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Le risposte alle domande più comuni sul fotovoltaico in Emilia-Romagna.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-foreground font-medium text-sm sm:text-base py-3 sm:py-4">
                  <span className="flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA finale forte dopo le FAQ */}
          <div className="mt-10 md:mt-14 text-center bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10">
            <h3 className="text-xl sm:text-2xl font-heading font-light text-primary-foreground mb-2 md:mb-3">
              Hai ancora dubbi? Parliamone.
            </h3>
            <p className="text-primary-foreground/80 text-sm sm:text-base mb-5 md:mb-6 max-w-lg mx-auto">
              Un sopralluogo gratuito vale più di mille risposte online.
              Ti diamo numeri concreti sulla tua situazione reale.
            </p>
            <SectionCTA text="Richiedi Sopralluogo Gratuito" className="mt-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
