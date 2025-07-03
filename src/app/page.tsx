import { Navbar } from "@/components/layout/navigation/header/navbar";
import { HeroSection } from "@/components/features/hero/hero";
import { FireScenariosSection } from "@/components/features/fire-scenarios/fire-scenarios";
import { LifeModulesSection } from "@/components/features/life-modules/life-modules";
import { AICopilotSection } from "@/components/features/ai-copilot/ai-copilot";
import { PlanSharingSection } from "@/components/features/plan-sharing/plan-sharing";
import { PrivacyTransparencySection } from "@/components/features/privacy-transparency/privacy-transparency";
import { Footer } from "@/components/layout/navigation/footer";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <FireScenariosSection />
      <LifeModulesSection />
      <AICopilotSection />
      <PlanSharingSection />
      <PrivacyTransparencySection />
      <Footer />
    </div>
  );
}
