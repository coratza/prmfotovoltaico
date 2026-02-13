import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, ArrowRight } from "lucide-react";

interface AgevolazionePageProps {
  title: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  badge: string;
  sections: {
    title: string;
    content: string[];
  }[];
  requirements: string[];
  province?: string;
  relatedLinks: { label: string; href: string }[];
}

const AgevolazionePageTemplate = ({
  title,
  heroTitle,
  heroSubtitle,
  badge,
  sections,
  requirements,
  province,
  relatedLinks,
}: AgevolazionePageProps) => {
  return (
    <Layout>
      <SEOHead
        title={`${title} | PRM Fotovoltaico`}
        description={heroSubtitle}
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
            Vuoi sapere se puoi accedere a queste agevolazioni{province ? ` a ${province}` : ""}?
          </h2>
          <p className="text-xl text-primary-foreground/85 mb-8">
            Chiamaci per una consulenza gratuita e personalizzata.
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
