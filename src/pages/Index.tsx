import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TrustSection from "@/components/sections/TrustSection";
import MethodSection from "@/components/sections/MethodSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LeadFormSection from "@/components/sections/LeadFormSection";
import InvestmentSection from "@/components/sections/InvestmentSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <MethodSection />
      <LeadFormSection />
      <InvestmentSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
