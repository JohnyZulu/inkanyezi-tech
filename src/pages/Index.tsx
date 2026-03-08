import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import ROICalculator from "@/components/ROICalculator";
import ChatDemoFixed from "@/components/ChatDemoFixed";
import PhilosophySection from "@/components/PhilosophySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import CustomCursor from "@/components/CustomCursor";
import GlobalStarfield from "@/components/GlobalStarfield";
import ShootingStars from "@/components/ShootingStars";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <CustomCursor />
      {/* Global starfield behind all content */}
      <GlobalStarfield />
      <ShootingStars />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <HowItWorks />
          <ROICalculator />
          <ChatDemoFixed />
          <PhilosophySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default Index;
