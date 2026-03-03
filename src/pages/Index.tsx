import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";

import HowItWorks from "@/components/HowItWorks";
import ROICalculator from "@/components/ROICalculator";
import LiveDemo from "@/components/LiveDemo";
import PhilosophySection from "@/components/PhilosophySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        
        <HowItWorks />
        <ROICalculator />
        <LiveDemo />
        <PhilosophySection />
        <ContactSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
