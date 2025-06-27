import { Navbar } from "@/components/layout/navigation/header/navbar";
import { HeroSection } from "@/components/features/hero/hero-section";
import { FireScenariosSection } from "@/components/features/fire-scenarios/fire-scenarios-section";
import { LifeModulesSection } from "@/components/features/life-modules/life-modules-section";
import { AICopilotSection } from "@/components/features/ai-copilot/ai-copilot-section";
import { Footer } from "@/components/layout/navigation/footer";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <FireScenariosSection />
      <LifeModulesSection />
      <AICopilotSection />
      <Footer />
    </div>
  );
}
