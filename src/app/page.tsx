import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { CoreProductSection } from "@/components/core-product-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection index={0} />
      <CoreProductSection index={1} />
      <Footer />
    </div>
  );
}
