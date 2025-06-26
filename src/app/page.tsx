import { Navbar } from "@/components/layout/header/navbar";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { FireScenariosSection } from "@/components/sections/fire-scenarios/fire-scenarios-section";
import { LifeModulesSection } from "@/components/sections/life-modules/life-modules-section";
import { AICopilotSection } from "@/components/sections/ai-copilot/ai-copilot-section";
import { MultiSectionLayout } from "@/components/layout/multi-section-layout";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <MultiSectionLayout
        heroSection={<HeroSection />}
        fireScenarios={<FireScenariosSection />}
        lifeModules={<LifeModulesSection />}
        aiCopilot={<AICopilotSection />}
      />
      <Footer />
    </div>
  );
}
