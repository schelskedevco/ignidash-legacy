import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { CoreProductSection } from "@/components/core-product-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection index={0} />
      <CoreProductSection index={1} />
    </div>
  );
}
