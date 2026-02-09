import Layout from "@/components/layout/Layout";
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
