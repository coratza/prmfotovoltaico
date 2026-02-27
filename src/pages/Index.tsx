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

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="PRM Fotovoltaico | Impianti Fotovoltaici Bologna, Modena, Ferrara, Ravenna"
        description="PRM Fotovoltaico: installazione impianti fotovoltaici chiavi in mano a Bologna, Modena, Ferrara e Ravenna. Sopralluogo gratuito, preventivo personalizzato. Privati e aziende."
        keywords="PRM Fotovoltaico, fotovoltaico Bologna, impianti fotovoltaici Bologna, installazione fotovoltaico Modena, fotovoltaico Ferrara, fotovoltaico Ravenna, fotovoltaico Emilia Romagna, pannelli solari, energia solare"
        canonicalPath="/"
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
    </Layout>
  );
};

export default Index;
