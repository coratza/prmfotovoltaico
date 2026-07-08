import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface SEOFAQProps {
  faqs: FAQItem[];
  title?: string;
  subtitle?: string;
}

const SEOFAQ = ({ faqs, title = "Domande frequenti", subtitle }: SEOFAQProps) => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-3">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium text-base md:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default SEOFAQ;
