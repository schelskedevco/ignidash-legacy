import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { CoreProductSection } from "@/components/core-product-section";
import { HeaderSection } from "@/components/ui/header-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeaderSection
        heroSection={<HeroSection />}
        coreProductSection={<CoreProductSection />}
      />
      <Footer />
    </div>
  );
}
