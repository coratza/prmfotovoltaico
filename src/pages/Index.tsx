import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TargetSection from "@/components/sections/TargetSection";
import TrustSection from "@/components/sections/TrustSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LeadFormSection from "@/components/sections/LeadFormSection";
import InvestmentSection from "@/components/sections/InvestmentSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <TargetSection />
      <TrustSection />
      <LeadFormSection />
      <InvestmentSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
