import { Navbar } from "@/components/layout/header/navbar";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { FireScenariosSection } from "@/components/sections/fire-scenarios/fire-scenarios-section";
import { TwoSectionLayout } from "@/components/layout/two-section-layout";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <TwoSectionLayout
        heroSection={<HeroSection />}
        fireScenarios={<FireScenariosSection />}
      />
      <Footer />
    </div>
  );
}
