import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/sections/HeroSection";
import InvestmentSection from "@/components/sections/InvestmentSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import DetrazioniPreviewSection from "@/components/sections/DetrazioniPreviewSection";
import MethodSection from "@/components/sections/MethodSection";
import ClaritySection from "@/components/sections/ClaritySection";
import PartnersSection from "@/components/sections/PartnersSection";
import LeadFormSection from "@/components/sections/LeadFormSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";

const homeFaqs = [
  {
    question: "Quanto costa un impianto fotovoltaico a Bologna?",
    answer: "Il costo di un impianto fotovoltaico dipende da molti fattori: dimensione dell'impianto, tipologia di pannelli e inverter, complessità dell'installazione e presenza di accumulo. Ogni casa è diversa, per questo offriamo sopralluoghi gratuiti e preventivi personalizzati senza impegno. Chiamaci o compila il modulo di contatto per ricevere la tua proposta su misura.",
  },
  {
    question: "Quanto tempo ci vuole per installare un impianto fotovoltaico?",
    answer: "L'installazione vera e propria richiede generalmente 2-3 giorni lavorativi per un impianto residenziale. Dall'accettazione del preventivo all'attivazione dell'impianto passano circa 4-8 settimane, incluse le pratiche burocratiche e l'allaccio alla rete.",
  },
  {
    question: "Quali detrazioni fiscali sono disponibili per il fotovoltaico nel 2025?",
    answer: "I privati possono usufruire della detrazione fiscale del 50% sul costo dell'impianto, recuperabile in 10 rate annuali tramite la dichiarazione dei redditi. Le aziende possono accedere ad agevolazioni fiscali fino al 180% del valore dell'investimento tramite il super ammortamento. PRM Fotovoltaico ti assiste in tutte le pratiche.",
  },
  {
    question: "In quanto tempo si ripaga un impianto fotovoltaico?",
    answer: "Con le detrazioni fiscali e il risparmio in bolletta, un impianto fotovoltaico residenziale si ripaga mediamente in 4-7 anni. Per le aziende i tempi possono essere ancora più brevi grazie all'elevato autoconsumo diurno. Usa il nostro calcolatore di rendimento per una stima personalizzata.",
  },
  {
    question: "In quali zone operate?",
    answer: "PRM Fotovoltaico opera in tutta l'Emilia-Romagna con focus sulle province di Bologna, Modena, Ferrara e Ravenna. Siamo basati a San Lazzaro di Savena (BO) e offriamo sopralluoghi gratuiti in tutta l'area servita.",
  },
  {
    question: "Che garanzie offrite sugli impianti?",
    answer: "I pannelli fotovoltaici hanno garanzia di prodotto fino a 25 anni e garanzia di rendimento fino a 30 anni. Gli inverter hanno garanzia estesa fino a 10-15 anni. Offriamo inoltre assistenza post-vendita locale e interveniamo entro 24-48 ore in caso di necessità.",
  },
];

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="PRM Fotovoltaico | Impianti Fotovoltaici Bologna, Modena, Ferrara, Ravenna"
        description="PRM Fotovoltaico: installazione impianti fotovoltaici chiavi in mano a Bologna, Modena, Ferrara e Ravenna. Sopralluogo gratuito, preventivo personalizzato. Azienda artigiana dal 2010, Ing. Navone Riccardo."
        keywords="PRM Fotovoltaico, PRM fotovoltaico Bologna, fotovoltaico Bologna, impianti fotovoltaici Bologna, installazione fotovoltaico Modena, fotovoltaico Ferrara, fotovoltaico Ravenna, fotovoltaico Emilia Romagna, pannelli solari, energia solare, rendimento investimento fotovoltaico"
        canonicalPath="/"
        breadcrumbs={[{ name: "Home", href: "/" }]}
        faqs={homeFaqs}
      />
      <HeroSection />
      <InvestmentSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <DetrazioniPreviewSection />
      <MethodSection />
      <ClaritySection />
      <PartnersSection />
      <LeadFormSection />
      <TestimonialsSection />
      <FAQSection faqs={homeFaqs} />
    </Layout>
  );
};

export default Index;
