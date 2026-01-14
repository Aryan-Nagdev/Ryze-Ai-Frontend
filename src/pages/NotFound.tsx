import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MarqueeBar from "@/components/MarqueeBar";
import {
  HeroSection,
  FeatureCardsSection,
  ComparisonSection,
  TestimonialsSection,
  AuditCTASection,
  AIMarketerSection,
  ClientLogosSection,
} from "@/components/Sections";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <HeroSection />
      
      {/* Feature Cards */}
      <FeatureCardsSection />
      
      {/* Client Logos */}
      <ClientLogosSection />
      
      {/* Wall of Love */}
      <TestimonialsSection />
      
      {/* Comparison Section */}
      <ComparisonSection />
      
      {/* Marquee Bar - Orange */}
      <MarqueeBar variant="orange" />
      
      {/* Audit CTA */}
      <AuditCTASection />
      
      {/* Marquee Bar - Gray */}
      <MarqueeBar variant="gray" />
      
      {/* AI Marketer Features */}
      <AIMarketerSection />
      
      <Footer />
    </div>
  );
};

export default Index;
