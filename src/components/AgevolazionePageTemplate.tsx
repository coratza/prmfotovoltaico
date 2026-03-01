import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface AgevolazionePageProps {
  title: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  badge: string;
  introText?: string;
  sections: {
    title: string;
    content: string[];
  }[];
  requirements: string[];
  faqs?: FAQ[];
  province?: string;
  keywords?: string;
  ctaButtonText?: string;
  relatedLinks: { label: string; href: string }[];
  canonicalPath?: string;
  breadcrumbs?: { name: string; href: string }[];
}

const AgevolazionePageTemplate = ({
  title,
  metaDescription,
  heroTitle,
  heroSubtitle,
  badge,
  introText,
  sections,
  requirements,
  faqs,
  province,
  keywords,
  ctaButtonText,
  relatedLinks,
}: AgevolazionePageProps) => {
  // Inject JSON-LD schemas
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];

    // FAQ Schema
    if (faqs && faqs.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };
      const faqScript = document.createElement("script");
      faqScript.type = "application/ld+json";
      faqScript.text = JSON.stringify(faqSchema);
      document.head.appendChild(faqScript);
      scripts.push(faqScript);
    }

    // LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "PRM Fotovoltaico",
      description: metaDescription,
      telephone: "+39 335 611 7388",
      url: "https://prmfotovoltaico.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: province || "Bologna",
        addressRegion: "Emilia-Romagna",
        addressCountry: "IT",
      },
      areaServed: province
        ? { "@type": "AdministrativeArea", name: `Provincia di ${province}` }
        : undefined,
      priceRange: "€€",
    };
    const lbScript = document.createElement("script");
    lbScript.type = "application/ld+json";
    lbScript.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(lbScript);
    scripts.push(lbScript);

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [faqs, province, metaDescription]);

  return (
    <Layout>
      <SEOHead
        title={`${title} | PRM Fotovoltaico`}
        description={metaDescription}
        keywords={keywords}
      />
      {/* Hero */}
      <section className="section-padding bg-accent">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="bg-yellow-400 text-foreground font-bold text-2xl w-20 h-20 flex items-center justify-center" style={{
                clipPath: "polygon(50% 0%, 61% 15%, 79% 6%, 76% 25%, 98% 30%, 85% 44%, 100% 58%, 82% 62%, 87% 82%, 68% 74%, 60% 95%, 50% 80%, 40% 95%, 32% 74%, 13% 82%, 18% 62%, 0% 58%, 15% 44%, 2% 30%, 24% 25%, 21% 6%, 39% 15%)"
              }}>
                {badge}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-light text-primary mb-6">
              {heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Intro text */}
      {introText && (
        <section className="section-padding pb-0">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {introText}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Content sections */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-12">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-2xl md:text-3xl font-heading font-light text-primary mb-4">
                  {section.title}
                </h2>
                {section.content.map((p, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed mb-3">
                    {p}
                  </p>
                ))}
              </div>
            ))}

            {/* Requirements */}
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-light text-primary mb-4">
                Requisiti principali
              </h2>
              <div className="space-y-3">
                {requirements.map((req) => (
                  <div key={req} className="flex items-start gap-3 p-3 bg-accent rounded-xl">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            {faqs && faqs.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-light text-primary mb-6">
                  Domande frequenti
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-foreground font-medium">
                        <span className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related links */}
      {relatedLinks.length > 0 && (
        <section className="section-padding bg-accent">
          <div className="container-custom">
            <h2 className="text-2xl font-heading font-light text-primary text-center mb-8">
              Approfondisci per zona
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center gap-2 bg-card rounded-xl p-4 border border-border shadow-soft hover:shadow-medium transition-shadow text-primary font-medium text-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-custom text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-heading font-light mb-4">
            {ctaButtonText
              ? `${ctaButtonText}${province ? ` a ${province}` : ""}`
              : `Vuoi sapere se puoi accedere a queste agevolazioni${province ? ` a ${province}` : ""}?`}
          </h2>
          <p className="text-xl text-primary-foreground/85 mb-8">
            Ogni situazione è diversa: chiamaci per una consulenza gratuita e personalizzata.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="lg" className="rounded-full bg-primary-foreground text-foreground hover:bg-primary-foreground/90" asChild>
              <a href="tel:+393356117388">
                <Phone className="w-5 h-5" />
                Chiama Ora
              </a>
            </Button>
            <Button size="lg" className="rounded-full border-2 border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contatti">Richiedi un sopralluogo</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AgevolazionePageTemplate;
