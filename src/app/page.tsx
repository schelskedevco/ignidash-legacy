import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { FireScenariosSection } from "@/components/fire-scenarios/fire-scenarios-section";
import { HeaderSection } from "@/components/header-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeaderSection
        heroSection={<HeroSection />}
        fireScenarios={<FireScenariosSection />}
      />
      <Footer />
    </div>
  );
}
