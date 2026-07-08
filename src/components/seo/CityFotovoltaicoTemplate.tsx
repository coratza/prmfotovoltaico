import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import Breadcrumb from "@/components/seo/Breadcrumb";
import SEOFAQ, { FAQItem } from "@/components/seo/SEOFAQ";
import ApprofondimentiCorrelati, { CorrelatoLink } from "@/components/seo/ApprofondimentiCorrelati";
import CTAConversione from "@/components/seo/CTAConversione";
import { Sun, TrendingUp, MapPin, ShieldCheck, Zap, Euro } from "lucide-react";

export interface CityPageData {
  city: string;
  slug: string; // e.g. "fotovoltaico-bologna"
  provinciaSigla: string;
  title: string; // SEO title 55-60
  description: string; // meta 140-155
  keywords: string;
  h1: string;
  heroSubtitle: string;
  heroImage: string;
  intro: string; // 1-2 paragraphs
  irraggiamento: string; // kWh/m²/anno spec
  produzioneKwhAnnoPer1kw: number;
  areeServite: string[]; // quartieri o comuni limitrofi
  contestoLocale: string; // paragrafo unico su edilizia locale / clima
  perchePrm: string; // paragrafo su presenza locale
  faqs: FAQItem[];
  correlati: CorrelatoLink[];
  agevolazioniPath: string; // /agevolazioni/detrazioni-privati-<city>
}

interface Props {
  data: CityPageData;
}

const CityFotovoltaicoTemplate = ({ data }: Props) => {
  const canonical = `/${data.slug}`;
  return (
    <Layout>
      <SEOHead
        title={data.title}
        description={data.description}
        keywords={data.keywords}
        canonicalPath={canonical}
        breadcrumbs={[
          { name: "Fotovoltaico", href: "/fotovoltaico-privati" },
          { name: data.city, href: canonical },
        ]}
        faqs={data.faqs}
        service={{
          name: `Impianti Fotovoltaici ${data.city}`,
          description: data.description,
          serviceType: "Installazione Impianti Fotovoltaici",
          areaServed: [data.city, ...data.areeServite],
        }}
      />

      <Breadcrumb
        items={[
          { name: "Fotovoltaico", href: "/fotovoltaico-privati" },
          { name: data.city, href: canonical },
        ]}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImage}
            alt={`Impianto fotovoltaico installato a ${data.city}`}
            className="w-full h-full object-cover"
            loading="eager"
            width="1920"
            height="900"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 to-primary/60" />
        </div>
        <div className="container-custom relative z-10 text-primary-foreground">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
              <MapPin className="w-4 h-4" /> {data.city} e provincia ({data.provinciaSigla})
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold leading-tight mb-4">
              {data.h1}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl">
              {data.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Intro + numeri */}
      <section className="py-14 md:py-20">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border rounded-lg p-6 text-center">
              <Sun className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Irraggiamento medio</p>
              <p className="text-2xl font-heading font-semibold text-primary">{data.irraggiamento}</p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Produzione media</p>
              <p className="text-2xl font-heading font-semibold text-primary">
                {data.produzioneKwhAnnoPer1kw.toLocaleString("it-IT")} kWh/kW/anno
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <Euro className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Detrazione fiscale</p>
              <p className="text-2xl font-heading font-semibold text-primary">50% in 10 anni</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-heading font-semibold">
              Fotovoltaico a {data.city}: perché conviene
            </h2>
            <p className="text-muted-foreground leading-relaxed">{data.intro}</p>

            <h2 className="text-3xl font-heading font-semibold mt-10">
              Contesto locale e caratteristiche degli edifici
            </h2>
            <p className="text-muted-foreground leading-relaxed">{data.contestoLocale}</p>

            <h2 className="text-3xl font-heading font-semibold mt-10">
              Zone e quartieri in cui operiamo a {data.city}
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-muted-foreground list-none pl-0">
              {data.areeServite.map((zona) => (
                <li key={zona} className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" /> {zona}
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-heading font-semibold mt-10">
              Perché scegliere PRM Fotovoltaico a {data.city}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{data.perchePrm}</p>
          </div>

          <CTAConversione variant="compact" title={`Vuoi un preventivo per la tua casa a ${data.city}?`} />

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="border rounded-lg p-6 bg-card">
              <ShieldCheck className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-heading font-semibold text-xl mb-2">Consulenza tecnica diretta</h3>
              <p className="text-sm text-muted-foreground">
                A {data.city} il sopralluogo lo fa l'Ing. Riccardo Navone. Nessun call center,
                nessun intermediario: parli direttamente con chi progetta il tuo impianto.
              </p>
            </div>
            <div className="border rounded-lg p-6 bg-card">
              <TrendingUp className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-heading font-semibold text-xl mb-2">Progetto su misura</h3>
              <p className="text-sm text-muted-foreground">
                Analisi consumi, simulazione produzione basata sull'irraggiamento reale della
                tua zona a {data.city}, verifica strutturale del tetto e pratiche GSE incluse.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SEOFAQ
        faqs={data.faqs}
        title={`Fotovoltaico ${data.city}: le domande più frequenti`}
        subtitle={`Le risposte alle domande che ci fanno più spesso i clienti di ${data.city} e provincia`}
      />

      <CTAConversione
        title={`Installazione fotovoltaico ${data.city}: parti dal preventivo`}
        subtitle="Sopralluogo gratuito, progetto personalizzato, nessun impegno"
      />

      <ApprofondimentiCorrelati links={data.correlati} />
    </Layout>
  );
};

export default CityFotovoltaicoTemplate;
